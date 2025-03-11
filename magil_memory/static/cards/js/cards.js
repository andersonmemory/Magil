const deckOfCards = [
    clubsA, clubs2, clubs3, clubs4, clubs5, clubs6, clubs7, clubs8, clubs9, clubs10, clubsJ, clubsQ, clubsK,
    spadesA, spades2, spades3, spades4, spades5, spades6, spades7, spades8, spades9, spades10, spadesJ, spadesQ, spadesK,
    heartsA, hearts2, hearts3, hearts4, hearts5, hearts6, hearts7, hearts8, hearts9, hearts10, heartsJ, heartsQ, heartsK,
    diamondsA, diamonds2, diamonds3, diamonds4, diamonds5, diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, diamondsJ, diamondsQ, diamondsK,
]

let genCardsList = []

// // Conditionals
// let memoScreenVisible = false
// let recallScreenVisible = false


// Input boxes -- Main screen
let cardsAmount = document.querySelector("#cards_amount")

let memoMinutes = document.querySelector("#memo_minutes")
let memoSeconds = document.querySelector("#memo_seconds")

let recallMinutes = document.querySelector("#recall_minutes")
let recallSeconds = document.querySelector("#recall_seconds")


// // Screens
// let initialScreen = document.getElementById("initial_screen")
// let memoScreen = document.getElementById("memo_screen")
// let recallScreen = document.getElementById("recall_screen")
// let discordSubmitScreen = document.getElementById("discord_submit_screen")

// // memoScreen   - elements
// let memoTotalTime
// let memoTime = document.getElementById("memo_time")
// let numberSequence = document.getElementById("number_sequence")

// // recallScreen - elements
// let recallTotalTime
// let recallTime = document.getElementById("recall_time")
// let recallBox = document.getElementById("recall_box")

function generateCards(amount) {

    clearList()

    // TODO validation checking for more cases instead of just 0
    if (parseInt(amount) == 0) {
        alert("Please provide a valid range")
    } elseif (parseInt(amount) > 9999) {
        alert("Only values between 1 and 9999 are allowed")
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
}

function clearList() {
    genCardsList = []
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

// // Counter for the memoScreen
// let memoElapsedTime = 0

// function memoCounter() {

//     if (memoTotalTime <= 0) {
//         finishMemo()
//         console.log("Finished Memo")
//         return "finishedMemo"
//     }

//     let sec = memoTotalTime % 60
//     let min = Math.floor(memoTotalTime / 60)

//     memoTotalTime-- 
//     memoElapsedTime++

//     // console.log(memoElapsedTime)

//     if (sec >= 10) {
//         memoTime.innerHTML = `${min}:${sec}`
//     } else {
//         memoTime.innerHTML = `${min}:0${sec}`
//     }

// }

// // Counter for the recallScreen
// let recallElapsedTime = 0

// function recallCounter() {
//     if (recallTotalTime <= 0) {
//         finishRecall()
//         console.log("Finished Recall")
//         return "finishedRecall"
//     }

//     let sec = (recallTotalTime) % 60
//     let min = Math.floor(recallTotalTime / 60)

//     recallTotalTime--
//     recallElapsedTime++

//     if (sec >= 10) {
//         recallTime.innerHTML = `${min}:${sec}`
//     } else {
//         recallTime.innerHTML = `${min}:0${sec}`
//     }
// }

// // TODO: add more info
// let recallStart

// function finishMemo() {
//     memoScreenVisible = !memoScreenVisible
//     recallScreenVisible = !recallScreenVisible
//     memoScreen.classList.toggle("hide")
//     recallScreen.classList.toggle("hide")

//     clearInterval(memoStart)

//     recallStart = setInterval(recallCounter, 1000)
// }

// // TODO: add more info
// function finishRecall() {
//     memoScreenVisible = !memoScreenVisible
//     recallScreen.classList.toggle("hide")
//     discordSubmitScreen.classList.toggle("hide")

//     clearInterval(recallStart)

//     // Check errors

//     let userInput = recallBox.value

//     let failure = 0
//     let score = 0

//     for (let i = 0; i < cardsAmount.value; i++) {
//         if (userInput[i] == genCardsList[i]) {
//             score++
//         } else {
//             failure++
//         }
//     }

//     // Preparing to send to Discord

//     let memoDjangoElapsed = document.getElementById("memoElapsedTime")
//     let recallDjangoElapsed = document.getElementById("recallElapsedTime")
//     let cardsDjangoAmount = document.getElementById("cardsAmount")
//     let scoreDjango = document.getElementById("userScore")
//     let failureDjango = document.getElementById("userFailure")

//     scoreDjango.value = score
//     failureDjango.value = failure

//     // Text formattings
//     cardsDjangoAmount.value = cardsAmount.value

//     let memoMin = Math.floor(memoElapsedTime / 60)
//     let memoSec = memoElapsedTime % 60

//     let recallMin = Math.floor(recallElapsedTime / 60)
//     let recallSec = recallElapsedTime % 60

//     if (memoSec >= 10) {
//         memoDjangoElapsed.value = `${memoMin}m${memoSec}s`
//     } else {
//         memoDjangoElapsed.value = `${memoMin}m0${memoSec}s`
//     }

//     if (recallSec >= 10) {
//         recallDjangoElapsed.value = `${recallMin}m${recallSec}s`        
//     } else {
//         recallDjangoElapsed.value = `${recallMin}m0${recallSec}s`
//     }
// }

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// let memoStart

function main() {
    
    // Temporary test

    //let cardList = [ clubsA ]

    // TODO: write generateCards


    TODO: add more checks
    checkValidationTimer()

    // Initialization

    // initialScreen.classList.toggle("hide")
    // memoScreen.classList.toggle("hide")
    // memoScreenVisible = true

    // memoTotalTime = parseInt(memoMinutes.value) * 60 + parseInt(memoSeconds.value)
    // recallTotalTime = parseInt(recallMinutes.value) * 60 + parseInt(recallSeconds.value)
    
    // memoStart = setInterval(memoCounter, 1000)

}

// Places to place the cards - Temporary

// let tiny_list = [ clubsA, diamonds2, hearts4, spades6 ]

// shuffleArray(tiny_list)

// let place = document.getElementById("place")

// console.log(genCardsList)

// place.innerHTML = genCardsList

// console.log("hello, world")
