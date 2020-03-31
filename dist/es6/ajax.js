var Ajax = /** @class */ (function () {
    function Ajax(url, data, onProgress, onSuccess) {
        if (data === void 0) { data = {}; }
        if (onProgress === void 0) { onProgress = function (percentage) { }; }
        if (onSuccess === void 0) { onSuccess = function (response, xhr) { }; }
        try {
            // @ts-ignore
            var xhr_1 = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
            xhr_1.open(data ? 'POST' : 'GET', url, 1);
            xhr_1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr_1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr_1.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    onProgress((evt.loaded / evt.total) * 100);
                }
            };
            xhr_1.onreadystatechange = function () {
                xhr_1.readyState > 3 && onSuccess && onSuccess(xhr_1.responseText, xhr_1);
            };
            xhr_1.send(data);
        }
        catch (e) {
            window.console && console.log(e);
        }
    }
    return Ajax;
}());
export default Ajax;
