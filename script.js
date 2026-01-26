let tasks = [
    { id: 1, name: 'Research structure folder', priority: 'High', status: 'done' },
    { id: 2, name: 'Setup environment variables', priority: 'Medium', status: 'undone' },
    { id: 3, name: 'Initialize Git Repository', priority: 'Low', status: 'undone' }
];

function renderTasks(filter = 'all') {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    const filtered = tasks.filter(t => {
        if (filter === 'done') return t.status === 'done';
        if (filter === 'undone') return t.status === 'undone';
        return true;
    });

    filtered.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="task-name ${task.status === 'done' ? 'done-task' : ''}">${task.name}</span>
                <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
            </td>
            <td>
                <div class="action-group">
                    <button class="btn-circle btn-check" onclick="toggleStatus(${task.id})">✓</button>
                    <button class="btn-circle btn-del" onclick="deleteTask(${task.id})">✕</button>
                </div>
            </td>
        `;
        list.appendChild(row);
    });
}

function toggleStatus(id) {
    tasks = tasks.map(t => t.id === id ? {...t, status: t.status === 'done' ? 'undone' : 'done'} : t);
    renderTasks(document.querySelector('.tab.active').innerText.toLowerCase().includes('completed') ? 'done' : 'all');
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function filterTasks(type, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderTasks(type);
}

renderTasks();