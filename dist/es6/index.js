import createDOM from "./template";
import Ajax from "./ajax";
var FileProgress = /** @class */ (function () {
    function FileProgress(el, options) {
        var _this = this;
        if (options === void 0) { options = {
            url: '',
            upload: null,
            label: null,
            onRemove: null,
        }; }
        this._chooseFileLabel = 'Choose File ...';
        this._progressCount = 0;
        var $this = this;
        this._fileInput = typeof el === 'string'
            ? document.getElementById(el)
            : el;
        this._options = {
            url: options.url || '',
            upload: options.upload || null,
            label: options.label || (function (f) {
                if (typeof f === 'undefined') {
                    return _this._chooseFileLabel;
                }
                return f.name;
            }),
            onRemove: options.onRemove || (function () { }),
        };
        this._el = createDOM();
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
        }
        else {
            var file = files[0];
            this._label.innerHTML = this._options.label(file);
            if (this._options.upload) {
                this._options.upload(file, this);
            }
            else if (this._isAjax()) {
                var formData = new FormData();
                formData.append(this._el.getAttribute('name'), files[0]);
                new Ajax(this._options.url, formData, function (percentage) {
                    _this.progress(percentage);
                }, function () {
                    _this.progress(100);
                });
            }
            else {
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
        }
        else {
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
}());
export default FileProgress;
