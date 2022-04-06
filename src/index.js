import './css/style.css'
const firstColumn = window.localStorage.getItem('first-column') && JSON.parse(window.localStorage.getItem('first-column')) || []
const secondColumn = window.localStorage.getItem('second-column') && JSON.parse(window.localStorage.getItem('second-column')) || []
const thirdColumn = window.localStorage.getItem('third-column') && JSON.parse(window.localStorage.getItem('third-column')) || []
let draggableTask = null
let droppableTask = null

function AddCard(event, array, taskListElement) {
    const textarea = event.target.parentElement.querySelector('textarea')
    const cardName = textarea.value
    if(cardName) {
        array.push(cardName)
    }
    renderColumn(taskListElement, array)
}

function renderColumn(column, array) {
    column.innerHTML = ''
    column.addEventListener('dragover', (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        console.log(event)
        // event.target.style.cursor = 'grabbing'
    })
    window.localStorage.setItem(column.parentElement.id,JSON.stringify(array))
    array.forEach((element, index) => {
        const task =document.createElement('div')
        task.setAttribute('draggable', 'true')
        task.classList.add('task')
        task.addEventListener('dragstart',(event) => {
            event.dataTransfer.dropEffect = 'move'
            draggableTask=index
            event.target.style.cursor = 'grab'
        })
        task.addEventListener('dragover',(event) => {
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
            droppableTask=index
            event.target.style.cursor = 'grabbing'
        })
         task.addEventListener('dragend',(event) => {
            task.classList.remove('grabbing')
            let target=document.elementFromPoint(event.clientX,event.clientY)
            while(target && !target.id){
                target = target.parentElement
            }
            if(target.id === column.parentElement.id) {
                const temp = array[draggableTask]
                array[draggableTask] = array[droppableTask]
                array[droppableTask] = temp
                renderColumn(column, array)
            }else{
                const arrayMap = {'first-column': firstColumn, 'second-column': secondColumn, 'third-column': thirdColumn}
                const droppableArray = arrayMap[target.id]
                const temp = array[draggableTask]
                array.splice(draggableTask, 1)
                droppableArray.push(temp)
                renderColumn(column, array)
                renderColumn(target.querySelector('.task-list'),droppableArray)
            }
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

document.addEventListener('DOMContentLoaded', () => {
    renderColumn(firstTaskList, firstColumn)
    renderColumn(secondTaskList, secondColumn)
    renderColumn(thirdTaskList, thirdColumn)
})