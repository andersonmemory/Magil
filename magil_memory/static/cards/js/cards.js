const deckOfCards = [
    clubsA, clubs2, clubs3, clubs4, clubs5, clubs6, clubs7, clubs8, clubs9, clubs10, clubsJ, clubsQ, clubsK,
    spadesA, spades2, spades3, spades4, spades5, spades6, spades7, spades8, spades9, spades10, spadesJ, spadesQ, spadesK,
    heartsA, hearts2, hearts3, hearts4, hearts5, hearts6, hearts7, hearts8, hearts9, hearts10, heartsJ, heartsQ, heartsK,
    diamondsA, diamonds2, diamonds3, diamonds4, diamonds5, diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, diamondsJ, diamondsQ, diamondsK,
]

let genCardsList = []
let currentCards = []

// Input boxes -- Main screen
let cardsAmount = document.querySelector("#cards_amount")

function memoCounter() {

    if (memoTotalTime <= 0) {
        finishMemo()
        console.log("Finished Memo")
        return "finishedMemo"
    }

    let sec = memoTotalTime % 60
    let min = Math.floor(memoTotalTime / 60)

    memoTotalTime-- 
    memoElapsedTime++

    // console.log(memoElapsedTime)
    if (sec >= 10) {
        memoTime.innerHTML = `${min}:${sec}`
    } else {
        memoTime.innerHTML = `${min}:0${sec}`
    }

}

// Counter for the recallScreen
let recallElapsedTime = 0

function recallCounter() {
    if (recallTotalTime <= 0) {
        finishRecall()
        console.log("Finished Recall")
        return "finishedRecall"
    }

    let sec = (recallTotalTime) % 60
    let min = Math.floor(recallTotalTime / 60)

    recallTotalTime--
    recallElapsedTime++

    if (sec >= 10) {
        recallTime.innerHTML = `${min}:${sec}`
    } else {
        recallTime.innerHTML = `${min}:0${sec}`
    }
}

// // TODO: add more info
let recallStart

function finishMemo() {
    memoScreenVisible = !memoScreenVisible
    recallScreenVisible = !recallScreenVisible
    memoScreen.classList.toggle("hide")
    recallScreen.classList.toggle("hide")

    clearInterval(memoStart)

    recallStart = setInterval(recallCounter, 1000)
}

// // TODO: add more info
function finishRecall() {
    memoScreenVisible = !memoScreenVisible
    recallScreen.classList.toggle("hide")
    discordSubmitScreen.classList.toggle("hide")

    clearInterval(recallStart)

    // Check errors

    let userInput = recallBox.value

    let failure = 0
    let score = 0

    for (let i = 0; i < cardsAmount.value; i++) {
        if (userInput[i] == genCardsList[i]) {
            score++
        } else {
            failure++
        }
    }

    // Preparing to send to Discord
    let memoDjangoElapsed = document.getElementById("memoElapsedTime")
    let recallDjangoElapsed = document.getElementById("recallElapsedTime")
    let cardsDjangoAmount = document.getElementById("cardsAmount")
    let scoreDjango = document.getElementById("userScore")
    let failureDjango = document.getElementById("userFailure")

    scoreDjango.value = score
    failureDjango.value = failure

    // Text formattings
    cardsDjangoAmount.value = cardsAmount.value

    let memoMin = Math.floor(memoElapsedTime / 60)
    let memoSec = memoElapsedTime % 60

    let recallMin = Math.floor(recallElapsedTime / 60)
    let recallSec = recallElapsedTime % 60

    if (memoSec >= 10) {
        memoDjangoElapsed.value = `${memoMin}m${memoSec}s`
    } else {
        memoDjangoElapsed.value = `${memoMin}m0${memoSec}s`
    }

    if (recallSec >= 10) {
        recallDjangoElapsed.value = `${recallMin}m${recallSec}s`        
    } else {
        recallDjangoElapsed.value = `${recallMin}m0${recallSec}s`
    }
}

let memoStart

function main() {

    generateCards(cardsAmount.value)
    checkValidationTimer()

    // Initialization

    initialScreen.classList.toggle("hide")
    memoScreen.classList.toggle("hide")
    memoScreenVisible = true

    memoTotalTime = parseInt(memoMinutes.value) * 60 + parseInt(memoSeconds.value)
    recallTotalTime = parseInt(recallMinutes.value) * 60 + parseInt(recallSeconds.value)
    
    memoStart = setInterval(memoCounter, 1000)

}