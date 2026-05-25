import '../style.css'
import { getTask, createTask, deleteTask, updateTask } from './api'

const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const listTask = document.getElementById("listTask")

const allBtn = document.getElementById("all")
const doneBtn = document.getElementById("done")
const undoneBtn = document.getElementById("undone")


// estado de filtros
let state = {
    filter: "all"
}



function renderTasks(tasks) {

    listTask.innerHTML = ""

    // filtros
    let filteredTasks = tasks

    if(state.filter === "completed"){

        filteredTasks = tasks.filter(task => task.completed)
        doneBtn.classList.toggle()

    }

    if(state.filter === "pending"){

        filteredTasks = tasks.filter(task => !task.completed)

    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li")

        li.className = "w-full border rounded-sm py-1 flex px-2 text-center justify-between items-center"

        li.innerHTML = `
            ${task.completed ? '<i id="statusTrue" class="fa-solid fa-circle-check""></i>' : '<i id="statusFalse" class="fa-regular fa-circle-check""></i>'} ${task.title}
            <i id="deleteBtn" class="fa-solid fa-trash"></i>
        `

        const deleteBtn = li.querySelector("#deleteBtn")



        // completar tarea
        li.addEventListener("click", async () => {

            await updateTask(task.id, {

                completed: !task.completed

            })

            const tasks = await getTask()

            renderTasks(tasks)

        })



        // eliminar tarea
        deleteBtn.addEventListener("click", async (e) => {

            e.stopPropagation()

            await deleteTask(task.id)

            const tasks = await getTask()

            renderTasks(tasks)

        })



        listTask.appendChild(li)

    })

}



async function init() {

    const tasks = await getTask()

    renderTasks(tasks)

}

init()



// filtro ALL
allBtn.addEventListener("click", async () => {

    state.filter = "all"

    init()

})



// filtro DONE
doneBtn.addEventListener("click", async () => {

    state.filter = "completed"

    init()

})



// filtro UNDONE
undoneBtn.addEventListener("click", async () => {

    state.filter = "pending"

    init()

})



addBtn.addEventListener("click", async () => {

    if (taskInput.value.trim() === "") {

        alert("You didn't register some task")

    } 
    
    else {

        const newTask = {

            title: taskInput.value,
            completed: false

        }

        await createTask(newTask)

        const tasks = await getTask()

        renderTasks(tasks)

        taskInput.value = ""

    }

})