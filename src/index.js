import './css/style.css'
const firstColumn = ["Lorem ipsum dolor sit amet consectetur adipisicing elit."]
const secondColumn = []
const thirdColumn = []
let draggableTask = null
let droppableTask = null

function AddCard(event, array, taskListElement) {
    const textarea = event.target.parentElement.querySelector('textarea')
    const cardName = textarea.value
    cardName && array.push(cardName)
    console.log(array)
    renderColumn(taskListElement, array)
}

function renderColumn(column, array) {
    column.innerHTML = ''
    array.forEach((element, index) => {
        const task =document.createElement('div')
        task.setAttribute('draggable', 'true')
        task.classList.add('task')
        task.addEventListener('dragstart',(event) => {
            draggableTask=index
        })
        task.addEventListener('dragover',(event) => {
            droppableTask=index
        })
         task.addEventListener('dragend',(event) => {
            const temp = array[draggableTask]
            array[draggableTask] = array[droppableTask]
            array[droppableTask] = temp
            renderColumn(column, array)
        })
        
        const text =document.createElement('span')
        text.innerText = element
        const removeBtn = document.createElement('div')
        removeBtn.innerText = 'x'
        removeBtn.addEventListener('click', ()=> {
           array.splice(index, 1)
           renderColumn(column, array)
        })
        task.append(text, removeBtn)
        column.append(task)
    });
}

const firstSection = document.querySelector('#first-column button')
const firstTaskList = document.querySelector('#first-column .task-list')
firstSection.addEventListener('click', (e) => AddCard(e, firstColumn, firstTaskList))

const secondtSection = document.querySelector('#second-column button')
const secondTaskList = document.querySelector('#second-column .task-list')
secondtSection.addEventListener('click', (e) => AddCard(e, secondColumn, secondTaskList))

const thirdSection = document.querySelector('#third-column button')
const thirdTaskList = document.querySelector('#third-column .task-list')
thirdSection.addEventListener('click', (e) => AddCard(e, thirdColumn, thirdTaskList))

