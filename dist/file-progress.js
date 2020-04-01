(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Ajax = /** @class */function () {
    function Ajax(url, data, onProgress, onSuccess) {
        if (data === void 0) {
            data = {};
        }
        if (onProgress === void 0) {
            onProgress = function onProgress(percentage) {};
        }
        if (onSuccess === void 0) {
            onSuccess = function onSuccess(response, xhr) {};
        }
        try {
            // @ts-ignore
            var xhr_1 = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
            xhr_1.open(data ? 'POST' : 'GET', url, 1);
            xhr_1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr_1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr_1.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    onProgress(evt.loaded / evt.total * 100);
                }
            };
            xhr_1.onreadystatechange = function () {
                xhr_1.readyState > 3 && onSuccess && onSuccess(xhr_1.responseText, xhr_1);
            };
            xhr_1.send(data);
        } catch (e) {
            window.console && console.log(e);
        }
    }
    return Ajax;
}();
exports.default = Ajax;

},{}],2:[function(require,module,exports){
"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
window.FileProgress = _index2.default;

},{"./index":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = require("./template");

var _template2 = _interopRequireDefault(_template);

var _ajax = require("./ajax");

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileProgress = /** @class */function () {
    function FileProgress(el, options) {
        var _this = this;
        if (options === void 0) {
            options = {
                url: '',
                upload: null,
                label: null,
                onRemove: null
            };
        }
        this._chooseFileLabel = 'Choose File ...';
        this._progressCount = 0;
        var $this = this;
        this._fileInput = typeof el === 'string' ? document.getElementById(el) : el;
        this._options = {
            url: options.url || '',
            upload: options.upload || null,
            label: options.label || function (f) {
                if (typeof f === 'undefined') {
                    return _this._chooseFileLabel;
                }
                return f.name;
            },
            onRemove: options.onRemove || function () {}
        };
        this._el = (0, _template2.default)();
        this._fileInput.parentNode.insertBefore(this._el, this._fileInput.nextSibling);
        this._fileInput.style.display = 'none';
        this._bar = this._el.querySelector('div');
        this._label = this._el.querySelector('span');
        this._label.innerHTML = this._options.label();
        this._clearButton = this._el.querySelector('button');
        this._label.addEventListener('click', function (e) {
            if ($this._isUploading() || e.target !== $this._label) {
                return;
            }
            $this._fileInput.click();
        });
        this._fileInput.addEventListener('change', function (e) {
            $this._setFiles(e.target.files);
        });
        this._clearButton.addEventListener('click', function () {
            if (_this._isUploading()) {
                return;
            }
            _this._fileInput.value = "";
            _this._el.classList.remove('file-progress--has-file');
            _this._label.innerHTML = _this._options.label();
            if (!_this._isAjax()) {
                _this._bar.style.right = '';
            }
            _this._options.onRemove();
        });
    }
    FileProgress.prototype._isAjax = function () {
        return this._options.url.length > 0;
    };
    FileProgress.prototype._isUploading = function () {
        return this._progressCount !== 0;
    };
    FileProgress.prototype._setFiles = function (files) {
        var _this = this;
        this._el.classList.add('file-progress--has-file');
        if (!files || files.length === 0) {
            this._clearButton.click();
        } else {
            var file = files[0];
            this._label.innerHTML = this._options.label(file);
            if (this._options.upload) {
                this._options.upload(file, this);
            } else if (this._isAjax()) {
                var formData = new FormData();
                formData.append(this._el.getAttribute('name'), files[0]);
                new _ajax2.default(this._options.url, formData, function (percentage) {
                    _this.progress(percentage);
                }, function () {
                    _this.progress(100);
                });
            } else {
                this._bar.style.right = '0';
            }
        }
    };
    FileProgress.prototype.progress = function (percentage) {
        this._progressCount = percentage;
        this._bar.style.right = 100 - percentage + "%";
        if (percentage === 100) {
            this._progressCount = 0;
        }
        if (this._isUploading()) {
            this._el.classList.add('file-progress--uploading');
        } else {
            this._el.classList.remove('file-progress--uploading');
        }
    };
    FileProgress.prototype.prefill = function (label) {
        this._el.classList.add('file-progress--has-file');
        this._bar.style.right = '0';
        this._label.innerHTML = label;
    };
    FileProgress.prototype.open = function () {
        this._fileInput.click();
    };
    FileProgress.prototype.set = function (fileList) {
        this._fileInput.files = fileList;
        this._setFiles(fileList);
    };
    return FileProgress;
}();
exports.default = FileProgress;

},{"./ajax":1,"./template":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createDOM;
var isStylePublished = false;
var style = "\n  .file-progress {\n    width: 100%;\n    height: 40px;\n    position: relative;\n    display: flex;\n    background-color: #f5f6fa;\n    cursor: pointer;\n    padding: 0 8px 0 16px\n  }\n\n  .file-progress:hover {\n    background-color: #e3e4e8;\n  }\n\n  .file-progress__bar {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 100%;\n    background-color: #d6ffe4;\n    transition: right 1s ease-in-out;\n  }\n\n  .file-progress__name {\n    flex: 1;\n    margin: auto;\n    z-index: 1;\n  }\n\n  .file-progress__button {\n    display: none;\n    background: none;\n    border: none;\n    cursor: pointer;\n    outline: none;\n    z-index: 1;\n  }\n\n  .file-progress.file-progress--has-file .file-progress__button {\n    display: block;\n  }\n";
var templateClass = 'file-progress';
var template = "\n  <div class=\"file-progress__bar\"></div>\n  <span class=\"file-progress__name\"></span>\n  <button type=\"button\" class=\"file-progress__button\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z\"/></svg></button>\n";
function createDOM() {
    if (!isStylePublished) {
        var headEl = document.head || document.getElementsByTagName('head')[0],
            styleEl = document.createElement('style');
        headEl.appendChild(styleEl);
        styleEl.appendChild(document.createTextNode(style));
        isStylePublished = true;
    }
    var el = document.createElement('div');
    el.className = templateClass;
    el.innerHTML = template;
    return el;
}
;

},{}]},{},[2]);
