import fs from 'fs';

const jsonFolder = './JSON';
const dataFilePath = `${jsonFolder}/data.json`;

// Check if the data.json file exists
if (!fs.existsSync(dataFilePath)) {
    // If not, create the file with an empty JSON object
    fs.writeFileSync(dataFilePath, '{"todos": []}', 'utf8');
    console.log('data.json file was created.');
}

// Read the existing data.json file
fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    // Parse the JSON content into a JavaScript object
    const jsonData = JSON.parse(data);

    // CRUD operations on the todos array
    const todos = jsonData.todos || [];

    // CREATE: Add a new task to the todos array
    const newTodo = {
        id: Date.now(),
        task: 'New Task',
        completed: false
    };
    todos.push(newTodo);

    // UPDATE: Update the task in the todos array
    const taskIdToUpdate = 123; // Replace with the actual ID you want to update
    const updatedTaskIndex = todos.findIndex(todo => todo.id === taskIdToUpdate);
    if (updatedTaskIndex !== -1) {
        todos[updatedTaskIndex].task = 'Updated Task';
    }

    // READ: Display the current todos array
    console.log('Current todos:', todos);

    // DELETE: Remove a task from the todos array
    const taskIdToDelete = 456; // Replace with the actual ID you want to delete
    const updatedTodos = todos.filter(todo => todo.id !== taskIdToDelete);

    // Update the jsonData object with the modified todos array
    jsonData.todos = updatedTodos;

    // Write the updated jsonData back to the data.json file
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('CRUD operations completed successfully.');
    });
});
