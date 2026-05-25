const URL = "http://localhost:3000/tasks"

export async function getTask() {
    const response = await fetch(URL)
    const data = await response.json()
    return data
}

export async function createTask(task) {
    
    await fetch(URL, {
        method: "POST", //say to server "I'm going to create something"
        headers: {
            "Content-Type": "application/json" //say to server "I'm sending JSON"
        },

        body: JSON.stringify(task) //transform the object JS to JSON
    })
}

export async function deleteTask(id) {
    await fetch(`${URL}/${id}`,{
        method: "DELETE" 
    })    
}

export async function updateTask(id, completed) {
    
    await fetch (`${URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(completed)
    })
}