import './css/style.css'
const firstColumn = ["Lorem ipsum dolor sit amet consectetur adipisicing elit."]
const secondColumn = []
const thirdColumn = []

function AddCard(event, array, taskListElement) {
    const textarea = event.target.parentElement.querySelector('textarea')
    const cardName = textarea.value
    cardName && array.push(cardName)
    console.log(array)
    renderColumn(taskListElement, array)
}

function renderColumn(column, array) {
    column.innerHTML = ''
    array.forEach(element => {
        const task =document.createElement('div')
        task.classList.add('task')
        const text =document.createElement('span')
        text.innerText = element
        const removeBtn = document.createElement('div')
        removeBtn.innerText = 'x'
        task.append(text, removeBtn)
        column.append(task)
    });
}

const firstSection = document.querySelector('#first-column button')
const firstTaskList = document.querySelector('#first-column .task-list')
firstSection.addEventListener('click', (e) => AddCard(e, firstColumn, firstTaskList))

const secondtSection = document.querySelector('#second-column button')
secondtSection.addEventListener('click', (e) => AddCard(e, secondColumn))

const thirdSection = document.querySelector('#third-column button')
thirdSection.addEventListener('click', (e) => AddCard(e, thirdColumn))

