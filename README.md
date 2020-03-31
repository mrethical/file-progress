# file-progress

An extended HTML file input that looks like a progress bar.

## Features

- Better HTML file input design.
- Set file input to upload via ajax and show progress.
- Use your own implementation for ajax file upload.

## Installation

Using npm:

```bash
$ npm install https://github.com/mrethical/file-progress
```

Using yarn:

```bash
$ npm add https://github.com/mrethical/file-progress
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
new FileProgress('file-progress-input');
```

## Soon

- more detailed documentation
- host on npmjs
