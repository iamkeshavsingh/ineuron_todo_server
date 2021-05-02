var fs = require('fs');


exports.getFileContent = function (fileName, cb) {

    fs.readFile(fileName, function (err, data) {
        if (err) return cb(err, null);
        return cb(null, JSON.parse(data.toString()));
    });
}


exports.writeFileContent = function (fileName, data, cb) {

    fs.writeFile(fileName, JSON.stringify(data), function cb1(err) {
        if (err) return cb(err, null);
        return cb(null, 'Created');
    });

}