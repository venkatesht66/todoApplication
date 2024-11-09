let pendingTodos = [];
let completedTodos = [];

// Add todo on Enter key press
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add todo
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    if (todoText) {
        const pendingList = document.getElementById('pendingList');
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `${todoText} <button class="complete-btn" onclick="completeTodo(this)">✓</button> <button onclick="removeTodo(this)">✗</button>`;
        pendingList.appendChild(todoItem);
        pendingTodos.push(todoText);
        updateCounts();
        todoInput.value = '';
    }
}

// Function to complete todo
function completeTodo(button) {
    const completedList = document.getElementById('completedList');
    const todoItem = button.parentElement;
    const todoText = todoItem.firstChild.textContent.trim();
    todoItem.querySelector('button.complete-btn').remove();
    completedList.appendChild(todoItem);
    moveTodoFromPendingToCompleted(todoText);
    updateCounts();
}

// Function to remove todo
function removeTodo(button) {
    const todoItem = button.parentElement;
    const todoText = todoItem.firstChild.textContent.trim();
    todoItem.remove();
    removeFromTodos(todoText);
    updateCounts();
}

// Function to update pending and completed counts
function updateCounts() {
    document.getElementById('pendingCount').textContent = pendingTodos.length;
    document.getElementById('completedCount').textContent = completedTodos.length;
}

// Helper function to move todo from pending to completed
function moveTodoFromPendingToCompleted(todoText) {
    const index = pendingTodos.indexOf(todoText);
    if (index !== -1) {
        completedTodos.push(pendingTodos[index]);
        pendingTodos.splice(index, 1);
    }
}

// Helper function to remove todo from either pending or completed todos
function removeFromTodos(todoText) {
    let index = pendingTodos.indexOf(todoText);
    if (index !== -1) {
        pendingTodos.splice(index, 1);
    } else {
        index = completedTodos.indexOf(todoText);
        if (index !== -1) {
            completedTodos.splice(index, 1);
        }
    }
}