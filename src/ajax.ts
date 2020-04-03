
export default class Ajax
{
  constructor(
    url: string,
    data?: object,
    onProgress?: ((percentage: number) => void),
    onSuccess?: ((responseText: string, xhr: XMLHttpRequest) => void),
  ) {
    // @ts-ignore
    const xhr = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    xhr.open(data ? 'POST' : 'GET', url, 1);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onprogress = (evt) => {
      if (evt.lengthComputable && onProgress) {
        onProgress((evt.loaded / evt.total) * 100);
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState > 3 && onSuccess) {
        onSuccess(xhr.responseText, xhr);
      }
    };
    xhr.send(data);
  }
}
