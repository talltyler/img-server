var fs = require('fs');
var express = require('express');
var app = express();
var request = require('request');
var sharp = require('sharp');
var multer = require('multer');
var cors = require('express-cors');
var merge = require('merge');
var uuid = require('node-uuid');
var methods = require('./methods');

app.use(express.static(__dirname + '/public'));

app.use(cors({
  allowedOrigins: ['*']
}));

app.use(multer({
  dest: './uploads/'
}));

app.all('/', function(req, res, next) {
  try {
    var readStream;
    var params = merge(req.params, req.query);
    if (params.src) {
      readStream = request(params.src);
    } else if (req.files && req.files.filefield && req.files.filefield.path) {
      readStream = fs.createReadStream(req.files.filefield.path);
    } else {
      return next();
    }
    var format = 'png';
    var fileName = '/i/' + uuid.v4() + '.' + format;
    var transformer = sharp();
    // Test this option: transformer.sequentialRead();
    // limit size transformer.limitInputPixels(0x3FFF * 0x3FFF)
    var options = merge(req.body, req.query);
    Object.keys(options).forEach(function(name) {
      var method = methods[name];
      var value = options[name];
      if (method) {
        if (method.type === 'numbers') {
          var values = value.split(',').map(function(val) {
            return parseFloat(val);
          });
          transformer[name].apply(transformer, values);
        } else {
          transformer[name](value);
        }
      }
    });

    var writableStream = fs.createWriteStream('./public' + fileName);
    var transformed = readStream.pipe(transformer);
    transformed.on('end', function() {
      res.redirect(fileName);
      next();
    });
    transformed.pipe(writableStream, {
      end: true
    });
  } catch (err) {
    return res.status(400).end('Error: ' + err.message);
  }
});

app.get('/', function(req, res) {
  var head = '<html><head></head><body><form method="POST" enctype="multipart/form-data"><input type="file" name="filefield"><br />';
  var footer = '<input type="submit"></form></body></html>';
  var body = '';
  Object.keys(methods).forEach(function(method) {
    var obj = methods[method];
    var type = (obj.type === 'boolean') ? 'checkbox' : 'text';
    if (obj.options) {
      body += '<select name="' + method + '">';
      obj.options.forEach(function(option) {
        body += '<option>' + option + '</option>';
      });
      body += '</select> ' + obj.name + '<br/>';
    } else {
      body += '<input type="' + type + '" name="' + method + '" placeholder="' + obj.signature + '"> ' + obj.name + '<br />';
    }
  });
  res.end(head + body + footer);
});

app.listen(process.env.PORT || 3000);
