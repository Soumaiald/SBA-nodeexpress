document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    const taskList = document.getElementById('taskList');

    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = event.target.task.value;

        fetch('/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            addTaskToList(data.task);
            addTaskForm.reset();
        });
    });

    
    fetch('/getTasks')
        .then(response => response.json())
        .then(tasks => tasks.forEach(task => addTaskToList(task)));

    
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = `Task ${task.taskId}: ${task.task}`;
        taskList.appendChild(li);
    }
});
