var fs = require('fs').promises;


exports.getFileContent = function (fileName) {

    return fs.readFile(fileName)
        .then(data => JSON.parse(data.toString()));
}

exports.writeFileContent = function (fileName, data) {

    return fs.writeFile(fileName, JSON.stringify(data))
        .then(_ => 'Created')
}