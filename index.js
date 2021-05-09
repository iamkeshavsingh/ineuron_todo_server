const express = require('express');
const app = express();

const errorHandler = require('./utils/error.utils');


const todoRoutes = require('./routes/todo.route');


app.use(express.json());





app.use('/api/todos', todoRoutes);


app.use(errorHandler);



app.listen(3000, () => {
    console.log("Server is started at port 3000");
});






