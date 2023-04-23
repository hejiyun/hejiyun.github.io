var u = navigator.userAgent,
	inAPP =
		/micromessenger/i.test(u) === false &&
		(typeof window.webkit !== 'undefined' ||
			typeof window.WKWebViewJavascriptBridge !== 'undefined'),
	murmurApi,
	api,
	eventApi,
	apiHeaders = false, //xhr請求使用
	isiOS = (isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
	methods = {
		getParam: function (name) {
			var reg = new RegExp('[?&]+' + name + '=([^?^#^&]+)')
			try {
				return unescape(window.location.href.match(reg)[1])
			} catch (e) {
				return null
			}
		}
	},
	JSQueryInitInfoObj = {},
	urlUid = methods.getParam('HTTP_USER_UID') || 0,
	urlToken = methods.getParam('HTTP_USER_TOKEN') || 0,
	urlAnchor = methods.getParam('anchor_pfid') || 0,
	urlLiveId = methods.getParam('live_id') || 0,
	data4app,
	WKWVJBCallbacks = [],
	getUserinfoCallback = [],
	getAnchorinfoCallback = [],
	JSNavigationBarCallback = [],
	JSRegMsgTypeCallback = [],
	userinfo,
	anchorinfo
if (inAPP) {
	if (isiOS) {
		window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(
			null
		)
	}
}
window.JSSetInitInfo = function (res) {
	res = res.replace(/[\f\r\t\v]+/g, '')
	res = res.replace(/\n/g, '<br>')
	window.userinfo = JSON.parse(res)
	console.log(window.userinfo, 'window.userinfo')
	if (isiOS) {
		if (window.userinfo.live && window.userinfo.live.live_id) {
			window.anchorinfo = window.userinfo.live
		} else {
			window.anchorinfo = {
				pfid: urlAnchor,
				live_id: urlLiveId
			}
		}
	} else {
		if (window.userinfo.live) {
			window.anchorinfo = window.userinfo.live
		} else {
			window.anchorinfo = {
				pfid: urlAnchor,
				live_id: urlLiveId
			}
		}
	}
	console.log(
		window.getUserinfoCallback.length,
		'window.getUserinfoCallback.length'
	)
	while (window.getUserinfoCallback.length) {
		window.getUserinfoCallback.shift()(window.userinfo)
	}
}
window.client = {
	getUserinfo(callback) {
		if (window.inAPP) {
			console.log(window.userinfo, 'window.userinfowindow.userinfo')
			if (window.userinfo) {
				callback(window.userinfo)
				return false
			} else {
				window.getUserinfoCallback.push(callback)
			}
			// console.log(window.userinfo, "window.userinfowindow.userinfo")
			// if (window.userinfo) {
			//     callback(window.userinfo);
			//     return false;
			// }
			// console.log(window.WKWebViewJavascriptBridge, "window.WKWebViewJavascriptBridge")
			// if (window.WKWebViewJavascriptBridge) {
			//     window.getUserInfo_toBridge();
			//     window.getUserinfoCallback.push(callback);
			// } else {
			//     window.getUserinfoCallback.push(callback);
			//     if (!isiOS) {
			//         setTimeout(function() {
			//             window.getUserInfo_toBridge();
			//         }, 2000)
			//     }
			// }

			// if (isiOS) {
			//     window.getUserinfoCallback.push(callback);
			// } else {
			//     window.getUserinfoCallback.push(callback);
			//     window.getUserInfo_toBridge(callback);
			// }
		} else {
			window.userinfo = {
				user: {
					access_token: urlToken,
					pfid: urlUid
				}
			}
			window.anchorinfo = {
				pfid: urlAnchor,
				live_id: urlLiveId
			}
			if (typeof callback === 'function') callback(window.userinfo)
		}
	},
	// 返回当前app所处直播间信息，返回空表示当前不在直播间或者没有开播
	getAnchorinfo(callback) {
		if (window.inAPP) {
			console.log(window.anchorinfo, 'window.anchorinfo')
			if (window.anchorinfo) {
				callback(window.anchorinfo)
				return false
			}
			if (window.WKWebViewJavascriptBridge) {
				window.getAnchorinfo_toBridge(callback)
			} else {
				window.getAnchorinfoCallback.push(callback)
			}
			// if (isiOS) {
			//     window.getAnchorinfoCallback.push(callback);
			// } else {
			//     window.getAnchorinfo_toBridge(callback);
			// }
		} else {
			window.anchorinfo = {
				pfid: urlAnchor,
				live_id: urlLiveId
			}
			if (typeof callback === 'function') callback(window.anchorinfo)
		}
	},
	//登录-弹出登录界面
	openJSLogin(callback) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSLogin',
				{},
				function (cre) {
					//clientReturn
					if (typeof callback === 'function') callback(cre)
				}
			)
		} else {
			window.WKWebViewJavascriptBridge.JSLogin()
		}
	},
	//客户端登出
	setJSLogout(callback) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSLogout',
				{},
				function (cre) {
					//clientReturn
					if (typeof callback === 'function') callback(cre)
				}
			)
		} else {
			window.WKWebViewJavascriptBridge.JSLogout()
		}
	},
	//关闭当前web界面
	closeWebview(callback) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSCloseWindow',
				{},
				function (cre) {
					//clientReturn
					if (typeof callback === 'function') callback(cre)
				}
			)
		} else {
			window.WKWebViewJavascriptBridge.JSCloseWindow()
		}
	},
	//关闭礼物特效
	closeGiftAnimate() {
		if (window.inAPP) {
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSEnableGiftEffect',
					{ enable: 0 }
				)
			} else {
				window.WKWebViewJavascriptBridge.JSEnableGiftEffect(0)
			}
		}
	},
	//开启礼物特效
	openGiftAnimate(callback) {
		if (window.inAPP) {
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSEnableGiftEffect',
					{ enable: 1 }
				)
			} else {
				window.WKWebViewJavascriptBridge.JSEnableGiftEffect(1)
			}
		}
	},
	// 供web沉浸式支持使用
	JSNavigationBar(callback, iosData, anData) {
		if (window.WKWebViewJavascriptBridge) {
			window.JSNavigationBar_toBridge(callback, iosData, anData)
		} else {
			window.JSNavigationBarCallback.push([callback, iosData, anData])
		}
	},
	// 供web沉浸式支持使用
	JSGetParentWindowType(callback) {
		if (window.WKWebViewJavascriptBridge) {
			window.JSGetParentWindowType_toBridge(callback)
		} else {
			window.JSGetParentWindowTypeCallback.push([callback])
		}
	},
	// web to app的路由支持
	JSAction(paramData, callback) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSAction',
				paramData,
				function (cre) {
					//clientReturn
					if (typeof callback === 'function') callback(cre)
				}
			)
		} else {
			var anres = window.WKWebViewJavascriptBridge.JSAction(
				`xcy://com.lang.xcy?action=${JSON.stringify(paramData)}`
			)
			if (typeof callback === 'function') callback(anres)
		}
	},
	// toast
	toast(msg) {
		if (window.inAPP) {
			var paramData = { id: '11', param: { toast: msg } }
			this.JSAction(paramData)
		} else {
			h5Toast(msg)
		}
	},
	// toLivingRoom
	toLivingRoom(roomObj) {
		if (window.inAPP) {
			if (roomObj.live_state == 1) {
				var paramData = {
					id: '2',
					param: {
						live_id: String(roomObj.live_id),
						pfid: String(roomObj.pfid),
						live_key: String(roomObj.live_key),
						room_type: Number(roomObj.room_type),
						from: 'h5'
					}
				}
				this.JSAction(paramData)
			} else {
				this.toPersonalCenter(roomObj.pfid)
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	// 请求客户端去充值
	toRecharge(cash, channel) {
		if (window.inAPP) {
			var paramData = {
				id: '42',
				param: {
					product_id: String(cash),
					channel: Number(channel)
				}
			}
			this.JSAction(paramData)
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	// 充值请求
	topUpRequest() {
		if (window.inAPP) {
			var paramData = { id: '19', param: {} }
			this.JSAction(paramData)
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	// toPersonalCenter
	toPersonalCenter(pfid) {
		if (window.inAPP) {
			var paramData = {
				id: '13',
				param: {
					pfid: String(pfid)
				}
			}
			this.JSAction(paramData)
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	// JSRegMsgType
	JSRegMsgType(array, callback) {
		if (typeof callback === 'function') {
			window.orderCallback.push(callback)
		}
		if (window.WKWebViewJavascriptBridge) {
			window.JSRegMsgType_toBridge(array)
		} else {
			window.JSRegMsgTypeCallback.push(array)
		}
		// console.log('JSRegMsgType订阅成功' + array)
		// if (typeof callback === 'function') {
		//     window.orderCallback.push(callback);
		// }
		// if (isiOS) {
		//     window.WKWebViewJavascriptBridge.callHandler('JSRegMsgType', array);
		// } else {
		//     window.WKWebViewJavascriptBridge.JSRegMsgType(JSON.stringify(array));
		// }
	},

	// JSWebBroadcast web广播消息
	JSWebBroadcast(param) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSWebBroadcast',
				param
			)
		} else {
			window.WKWebViewJavascriptBridge.JSWebBroadcast(
				JSON.stringify(param)
			)
		}
	},

	// follow
	follow(pfid) {
		if (window.inAPP) {
			var paramData = {
				id: '16',
				param: {
					type: '2',
					pfid: String(pfid),
					title: '关注'
				}
			}
			this.JSAction(paramData)
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	// 提供h5系统相册方法
	upPhoto(paramData, callback) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSPhotoAlbum',
				paramData,
				function (cre) {
					//clientReturn
					if (typeof callback === 'function') callback(cre)
				}
			)
		} else {
			var url = window.WKWebViewJavascriptBridge.JSPhotoAlbum(
				JSON.stringify(paramData)
			)
			if (typeof callback === 'function') callback(url)
		}
	},
	// 更新数据
	JSUpdateBalance(balance) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler('JSUpdateBalance', {
				balance: balance
			})
		} else {
			window.WKWebViewJavascriptBridge.JSUpdateBalance({
				balance: balance
			})
		}
	},
	// 更新礼物面板
	JSUpdateGiftPanel() {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSUpdateGiftPanel',
				{}
			)
		} else {
			window.WKWebViewJavascriptBridge.JSUpdateGiftPanel()
		}
	},
	// 订阅vip
	JSOrderVip(prodid, cash) {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler('JSOrderVip', {
				prod_id: prodid
			})
		} else {
			window.WKWebViewJavascriptBridge.JSOrderVip(
				JSON.stringify({ prod_id: prodid, cash: Number(cash) })
			)
		}
	},
	// 通知客户端已订阅vip
	JSVipNotice() {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler('JSVipNotice', {
				finished: 1
			})
		} else {
			window.WKWebViewJavascriptBridge.JSVipNotice(
				JSON.stringify({ finished: 1 })
			)
		}
	},
	// 打开一个新页面(url, show_title)  show_title如果为0  需要web自己沉浸手机状态栏
	openPage(url, show_title) {
		if (window.inAPP) {
			var paramData = {
				id: '1',
				param: {
					url: String(url),
					show_title: Number(show_title)
				}
			}
			// this.JSAction(paramData)
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSAction',
					paramData,
					function (cre) {
						//clientReturn
						if (typeof callback === 'function') callback(cre)
					}
				)
			} else {
				// var anres = window.WKWebViewJavascriptBridge.JSAction(`murmur://com.lang.voice?action=${paramData}`);
				var anres = window.WKWebViewJavascriptBridge.JSAction(
					JSON.stringify(paramData)
				)
				if (typeof callback === 'function') callback(anres)
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	JSResourceCheck(r_id, callback) {
		if (window.inAPP) {
			var paramData = {
				r_id: String(r_id)
			}
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSResourceCheck',
					paramData,
					function (cre) {
						//clientReturn
						if (typeof callback === 'function') callback(cre)
					}
				)
			} else {
				var anres = window.WKWebViewJavascriptBridge.JSResourceCheck(
					JSON.stringify(paramData)
				)
				if (typeof callback === 'function') callback(anres)
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},
	sharePage(title, description, url, imgurl, target) {
		// target:'fb','line','wechat_monent','wechat','link'
		var id = '1003',
			data = {
				title: title,
				desc: description,
				url: url,
				imgurl: imgurl
			}
		if (
			target &&
			['fb', 'line', 'wechat_monent', 'wechat', 'link'].indexOf(target) >=
				0
		) {
			id = '12'
			data = {
				channel: target,
				share: data
			}
		}
		this.JSAction({ id: id, param: data })
	},

	// ios会员订阅补单
	JSRestorePurchase() {
		if (isiOS) {
			window.WKWebViewJavascriptBridge.callHandler(
				'JSRestorePurchase',
				{}
			)
		}
	},
	// 刷新礼物面板
	// JSUpdateGiftPanel
	JSUpdateGiftPanel() {
		if (window.inAPP) {
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSUpdateGiftPanel',
					{}
				)
			} else {
				window.WKWebViewJavascriptBridge.JSUpdateGiftPanel()
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},

	// 调整挂件宽高 (此方法可用于收起挂件)
	JSBodySizeChange(width, height) {
		if (window.inAPP) {
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSBodySizeChange',
					{ width: width, height: height }
				)
			} else {
				window.WKWebViewJavascriptBridge.JSBodySizeChange(width, height)
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	},

	// 隐藏直播间挂件（注： 是隐藏挂件，不是移除挂件。如要重新显示挂件，需要重进直播间）
	JSHideThisWeb() {
		if (window.inAPP) {
			if (isiOS) {
				window.WKWebViewJavascriptBridge.callHandler(
					'JSHideThisWeb',
					{}
				)
			} else {
				window.WKWebViewJavascriptBridge.JSHideThisWeb()
			}
		} else {
			this.toast('此方法僅支持在app內使用')
		}
	}
}

