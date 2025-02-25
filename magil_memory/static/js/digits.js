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

    for(let i = 0; i < amount; i++)
    {
        let random_number = Math.floor((Math.random() * 10))
        genDigitsList.push(random_number)
    }
}

function clearList() {
    genDigitsList = []
}

function startMemo() {
    
    generateDigits(digitsAmount.value)

    console.log(digitsAmount.value)

    console.log(genDigitsList)

    // Validation handling
    // TODO: add more checks

    // TODO: set timers
}