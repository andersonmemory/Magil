
// Used both in cards.js and digits.js
let memoMinutes = document.querySelector("#memo_minutes")
let memoSeconds = document.querySelector("#memo_seconds")

let recallMinutes = document.querySelector("#recall_minutes")
let recallSeconds = document.querySelector("#recall_seconds")

// Counters and time logic
let memoTotalTime = 0
let memoElapsedTime = 0

let recallTotalTime = 0
let recallElapsedTime = 0

// // Conditionals
let memoScreenVisible = false
let recallScreenVisible = false

// // Screens
let initialScreen = document.getElementById("initial_screen")
let memoScreen = document.getElementById("memo_screen")
let recallScreen = document.getElementById("recall_screen")
let discordSubmitScreen = document.getElementById("discord_submit_screen")

// Used both in cards.js and digits.js
function checkValidationTimer() {

    // TODO: add more checks
    if (parseInt(memoMinutes.value) == 0 || parseInt(memoSeconds.value) == 0) {
        alert("Please, provide a valid number")
        return
    } else if (parseInt(memoMinutes.value) > 1440 || parseInt(memoSeconds.value) > 60) {
        alert("Minutes cannot be more than 24 hours, and seconds cannot be more than 60")
        return
    }
    if (parseInt(recallMinutes.value) == 0 || parseInt(recallSeconds.value) == 0) {
        alert("Please, provide a valid number")
         return
    } else if (parseInt(recallMinutes.value) > 1440 || parseInt(recallSeconds.value) > 60) {
        alert("Minutes cannot be more than 24 hours, and seconds cannot be more than 60")
        return
    }
}

// Used in cards.js
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Used in cards.js
function generateCards(amount) {

    clearList()

    // TODO validation checking for more cases instead of just 0
    if (parseInt(amount) == 0) {
        alert("Please provide a valid range")
        return
    } else if (parseInt(amount) > 9999) {
        alert("Only values between 1 and 9999 are allowed")
        return
    } else if (parseInt(amount) < 0) {
        alert("Please provide a valid range")
    }

    amount = parseInt(amount)

    let randomizedDeck = deckOfCards

    shuffleArray(randomizedDeck)

    let newList = []

    for (let i = 0, j = 0; i < amount; i++) {

        if (j > 51) {
            j = 0
            shuffleArray(randomizedDeck)
        }

        newList.push(randomizedDeck[j])

        j++
    }

    genCardsList = newList

    return true
}

function clearList() {
    genCardsList = []
}

// Time related logic
// TODO: modularize the time logic to work across all memory disciplines