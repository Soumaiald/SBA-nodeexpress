const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tasks = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/getTasks', (req, res) => {
    res.json(tasks);
});

app.post('/addTask', (req, res) => {
    const { task } = req.body;
    const taskId = tasks.length + 1;
    tasks.push({ taskId, task });
    res.json({ message: 'Task added successfully', task: { taskId, task } });
});

app.put('/updateTask/:taskId', (req, res) => {
    const { taskId } = req.params;
    const { updatedTask } = req.body;
    const taskToUpdate = tasks.find(task => task.taskId === parseInt(taskId));

    if (taskToUpdate) {
        taskToUpdate.task = updatedTask;
        res.json({ message: 'Task updated successfully', updatedTask: taskToUpdate });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/deleteTask/:taskId', (req, res) => {
    const { taskId } = req.params;
    const indexToDelete = tasks.findIndex(task => task.taskId === parseInt(taskId));

    if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
