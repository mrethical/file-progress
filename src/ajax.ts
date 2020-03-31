
export default class Ajax
{
  constructor(
    url: string,
    data: object = {},
    onProgress = (percentage) => {},
    onSuccess = (response, xhr) => {},
  ) {
    try {
      // @ts-ignore
      let xhr = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
      xhr.open(data ? 'POST' : 'GET', url, 1);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onprogress = (evt) => {
        if (evt.lengthComputable) {
          onProgress((evt.loaded / evt.total) * 100);
        }
      };
      xhr.onreadystatechange = function () {
        xhr.readyState > 3 && onSuccess && onSuccess(xhr.responseText, xhr);
      };
      xhr.send(data)
    } catch (e) {
      window.console && console.log(e);
    }
  }
}
