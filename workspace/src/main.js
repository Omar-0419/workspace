import './style.css'

async function getData() {
  const respense = await fetch("http://localhost:3000/tasks")
  const data = await respense.json()
}


