// clipboard

const makeError = () => {
    return new DOMException('The request is not allowed', 'NotAllowedError');
};

const copyExecCommand = async (text) => {
    const span = document.createElement('span');

    span.textContent = text;
    span.style.whiteSpace = 'pre';
    span.style.webkitUserSelect = 'auto';
    span.style.userSelect = 'all';
    document.body.appendChild(span);

    const selection = window.getSelection();
    const range = window.document.createRange();

    selection&&selection.removeAllRanges();
    range.selectNode(span);
    selection&&selection.addRange(range);

    let success = false;
    try {
        success = window.document.execCommand('copy');
    } finally {
        selection&&selection.removeAllRanges();
        window.document.body.removeChild(span);
    }

    if (!success) throw makeError();
};

const copyClipboardApi = async (text) => {
    if (!window.navigator.clipboard) throw makeError();
    return window.navigator.clipboard.writeText(text);
};

const copy = async (text, cb) => {
    try {
        await copyClipboardApi(text);
        cb&&cb();
    } catch (err) {
        try {
            await copyExecCommand(text);
            cb&&cb();
        } catch (err2) {
            throw err2 || err || makeError();
        }
    }
};

export default copy;
