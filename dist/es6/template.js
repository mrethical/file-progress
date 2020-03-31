var isStylePublished = false;
var style = "\n  .file-progress {\n    width: 100%;\n    height: 40px;\n    position: relative;\n    display: flex;\n    background-color: #f5f6fa;\n    cursor: pointer;\n    padding: 0 8px 0 16px\n  }\n\n  .file-progress:hover {\n    background-color: #e3e4e8;\n  }\n\n  .file-progress__bar {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 100%;\n    background-color: #d6ffe4;\n    transition: right 1s ease-in-out;\n  }\n\n  .file-progress__name {\n    flex: 1;\n    margin: auto;\n    z-index: 1;\n  }\n\n  .file-progress__button {\n    display: none;\n    background: none;\n    border: none;\n    cursor: pointer;\n    outline: none;\n    z-index: 1;\n  }\n\n  .file-progress.file-progress--has-file .file-progress__button {\n    display: block;\n  }\n";
var templateClass = 'file-progress';
var template = "\n  <div class=\"file-progress__bar\"></div>\n  <span class=\"file-progress__name\"></span>\n  <button type=\"button\" class=\"file-progress__button\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z\"/></svg></button>\n";
export default function createDOM() {
    if (!isStylePublished) {
        var headEl = document.head || document.getElementsByTagName('head')[0], styleEl = document.createElement('style');
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
