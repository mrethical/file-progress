import createDOM from "./template";
import Ajax from "./ajax";



export default class FileProgress
{
  private _el: HTMLElement;
  private _fileInput: HTMLInputElement;

  private _options: {
    url: string,
    upload: {(File, FileProgress): void}|null,
    label: {(File?): string},
    onRemove: {(): void},
  };

  private _bar: HTMLElement;
  private _label: HTMLElement;
  private _clearButton: HTMLElement;

  private readonly _chooseFileLabel = 'Choose File ...';

  private _progressCount = 0;

  constructor(
    el: string | HTMLElement | HTMLInputElement,
    options: {
      url: string,
      upload: {(File, FileProgress): void}|null,
      label: {(File?): string}|null,
      onRemove: {(): void}|null,
    } = {
      url: '',
      upload: null,
      label: null,
      onRemove: null,
    }
  ) {
    let $this = this;

    this._fileInput = typeof el === 'string'
      ? <HTMLInputElement>document.getElementById(el)!
      : <HTMLInputElement>el;
    this._options = {
      url: options.url || '',
      upload: options.upload || null,
      label: options.label || ((f: File) => {
        if (typeof f === 'undefined') {
          return this._chooseFileLabel;
        }
        return f.name;
      }),
      onRemove: options.onRemove || (() => {}),
    };

    this._el = createDOM();
    this._fileInput.parentNode!.insertBefore(this._el, this._fileInput.nextSibling);
    this._fileInput.style.display = 'none';
    this._bar = this._el.querySelector('div')!;
    this._label = this._el.querySelector('span')!;
    this._label.innerHTML = this._options.label();
    this._clearButton = this._el.querySelector('button')!;

    this._label.addEventListener('click', function(e) {
      if ($this._isUploading() || e.target !== $this._label) {
        return;
      }
      $this._fileInput.click();
    });

    this._fileInput.addEventListener('change', function(e) {
      $this._setFiles((<HTMLInputElement>e.target).files!);
    });

    this._clearButton.addEventListener('click', () => {
      if (this._isUploading()) {
        return;
      }
      this._fileInput.value = "";
      this._el.classList.remove('file-progress--has-file');
      this._label.innerHTML = this._options.label();
      if (!this._isAjax()) {
        this._bar.style.right = '';
      }
      this._options.onRemove()
    });
  }

  private _isAjax() {
    return this._options.url.length > 0;
  }

  private _isUploading() {
    return this._progressCount !== 0;
  }

  private _setFiles(files?: FileList) {
    this._el.classList.add('file-progress--has-file');
    if (!files || files!.length === 0) {
      this._clearButton.click();
    } else {
      let file = files[0];
      this._label.innerHTML = this._options.label(file);
      if (this._options.upload) {
        this._options.upload(file, this);
      }
      else if (this._isAjax()) {
        let formData = new FormData();
        formData.append(this._el.getAttribute('name')!, files[0]);
        new Ajax(
          this._options.url,
          formData,
          (percentage) => {
            this.progress(percentage)
          },
          () => {
            this.progress(100);
          }
        )
      }
      else {
        this._bar.style.right = '0';
      }
    }
  }

  progress(percentage: number) {
    this._progressCount = percentage;
    this._bar.style.right = `${100-percentage}%`;
    if (percentage === 100) {
      this._progressCount = 0;
    }
    if (this._isUploading()) {
      this._el.classList.add('file-progress--uploading');
    } else {
      this._el.classList.remove('file-progress--uploading');
    }
  }

  prefill(label) {
    this._el.classList.add('file-progress--has-file');
    this._bar.style.right = '0';
    this._label.innerHTML = label;
  }

  open() {
    this._fileInput.click();
  }

  set(fileList: FileList) {
    this._fileInput.files = fileList;
    this._setFiles(fileList);
  }
}