// 设置api域名
window.getApi = function () {
	switch (window.location.hostname) {
		//生产（大陆）
		case 'app-web.sctlwy.com':
			murmurApi = api = 'https://mm-api.sctlwy.com'
			eventApi = 'https://event.lv-audio.com'
			break
		//测试
		case 'mm-app-web-test.lv-audio.com':
			murmurApi = api = 'https://cn-mm-api-test.lv-audio.com'
			eventApi = 'https://event.test.murmur.dev'
			break
		//开发环境
		case 'mm-app-web-dev.lv-audio.com':
			murmurApi = api = 'https://mm-api-dev.lv-audio.com'
			eventApi = 'https://event.dev.murmur.dev'
			break
		default:
			murmurApi = api = '/api'
			eventApi = '/event-api'
	}
}
window.getApi()

if (window.inAPP) {
	if (isiOS) {
		var loopGetTime = 0
		var loopGet = setInterval(function () {
			loopGetTime += 10
			if (loopGetTime >= 10000) {
				window.client.toast('网络超时，请关闭页面，重新进入！')
				clearInterval(loopGet)
				return false
			}
			if (window.WKWebViewJavascriptBridge) {
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSPhotoAlbumCallBack',
					JSPhotoAlbumCallBack
				)
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSSetInitInfo',
					JSSetInitInfo
				)
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSOpenRTCAudioPlayerCompleted',
					JSOpenRTCAudioPlayerCompleted
				)
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSCalendarAccessCallback',
					JSCalendarAccessCallback
				)
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSRealTimeData',
					JSRealTimeData
				)
				window.WKWebViewJavascriptBridge.registerHandler(
					'JSUpdateData',
					JSUpdateData
				)
				//window.WKWebViewJavascriptBridge.registerHandler('JSOrderVipCallBack', JSOrderVipCallBack);
				// -------------执行所有已经注册了的callback-----------------
				window.WKWebViewJavascriptBridge.callHandler(
					'JSQueryInitInfo',
					{},
					function (cre) {
						//clientReturn
						window.JSSetInitInfo(cre)
					}
				)
				while (window.getAnchorinfoCallback.length > 0) {
					if (window.anchorinfo) {
						window.getAnchorinfoCallback.shift()(window.anchorinfo)
					} else {
						window.getAnchorinfo_toBridge(
							window.getAnchorinfoCallback.shift()
						)
					}
				}
				while (window.JSNavigationBarCallback.length > 0) {
					var callbackObj = window.JSNavigationBarCallback.shift()
					window.JSNavigationBar_toBridge(
						callbackObj[0],
						callbackObj[1],
						callbackObj[2]
					)
				}
				while (window.JSRegMsgTypeCallback.length > 0) {
					window.JSRegMsgType_toBridge(
						window.JSRegMsgTypeCallback.shift()
					)
				}
				clearInterval(loopGet)
			}
		}, 10)
	}
}

