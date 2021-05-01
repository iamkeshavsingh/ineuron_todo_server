var router = require('express').Router();


var todos = [];

function getNextId() {
    return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
}


// http://localhost:3000/api/todos/
router.get('/', function (req, res) {
    res.json(todos);
});

// http://localhost:3000/api/todos
router.post('/', function (req, res) {

    var todo = { ...req.body, id: getNextId() };
    todos.push(todo);
    res.json(todo);
});

// http://localhost:3000/api/todos/1
router.put('/:id', function (req, res) {

    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        todos[idx] = { ...updatedObj, id: id };
        return res.send({ ...updatedObj, id: id });
    }
    return json({
        msg: 'Todo with the specified id does not exist'
    });
});

// http://localhost:3000/api/todos/1
router.patch('/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        todos[idx] = { ...todos[idx], ...updatedObj, id: id };
        return res.send({ ...todos[idx], ...updatedObj, id: id });
    }
    return json({
        msg: 'Todo with the specified id does not exist'
    });
});

// http://localhost:3000/api/todos/1
router.delete('/:id', function (req, res) {

    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json(todos);
});


module.exports = router;