var router = require('express').Router();
var path = require('path');
var { getFileContent, writeFileContent } = require('../utils/file.util');
const { badRequest, internalServerError } = require('../utils/Error')

const fileName = path.join(__dirname, '..', 'db', 'todo.db.jsons');

async function getNextId() {
    var parsedData = await getFileContent(fileName);
    return parsedData.length === 0 ? 1 : parsedData[parsedData.length - 1].id + 1;
}


// http://localhost:3000/api/todos/
router.get('/', async function (_, res, next) {
    try {
        var parsedData = await getFileContent(fileName);
        return res.json(parsedData);
    }
    catch (err) {
        next(internalServerError.getError('Something Went Wrong'));
    }
});

// http://localhost:3000/api/todos
router.post('/', async function (req, res, next) {

    try {
        var id = await getNextId();
        var todos = await getFileContent(fileName);
        var todo = { ...req.body, id: id };
        todos.push(todo);
        var data = await writeFileContent(fileName, todos);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});

// http://localhost:3000/api/todos/1
router.put('/:id', async function (req, res, next) {

    try {
        var { id } = req.params;
        var updatedObj = req.body;

        var todos = await getFileContent(fileName);
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...updatedObj, id: id };
            var data = await writeFileContent(fileName, todos);
            return res.json(data);
        }

        next(badRequest.getError('Todo with the specified id does not exist'));
    }
    catch (err) {
        next(err);
    }

});

// http://localhost:3000/api/todos/1
router.patch('/:id', async function (req, res, next) {
    try {
        var { id } = req.params;
        var updatedObj = req.body;

        var todos = await getFileContent(fileName);
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...todos[idx], ...updatedObj, id: id };
            var data = await writeFileContent(fileName, todos);
            return res.json(data);
        }

        next(badRequest.getError('Todo with the specified id does not exist'));
    }
    catch (err) {
        next(err);
    }
});

// http://localhost:3000/api/todos/1
router.delete('/:id', async function (req, res, next) {

    try {
        var { id } = req.params;

        var todos = await getFileContent(fileName);
        var newTodos = todos.filter(todo => todo.id != id);
        if (todos.length === newTodos.length) {
            // that's means that no todo is been deleted
            // stop the execution and give a 400 Bad request
            return next(badRequest.getError('No Todo is present'));
        }
        await writeFileContent(fileName, todos);
        return res.json({});
    }
    catch (err) {
        next(internalServerError.getError('Something Went Wrong'));
    }
});


module.exports = router;