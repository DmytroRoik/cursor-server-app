module.exports = {
    builder(response, data) {
      let _data = data;
  
      if (typeof _data === 'undefined') {
        _data = '';
      }
  
      if (_data instanceof Error) {
        let _statusCode = 500;
        if (_data.statusCode) _statusCode = _data.statusCode;
        response.status(_statusCode).json({ error: _data.message });
      } else response.status(200).json({ ..._data });
    },
  
    sendFile(res, data) {
      const { buffer, extension } = data;
      res.setHeader('Content-Type', 'blob');
      res.setHeader('x-extension', extension)
      res.end(buffer);
    },
  
    render(response, path, options) {
      let ext = '';
      if (!/\.\w+$/.test(path)) {
        ext = '.html';
      }
  
      response.render(`${path}${ext}`, options);
    }
  };
  