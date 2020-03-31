
let isStylePublished = false;
const style = `
  .file-progress {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    background-color: #f5f6fa;
    cursor: pointer;
    padding: 0 8px 0 16px
  }

  .file-progress:hover {
    background-color: #e3e4e8;
  }

  .file-progress__bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 100%;
    background-color: #d6ffe4;
    transition: right 1s ease-in-out;
  }

  .file-progress__name {
    flex: 1;
    margin: auto;
    z-index: 1;
  }

  .file-progress__button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    z-index: 1;
  }

  .file-progress.file-progress--has-file .file-progress__button {
    display: block;
  }
`;

const templateClass = 'file-progress';
const template = `
  <div class="file-progress__bar"></div>
  <span class="file-progress__name"></span>
  <button type="button" class="file-progress__button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg></button>
`;

export default function createDOM() {
  if (!isStylePublished) {
    let headEl = document.head || document.getElementsByTagName('head')[0],
        styleEl = document.createElement('style');
    headEl.appendChild(styleEl);
    styleEl.appendChild(document.createTextNode(style));
    isStylePublished = true;
  }
  const el = document.createElement('div');
  el.className = templateClass;
  el.innerHTML = template;
  return el;
};
