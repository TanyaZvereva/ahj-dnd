const firstColumn = ["Lorem ipsum dolor sit amet consectetur adipisicing elit."]
const secondColumn = []
const thirdColumn = []

function AddCard(event, array) {
    const textarea = event.target.parentElement.querySelector('textarea')
    const cardName = textarea.value
    array.push(cardName)
    console.log(array)
}
const firstSection = document.querySelector('#first-column button')
firstSection.addEventListener('click', (e) => AddCard(e, firstColumn))

const secondtSection = document.querySelector('#second-column button')
secondtSection.addEventListener('click', (e) => AddCard(e, secondColumn))

const thirdSection = document.querySelector('#third-column button')
thirdSection.addEventListener('click', (e) => AddCard(e, thirdColumn))