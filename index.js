(function() {
  'use strict'

  if (global.window.FormData) {
    return
  }

  class FormData {
    constructor() {
      this.fake = true;
      this.boundary = '--------FormData' + Math.random();
      this._params = [];
    }

    append(key, value) {
      this._params.push([key, value]);
    }

    toString() {
      var boundary = this.boundary;
      var body = '';
      this._params.forEach((param) => {
        body += '--' + boundary + '\r\n';
        // file upload
        if (param[1].name) {
            var file = param[1];
            body += `Content-Disposition: form-data; name="${param[0]}"; filename="${file.name}"\r\n`;
            body += `Content-Type: ${file.type}\r\n\r\n`
            body += file.getAsBinary() + '\r\n';
        } else {
            body += `Content-Disposition: form-data; name="${param[0]}";\r\n\r\n`;
            body += param[1] + '\r\n';
        }
      });
      body += '--' + boundary +'--';
      return body;
    }
  }

  global.window.FormData = FormData;

}())
