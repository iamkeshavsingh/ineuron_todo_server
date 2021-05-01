const express = require('express');
const app = express();




app.use(express.json());


var todos = [];

function getNextId() {
    return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
}

// http://localhost:3000/api/todos
app.get('/api/todos', function (req, res) {
    res.json(todos);
});

// http://localhost:3000/api/todos
app.post('/api/todos', function (req, res) {

    var todo = { ...req.body, id: getNextId() };
    todos.push(todo);
    res.json(todo);
});

// http://localhost:3000/api/todos/1
app.put('/api/todos/:id', function (req, res) {

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
app.patch('/api/todos/:id', function (req, res) {
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
app.delete('/api/todos/:id', function (req, res) {

    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json(todos);
});



app.listen(3000, () => {
    console.log("Server is started at port 3000");
});






