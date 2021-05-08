var router = require('express').Router();
var path = require('path');
var { getFileContent, writeFileContent } = require('../utils/file.util');

const fileName = path.join(__dirname, '..', 'db', 'todo.db.json');

function getNextId() {
    return getFileContent(fileName)
        .then(parsedData => {
            return parsedData.length === 0 ? 1 : parsedData[parsedData.length - 1].id + 1;
        });
}


// http://localhost:3000/api/todos/
router.get('/', function (_, res) {
    getFileContent(fileName)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        });
});

// http://localhost:3000/api/todos
router.post('/', function (req, res) {

    var _id;
    getNextId()
        .then(id => (_id = id))
        .then(_ => getFileContent(fileName))
        .then(todos => {
            var todo = { ...req.body, id: _id };
            todos.push(todo);
            return writeFileContent(fileName, todos);
        })
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
        })
});

// http://localhost:3000/api/todos/1
router.put('/:id', function (req, res) {

    var { id } = req.params;
    var updatedObj = req.body;

    var _todos;
    var _idx;
    getFileContent(fileName)
        .then(todos => (_todos = todos))
        .then(todos => (todos.findIndex(todo => todo.id == id)))
        .then(idx => (_idx = idx))
        .then(idx => (idx != -1))
        .then(isPresent => {
            if (isPresent) {
                _todos[_idx] = { ...updatedObj, id: id };
                return writeFileContent(fileName, _todos);
            }
            // means that the id the uses has passed to me is not present
            return {
                success: false,
                msg: 'Todo with the specified id does not exist'
            };
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
});

// http://localhost:3000/api/todos/1
router.patch('/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    var _todos;
    var _idx;
    getFileContent(fileName)
        .then(todos => (_todos = todos))
        .then(todos => (todos.findIndex(todo => todo.id == id)))
        .then(idx => (_idx = idx))
        .then(idx => (idx != -1))
        .then(isPresent => {
            if (isPresent) {
                _todos[_idx] = { ..._todos[_idx], ...updatedObj, id: id };
                return writeFileContent(fileName, _todos);
            }
            // means that the id the uses has passed to me is not present
            return {
                success: false,
                msg: 'Todo with the specified id does not exist'
            };
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
});

// http://localhost:3000/api/todos/1
router.delete('/:id', function (req, res) {

    var { id } = req.params;

    getFileContent(fileName)
        .then(todos => todos.filter(todo => todo.id != id))
        .then(newTodos => writeFileContent(fileName, newTodos))
        .then(_ => res.json({}))
        .catch(err => {
            console.log(err);
        });
});


module.exports = router;
