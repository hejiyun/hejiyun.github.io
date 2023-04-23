// 进入页面首页清除之前缓存的钱包链接状态,然后调用客户端的方法,拿到上次连接钱包的token,如果是第一次进入页面,客户端返回的数据是空的,
// 需要重新连接钱包,连接成功后从localStorage中拿到walletcoonnect自己缓存的链接状态,并把拿到的数据通知给客户端。如果不是第一次进入页面,客户端
// 返回的数据是上一次连接的token,拿到客户端返回的token，可以直接去调用walletcoonnect的签名和支付等方法。
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export default function wallet() {
    let walletConnector = "";
    let mobileLinks = ["metamask", "rainbow"];
    let account = 0;
    let connector = "";
    if (window.inAPP) {
        // 删除localStorage里面的数据，并向客户端拿取之前缓存的数据
        localStorage.removeItem("walletconnect");
        window.JSWeb3GetWalletConnectStorage_Bridge((res) => {
            if (res) {
                if (window.isiOS) {
                    connector = res;
                } else {
                    connector = JSON.parse(res);
                }
                //如果有就缓存在localStorage
                localStorage.setItem(
                    "walletconnect",
                    JSON.stringify(connector)
                );
                isDisconnect();
            } else {
                isDisconnect();
            }
        });
    } else {
        isDisconnect();
    }
    function isDisconnect() {
        // let mobileLinks = ["metamask", "rainbow"];
        // 检查钱包app是否主动断开

        walletConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "rainbow"]
            }
        });
        if (walletConnector) {
            // 如果钱包主动断开响应
            walletConnector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }
                console.log("disconnectdisconnectdisconnect5222");
                //app主动断开，删除本地的token,并且通知客户端删除缓存的token
                localStorage.removeItem("walletconnect");
                // walletConnector.killSession();
                if (window.inAPP) {
                    window.JSWeb3RemoveWalletConnectStorage_Bridge();
                }
            });
            //切换账户
        }
    }
    const onDdisconnect = async () => {
        // app主动断开，删除本地的token,并且通知客户端删除缓存的token
        localStorage.removeItem("walletconnect");
        if (window.inAPP) {
            window.JSWeb3RemoveWalletConnectStorage_Bridge();
        }
        walletConnector.killSession();
    };

    const onConnect = async (callback) => {
        console.log("onConnect848484848");
        console.log(walletConnector, "onConnect848484848");
        // Check if connection is already established
        // 在浏览器和客户端都没有缓存token的情况下，重新创建'
        walletConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "rainbow"]
            }
        });
        if (!walletConnector.connected) {
            // create new session
            walletConnector.createSession();
        }
        // setTimeout(() => {
        //   let warpper = document.querySelector(
        //     ".walletconnect-connect__buttons__wrapper a:nth-child(2)"
        //   );
        //   console.log(warpper, "warpper");
        //   warpper.style.display = "none";
        // }, 100);

        if (walletConnector) {
            // 确认连接的响应事件
            walletConnector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }
                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                console.log(payload, "payload");
                // 如果是安卓，执行切换App的方法
                if (window.inAPP && !window.isiOS) {
                    window.JSBringToTop();
                }
                if (typeof callback === "function") {
                    callback(walletConnector);
                }

                //创建token成功后，从localStorage里面获取出来，传递给客户端，让客户端缓存
                if (window.inAPP) {
                    setTimeout(() => {
                        let wallet_connect = JSON.parse(
                            localStorage.getItem("walletconnect")
                        );
                        console.log(wallet_connect, "wallet_connect");
                        window.JSWeb3SetWalletConnectStorage_Bridge({
                            wallet_connect: wallet_connect
                        });
                    }, 500);
                }
            });
            // 当DApp连接上钱包后，若钱包的信息发生变化（大部分情况是 chainId 或者 address），会触发 session_update 的回调
            walletConnector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }
                console.log(payload, "payload120");
            });
            // 断开连接的响应事件
            walletConnector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }
                //app主动断开，删除本地的token,并且通知客户端删除缓存的token
                console.log("disconnect139139139139");
                localStorage.removeItem("walletconnect");
                if (window.inAPP) {
                    window.JSWeb3RemoveWalletConnectStorage_Bridge();
                }
            });
        }
    };
    const sendTransaction = async (option, callback) => {
        const data = option.data;
        // from
        let from = walletConnector.accounts[0];
        //  to
        const to = option.to;
        const tx = {
            from: from, // Required
            to: to, // Required (for non contract deployments)
            data: data // Required
            // gasPrice: "10000000000000",
            // // gasPrice: state.gasPrice,
            // // gasLimit: gasLimit, // Optional
            // value
        };
        console.log(tx, "tx");
        console.log(walletConnector, "twalletConnectorx");

        walletConnector
            .sendTransaction(tx)
            .then((result) => {
                // Returns transaction id (hash)
                console.log(result);
                if (typeof callback === "function") {
                    callback({
                        ret_code: "0",
                        result: result
                    });
                }
            })
            .catch((error) => {
                // Error returned when rejected
                console.error(error, "error217");
                walletConnector.killSession();
                localStorage.removeItem("walletconnect");
                walletConnector = null;
                if (typeof callback === "function") {
                    callback({
                        ret_code: "-1",
                        error
                    });
                }
            });
    };

    return {
        account,
        onConnect,
        sendTransaction,
        onDdisconnect
    };
}
