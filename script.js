const addButton = document.getElementById('add-btn');  // Rename variable to avoid conflict
const taskInput = document.getElementById('task-input');
const tolist = document.getElementById('list');

function addTask() {
    const taskText = taskInput.value.trim();  // Get value from input
    if (taskText !== "") {  // Only add task if input is not empty
        const task = {
            id: new Date().getTime(),  // Generate unique ID using timestamp
            text: taskText,
            completed: false
        };

        const tasks = getTasksFromStorage();  // Fetch existing tasks
        tasks.push(task);  // Add new task to the array

        saveTasksToStorage(tasks);  // Save updated tasks to localStorage
        renderTasks();  // Re-render tasks
        taskInput.value = "";  // Clear input field
    }
}

function renderTasks() {
    tolist.innerHTML = '';  // Clear list
    const tasks = getTasksFromStorage();  // Fetch tasks from localStorage

    tasks.forEach(task => {
        const li = document.createElement('li');  // Create list item
        li.classList.toggle('completed', task.completed);  // Mark as completed if needed
        li.innerHTML = `${task.text} <button class="delete" onclick="deleteTask(${task.id})">Delete</button>`;
        li.addEventListener('click', () => toggleComplete(task.id));  // Toggle task completion
        tolist.appendChild(li);  // Append to list
    });
}

function deleteTask(taskId) {
    const tasks = getTasksFromStorage();  // Get tasks from localStorage
    const updatedTasks = tasks.filter(task => task.id !== taskId);  // Remove task with matching ID
    saveTasksToStorage(updatedTasks);  // Save updated tasks
    renderTasks();  // Re-render tasks
}

function toggleComplete(taskId) {
    const tasks = getTasksFromStorage();  // Get tasks from localStorage
    const task = tasks.find(t => t.id === taskId);  // Find task by ID
    task.completed = !task.completed;  // Toggle completed status
    saveTasksToStorage(tasks);  // Save updated tasks
    renderTasks();  // Re-render tasks
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Save tasks as JSON string
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');  // Get tasks from localStorage
    return tasks ? JSON.parse(tasks) : [];  // Parse JSON string or return empty array
}

addButton.addEventListener('click', addTask);  // Attach event listener to button
document.addEventListener('DOMContentLoaded', renderTasks);  // Render tasks when page loads
