const https = require('https');
var UTILS =  {
  register: function(client) {
    this.client = client
  },
  getInviteInfo: function(invite) {
    let error = {message: "Proccessing Failed", code: -1}
    return new Promise(function(resolve, reject) {
      try {
        https.get(UTILS.client.options.http.api.replace(/\/$/,"")+'/v'+UTILS.client.options.http.version+'/invites/'+(invite||"").replace(/^(\s|\r|\n)+/,"").replace(/(\s|\r|\n)+$/,"").replace(/^(https*:\/\/)*discord.gg\//,""), function (res) {
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', function(chunk) {rawData += chunk});
          res.on('end', function () {
            try {
              const parsedData = JSON.parse(rawData);
              if (Math.trunc(res.statusCode / 100) !== 2) reject(parsedData);
              else resolve(parsedData);
            } catch (e) {
              reject(error)
            }
          })
        }).on('error', function (e) {
          reject(error);
        })
      }
      catch(e){reject(error)}
    })
  }
}
module.exports = UTILS;
UTILS.register({options:{http:{api: "https://discord.com/api",version:8}}});
UTILS.getInviteInfo("y").then(console.log).catch(console.log);
