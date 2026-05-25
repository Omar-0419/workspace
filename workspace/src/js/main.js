import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import '../style.css'
import { getTask, createTask, deleteTask, updateTask } from './api'


const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const listTask = document.getElementById("listTask")



function renderTasks(tasks) {

    listTask.innerHTML = ""

    tasks.forEach(task => {

        const li = document.createElement("li")

        li.className = "w-full border rounded-sm py-1 flex px-2 text-center justify-between items-center"

        li.innerHTML = `
            ${task.completed ? '<i id="statusTrue" class="fa-solid fa-circle-check""></i>' : '<i id="statusFalse" class="fa-regular fa-circle-check""></i>'} ${task.title}
            <i id="deleteBtn" class="fa-solid fa-trash"></i>
        `

        const deleteBtn = li.querySelector("#deleteBtn")

        li.addEventListener("click", async () => {
          await updateTask(task.id, {
            completed: !task.completed // reverse the value
          })

          const tasks = await getTask()

          renderTasks(tasks)

        })

        

        deleteBtn.addEventListener("click", async () => {

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



addBtn.addEventListener("click", async () => {

    if (taskInput.value.trim() === "") {

        alert("You didn't register some task")

    } else {

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