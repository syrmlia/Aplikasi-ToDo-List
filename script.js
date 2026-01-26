// Load data dari LocalStorage
let tasks = JSON.parse(localStorage.getItem('blueTodoTasks')) || [];

const listElement = document.getElementById('taskList');
const inputElement = document.getElementById('taskInput');
const priorityElement = document.getElementById('priorityInput');
const addBtn = document.getElementById('addBtn');

// Simpan data
function saveTasks() {
    localStorage.setItem('blueTodoTasks', JSON.stringify(tasks));
}

// Render data ke tabel
function renderTasks(filter = 'all') {
    listElement.innerHTML = '';
    
    const filtered = tasks.filter(t => {
        if (filter === 'done') return t.status === 'done';
        if (filter === 'undone') return t.status === 'undone';
        return true;
    });

    if (filtered.length === 0) {
        listElement.innerHTML = `<tr><td colspan="2" style="text-align:center; color:#94a3b8; padding: 20px;">Belum ada tugas...</td></tr>`;
    }

    filtered.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="task-name ${task.status === 'done' ? 'done-task' : ''}">${task.name}</span>
                <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
            </td>
            <td>
                <div class="action-group">
                    <button class="btn-circle btn-check" onclick="toggleStatus(${task.id})" title="Tandai Selesai">✓</button>
                    <button class="btn-circle btn-del" onclick="deleteTask(${task.id})" title="Hapus Tugas">✕</button>
                </div>
            </td>
        `;
        listElement.appendChild(row);
    });
}

// Fungsi Tambah
function addTask() {
    const name = inputElement.value.trim();
    const priority = priorityElement.value;

    if (!name) return alert("Isi nama tugasnya dulu!");

    tasks.push({
        id: Date.now(),
        name: name,
        priority: priority,
        status: 'undone'
    });

    inputElement.value = '';
    saveTasks();
    renderTasks();
}

// Fungsi Ubah Status
function toggleStatus(id) {
    tasks = tasks.map(t => t.id === id ? {...t, status: t.status === 'done' ? 'undone' : 'done'} : t);
    saveTasks();
    renderTasks();
}

// Fungsi Hapus (Sudah Aktif)
function deleteTask(id) {
    if(confirm("Hapus tugas ini secara permanen?")) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Fungsi Filter
function filterTasks(type, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderTasks(type);
}

// Event Listeners
addBtn.addEventListener('click', addTask);
inputElement.addEventListener('keypress', (e) => { if(e.key === 'Enter') addTask(); });

// Inisialisasi awal
renderTasks();