var fs = require('fs').promises;


exports.getFileContent = async function (fileName) {

    var bufferData = await fs.readFile(fileName);
    return JSON.parse(bufferData.toString());
}

exports.writeFileContent = async function (fileName, data) {

    await fs.writeFile(fileName, JSON.stringify(data))
    return 'Created';
}