import '../style.css';
import { getTask, createTask, deleteTasks, updateTask } from './api'; 

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const listTask = document.getElementById('listTask');

let state = {
    filter: 'all', // 'all', 'completed', 'pending'
    search: '',
    darkMode: localStorage.getItem('darkMode') === 'true'
};

// para aplicar el modo oscuro 
if (state.darkMode) document.documentElement.classList.add('dark');

function renderTasks(tasks) {
    listTask.innerHTML = "";

    // omar aqui esta el filtro de buqueda Filtrado y búsqueda
    let filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())
    );
    
    if (state.filter === 'completed') filteredTasks = filteredTasks.filter(t => t.completed);
    if (state.filter === 'pending') filteredTasks = filteredTasks.filter(t => !t.completed);

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "w-full border rounded-sm py-1 flex px-2 justify-between items-center dark:border-gray-600";
        li.innerHTML = `
            <span class="${task.completed ? 'line-through text-gray-400' : 'dark:text-white'}">
                ${task.title}
            </span>
            <i class="${task.completed ? 'fa-solid fa-check-circle text-green-500' : 'fa-regular fa-circle text-gray-400'} cursor-pointer mr-2"></i>
            <i class="fa-solid fa-trash text-red-500 cursor-pointer"></i>
        `;

        // para actualizar 
        li.querySelector('.fa-circle, .fa-check-circle').addEventListener('click', async () => {
            await updateTask(task.id, { completed: !task.completed });
            init();
        });

        // para eliminar 
        li.querySelector('.fa-trash').addEventListener('click', async () => {
            await deleteTasks(task.id);
            init();
        });

        listTask.appendChild(li);
    });
}

// aqui implemente Persistencia en SessionStorage (Ejemplo: guardar borrador de input)
taskInput.addEventListener('input', (e) => {
    sessionStorage.setItem('draftTask', e.target.value);
});

// para recuperar lo borrado
taskInput.value = sessionStorage.getItem('draftTask') || '';

async function init() {
    const tasks = await getTask();
    renderTasks(tasks);
}

// Funciones para UI. no se como implementarlo desde el HTML
window.toggleDarkMode = () => {
    state.darkMode = !state.darkMode;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', state.darkMode);
};

window.setFilter = (filter) => {
    state.filter = filter;
    init();
};

window.setSearch = (value) => {
    state.search = value;
    init();
};

addBtn.addEventListener('click', async () => {
    if (taskInput.value.trim()) {
        await createTask({ title: taskInput.value, completed: false });
        taskInput.value = '';
        sessionStorage.removeItem('draftTask');
        init();
    }
});

init();