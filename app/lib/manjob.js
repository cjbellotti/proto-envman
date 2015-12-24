var fs = require('fs');
var _ = require('underscore');

var manjob = {};
var path = __dirname + '/../data/jobs.json';

manjob.read = function (id, callback) {

  fs.readFile(path, function (err, data) {

    var response = {};
    if (!err) {

      data = JSON.parse(data.toString('utf8'));

      if (id != undefined) {

        var index = _.findIndex(data, { job : parseInt(id) });
        if (index >= 0) {
          response = data[index];
        } else {
          response = {
            err : "Job inexistente"
          };
        }

      } else {
        response = data;
      }
      
    }  

    callback(err, response);

  });

};

manjob.save = function (jobData, callback) {

  fs.readFile(path, function (err, data) {

    var response = {};
    if (!err) {

      data = JSON.parse(data.toString('utf8'));

      data.sort(function (a, b) {
        return a.job - b.job;
      });

      jobData.job = (data.length > 0) ? data[data.length - 1].job + 1 : 1;
      data.push(jobData);

      fs.writeFile(path, JSON.stringify(data), function (err, data) {

        callback(err, jobData);

      });

    } else {

      callback(err, null);

    }

  });

};

manjob.update = function (id, jobData, callback) {

  fs.readFile(path, function (err, data) {

    var response = {};
    if (!err) {

      data = JSON.parse(data.toString('utf8'));

      var index = _.findIndex(data, { job : parseInt(id) });
      if (index >= 0) {
        data[index] = jobData;
        response = data[index];
        fs.writeFile(path, JSON.stringify(data), function (err, data) {

          callback(err, response);

        });

      } else {

        response = {
          err : "Job inexistente"
        };
        callback(err, response);

      }

    } else {

      callback(err, response);

    }

  });

};

module.exports = manjob;


