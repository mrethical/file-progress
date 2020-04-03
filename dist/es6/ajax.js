var Ajax = /** @class */ (function () {
    function Ajax(url, data, onProgress, onSuccess) {
        // @ts-ignore
        var xhr = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        xhr.open(data ? 'POST' : 'GET', url, 1);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onprogress = function (evt) {
            if (evt.lengthComputable && onProgress) {
                onProgress((evt.loaded / evt.total) * 100);
            }
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && onSuccess) {
                onSuccess(xhr.responseText, xhr);
            }
        };
        xhr.send(data);
    }
    return Ajax;
}());
export default Ajax;
