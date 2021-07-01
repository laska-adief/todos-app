const form = document.getElementById('form')
const input = document.getElementById('input')
const todosList = document.querySelector('.todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach((todo) => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(input.value != '')
    addTodo()
})


function addTodo(todo){
    let todoText = input.value

    if(todo){
        todoText = todo.text
    }

    if(todoText){
        
        const todoEL = document.createElement('li')
    
        if(todo && todo.completed){
            todoEL.classList.add('completed')
        }

    todoEL.innerText = todoText
    todosList.appendChild(todoEL)

    input.value = ''

    // complete todo
    todoEL.addEventListener('click', () => {
        todoEL.classList.toggle('completed')

        updateLS()
    })

    // delete todo
    todoEL.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        todoEL.remove()

        updateLS()
    })

    updateLS()
}
}

function updateLS(){
    const todosEL = document.querySelectorAll('li')
    const todos = []

    todosEL.forEach((todo) => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}