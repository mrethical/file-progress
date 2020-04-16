# file-progress

An extended HTML file input that looks like a progress bar.

## Features

- Lightweight, no dependencies.
- Better HTML file input design.
- Has option to upload file via ajax and show progress.
  - Use your own implementation for ajax file upload.

## Installation

Using npm:

```bash
$ npm install file-progress
```

Using yarn:

```bash
$ yarn add file-progress
```

Cloning the repo:
```bash
$ git clone https://github.com/mrethical/file-progress
```

## Usage
```html
...
<body>
  <input type="file" id="file-progress-input">
  <script type="text/javascript" src="./dist/file-progress.js"></script>
</body>
...
```
```javascript
const fileProgress = new FileProgress('file-progress-input');
```
If you installed the library via package manager, you can use the library by importing it.
```javascript
import FileProgress from "file-progress";

const fileProgress = new FileProgress('file-progress-input');
```

## Options

| option   | type                               | description                                                     |
| :------- | :--------------------------------- | :-------------------------------------------------------------- |
| url      | string                             | if set, will send selected file to the url via ajax             |
| upload   | function(File, FileProgress): void | function for implementing custom ajax call rather than built in |
| label    | function(File?): void              | function for setting custom label                               |
| onRemove | function(): void                   | callback when file was cleared/removed                          |

To set options, provide them at class initialization.
```javascript
const fileProgress = new FileProgress('file-progress-input', {
    url: 'https://example.com/upload'
});
```
## Methods

| name     | parameters          | description                                                        |
| :------- | :------------------ | :----------------------------------------------------------------- |
| progress | percentage (number) | set file progress bar (useful when using own ajax upload function) |
| prefill  | prefill (label)     | update the input label without updating the file                   |
| open     |                     | open file modal                                                    |
| set      | fileList (FileList) | programatically set files of input                                 |
| clear    |                     | remove files                                 |

## Screenshots

![Imgur](https://i.imgur.com/1MdowPf.jpg?cache_reload_count=1)

![Imgur](https://i.imgur.com/tL7jmxv.jpg)

## License
This library is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
