import '../style.css'
import { getTask, createTask, deleteTask, updateTask } from './api'

const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const listTask = document.getElementById("listTask")

const allBtn = document.getElementById("all")
const doneBtn = document.getElementById("done")
const undoneBtn = document.getElementById("undone")



// estado general
let state = {

    filter: "all"

}



// guardar borrador automáticamente
taskInput.addEventListener("input", (e) => {

    sessionStorage.setItem("draftTask", e.target.value)

})



// recuperar borrador
taskInput.value = sessionStorage.getItem("draftTask") || ""



// botones activos
function removeActiveButtons(){

    allBtn.classList.remove("activeFilter")

    doneBtn.classList.remove("activeFilter")

    undoneBtn.classList.remove("activeFilter")

}



function renderTasks(tasks) {

    listTask.innerHTML = ""



    // filtros
    let filteredTasks = tasks

    if(state.filter === "completed"){

        filteredTasks = tasks.filter(task => task.completed)

    }

    if(state.filter === "pending"){

        filteredTasks = tasks.filter(task => !task.completed)

    }



    filteredTasks.forEach(task => {

        const li = document.createElement("li")

        li.className = "w-full border rounded-sm py-1 flex px-2 text-center justify-between items-center"



        li.innerHTML = `
            ${task.completed 
                ? '<i id="statusTrue" class="fa-solid fa-circle-check"></i>' 
                : '<i id="statusFalse" class="fa-regular fa-circle-check"></i>'} 
                
            ${task.title}

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



// botón activo inicial
allBtn.classList.add("activeFilter")



// filtro ALL
allBtn.addEventListener("click", async () => {

    state.filter = "all"

    removeActiveButtons()

    allBtn.classList.add("activeFilter")

    init()

})



// filtro DONE
doneBtn.addEventListener("click", async () => {

    state.filter = "completed"

    removeActiveButtons()

    doneBtn.classList.add("activeFilter")

    init()

})



// filtro UNDONE
undoneBtn.addEventListener("click", async () => {

    state.filter = "pending"

    removeActiveButtons()

    undoneBtn.classList.add("activeFilter")

    init()

})



// agregar tarea
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



        // limpiar input
        taskInput.value = ""



        // borrar borrador guardado
        sessionStorage.removeItem("draftTask")

    }

})