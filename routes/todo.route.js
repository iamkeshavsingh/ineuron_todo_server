var router = require('express').Router();
var path = require('path');
var { getFileContent, writeFileContent } = require('../utils/file.util');

const fileName = path.join(__dirname, '..', 'db', 'todo.db.json');

function getNextId(cb) {
    getFileContent(fileName, function (err, todos) {
        if (err) return cb(err);
        return cb(null, todos.length === 0 ? 1 : todos[todos.length - 1].id + 1, todos);
    });
}


// http://localhost:3000/api/todos/
router.get('/', function (req, res) {
    getFileContent(fileName, function (err, todos) {
        if (err) throw err;
        res.json(todos);
    });
});

// http://localhost:3000/api/todos
router.post('/', function (req, res) {

    getNextId(function (err, id, todos) {
        if (err) throw err;
        var todo = { ...req.body, id: id };
        todos.push(todo);
        writeFileContent(fileName, todos, function (err, data) {
            if (err) throw err;
            res.json(todo);
        });
    });

});

// http://localhost:3000/api/todos/1
router.put('/:id', function (req, res) {

    var { id } = req.params;
    var updatedObj = req.body;
    getFileContent(fileName, function (err, todos) {
        if (err) throw err;
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...updatedObj, id: id };
            return writeFileContent(fileName, todos, function (err) {
                if (err) throw err;
                return res.json({ ...updatedObj, id: id });
            })
        }
        return res.json({
            msg: 'Todo with the specified id does not exist'
        });
    })
});

// http://localhost:3000/api/todos/1
router.patch('/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    getFileContent(fileName, function (err, todos) {
        if (err) throw err;
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...todos[idx], ...updatedObj, id: id };
            return writeFileContent(fileName, todos, function (err) {
                if (err) throw err;
                return res.json({ ...todos[idx], ...updatedObj, id: id });
            });
        }
        return res.json({
            msg: 'Todo with the specified id does not exist'
        });
    })
});

// http://localhost:3000/api/todos/1
router.delete('/:id', function (req, res) {

    var { id } = req.params;
    getFileContent(fileName, function (err, todos) {
        if (err) throw err;
        todos = todos.filter(todo => todo.id != id);
        writeFileContent(fileName, todos, function (err) {
            if (err) throw err;
            res.json({});
        });
    })
});


module.exports = router;