window.JSPhotoAlbumCallBack = function (res) {
	// ios返回的res是object类型   安卓返回的res是string 需要JSON.parse转一下
	if (typeof window.updateImgAfter === 'function') {
		window.updateImgAfter(res)
	}
}

window.JSOpenRTCAudioPlayerCompleted = function (res) {
	// window.client.toast(JSON.stringify(res))
	// alert(JSON.stringify(res))
}
window.JSCalendarAccessCallback = function (res) {
	// window.client.toast(JSON.stringify(res))
	// alert(JSON.stringify(res))
}
//app發送數據調用function
window.JSRealTimeData = function (_data) {
	window.data4app = _data
}

window.orderCallback = []
window.JSUpdateData = function (res) {
	console.log(res, 'res的结果是：')
	typeof res === 'string' && (res = JSON.parse(res))
	if (100 === ~~res.msg_type) {
		typeof window.orderVipAfter === 'function' &&
			window.orderVipAfter(res.content)
	} else if (104 === ~~res.msg_type) {
		// 认证回调
		typeof window.authResultAfter === 'function' &&
			window.authResultAfter(res.content)
	} else if (105 === ~~res.msg_type) {
		// 充值回调
		typeof window.rechargeAfter === 'function' &&
			window.rechargeAfter(res.content)
	} else {
		if (window.orderCallback.length) {
			for (var i = 0; i < window.orderCallback.length; i++) {
				window.orderCallback[i](res)
			}
		}
	}
}

