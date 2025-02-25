let genDigitsList = []


let digitsAmount = document.querySelector("#digits_amount")

let memoMinutes = document.querySelector("#memo_minutes")
let memoSeconds = document.querySelector("#memo_seconds")

let recallMinutes = document.querySelector("#memo_minutes")
let recallSeconds = document.querySelector("#memo_seconds")

let initialScreenElements = [memoMinutes, memoSeconds, recallMinutes, recallSeconds]

function generateDigits(amount) {

    clearList()

    // TODO validation checking for more cases instead of just 0
    if (parseInt(amount) == 0) {
        alert("Please provide a valid range")
    }

    amount = parseInt(amount)

    for(let i = 0; i < amount; i++) {
        let random_number = Math.floor((Math.random() * 10))
        genDigitsList.push(random_number)
    }
}

function clearList() {
    genDigitsList = []
}

function checkValidationTimer() {
    // TODO: add more checks
    if (parseInt(memoMinutes.value) == 0 || parseInt(memoSeconds.value) == 0) {
        alert("Please, provide a valid number")
        return
    }
    if (parseInt(recallMinutes.value) == 0 || parseInt(recallSeconds.value) == 0) {
        alert("Please, provide a valid number")
         return
    }
}

function toggleVisibility(arrOfScreenElements) {
    arrOfScreenElements.forEach((element) => {
        element.classList.toggle("hide")
    })
}

function startMemo() {
    
    generateDigits(digitsAmount.value)

    // Validation handling
    // TODO: add more checks
    checkValidationTimer()

    console.log(memoMinutes.value)
    console.log(memoSeconds.value)
    console.log(recallMinutes.value)
    console.log(recallSeconds.value)

    // TODO: set initial screen invisible

    toggleVisibility(initialScreenElements)

    // TODO: change to the memo screen

    // TODO: change to the recall screen when finished
    
    // TODO: set timers
}