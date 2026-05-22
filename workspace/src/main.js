import './style.css'

async function getData() {
  const respense = await fetch("http://localhost:3000/tasks")
  const data = await respense.json()

  return data
}

const tasks = await getData() 
const addBtn = document.getElementById("addBtn")
const listTask = document.getElementById("listTask")

const taskNew = document.createElement('li')

const title = tasks.map(task  => { // this variable 
  return task.title
})

taskNew.textContent = title
listTask.appendChild(taskNew)


addBtn.addEventListener("click", () => {
  const taskNew = document.createElement('li')

  const title = tasks.map(task  => { // this variable 
  return task.title
})


  taskNew.textContent = title
  listTask.appendChild(taskNew)
})