window.getUserInfo_toBridge = function (callback) {
	if (isiOS) {
		window.WKWebViewJavascriptBridge.callHandler(
			'JSQueryInitInfo',
			{},
			function (cre) {
				//clientReturn
				window.JSSetInitInfo(cre)
			}
		)
	} else {
		var userObj = window.WKWebViewJavascriptBridge.JSQueryInitInfo()
		window.JSSetInitInfo(userObj)
	}
}

window.getAnchorinfo_toBridge = function (callback) {
	if (isiOS) {
		window.WKWebViewJavascriptBridge.callHandler(
			'JSQueryLiveInfo',
			{},
			function (cre) {
				//clientReturn
				window.anchorinfo = cre
				console.log(window.anchorinfo, 'window.anchorinfocrecrecre')
				if (typeof callback === 'function') callback(window.anchorinfo)
			}
		)
	} else {
		var anchorObj = window.WKWebViewJavascriptBridge.JSQueryLiveInfo()
		if (anchorObj == '') {
			//优先使用url里面的pfid
			window.anchorinfo = {
				pfid: urlAnchor,
				live_id: urlLiveId
			}
		} else {
			window.anchorinfo = JSON.parse(anchorObj)
		}
		if (typeof callback === 'function') {
			callback(window.anchorinfo)
		}
	}
}
window.JSNavigationBar_toBridge = function (callback, iosData, anData) {
	if (isiOS) {
		window.WKWebViewJavascriptBridge.callHandler(
			'JSNavigationBar',
			iosData,
			function (cre) {
				//clientReturn
				if (typeof callback === 'function') callback(cre)
			}
		)
	} else {
		var pTop = window.WKWebViewJavascriptBridge.JSNavigationBar(anData)
		if (typeof callback === 'function') callback(pTop)
	}
}
window.JSGetParentWindowType_toBridge = function (callback) {
	var isDialog = window.WKWebViewJavascriptBridge.JSGetParentWindowType()
	if (typeof callback === 'function') callback(isDialog)
}
window.JSRegMsgType_toBridge = function (array) {
	if (isiOS) {
		window.WKWebViewJavascriptBridge.callHandler('JSRegMsgType', array)
	} else {
		window.WKWebViewJavascriptBridge.JSRegMsgType(JSON.stringify(array))
	}
}
// toast
function h5Toast(msg) {
	var h5ToastDom
	if (!document.querySelector('#h5-toast')) {
		var h5ToastStyle = document.createElement('style')
		h5ToastDom = document.createElement('div')
		h5ToastDom.setAttribute('id', 'h5-toast')
		h5ToastStyle.setAttribute('id', 'h5-toast-style')
		h5ToastStyle.innerHTML =
			'#h5-toast{box-sizing:border-box;position:fixed;z-index:99999;top:0;left:calc(50% - 5rem);width:10rem;margin:0;padding:0 1em;border:0;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;color:#FFF;font-size:.365rem;line-height:3em;background:#73cdcb;transform:translateY(-100%);}#h5-toast.h5-toast-show{animation:h5ToastShow 2s linear;}@keyframes h5ToastShow{0%{transform:translateY(-100%);}3%{transform:translateY(0);}95%{transform:translateY(0);}100%{transform:translateY(-100%);}}'
		document.querySelector('body').appendChild(h5ToastStyle)
		document.querySelector('body').appendChild(h5ToastDom)
	}
	h5ToastDom = document.querySelector('#h5-toast')
	h5ToastDom.innerHTML = msg
	h5ToastDom.removeAttribute('class')
	setTimeout(function () {
		h5ToastDom.setAttribute('class', 'h5-toast-show')
	}, 10)
}

window.onload = function () {
	//ga代碼
	if (window.setGA !== true) {
		var gtagJS = document.createElement('script')
		gtagJS.async = true
		document.querySelector('body').appendChild(gtagJS)
		gtagJS.addEventListener('load', function () {
			window.setGA = true
			window.dataLayer = window.dataLayer || []
			window.gtag = function () {
				dataLayer.push(arguments)
			}
			gtag('js', new Date())
			gtag('config', 'G-V1B3HEMCSG')
		})
		gtagJS.setAttribute(
			'src',
			'https://www.googletagmanager.com/gtag/js?id=G-V1B3HEMCSG'
		)
	}
}
