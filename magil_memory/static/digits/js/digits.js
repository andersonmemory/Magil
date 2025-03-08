let genDigitsList = []

// Conditionals
let memoScreenVisible = false
let recallScreenVisible = false


// Input boxes -- Main screen
let digitsAmount = document.querySelector("#digits_amount")

let memoMinutes = document.querySelector("#memo_minutes")
let memoSeconds = document.querySelector("#memo_seconds")

let recallMinutes = document.querySelector("#recall_minutes")
let recallSeconds = document.querySelector("#recall_seconds")


// Screens
let initialScreen = document.getElementById("initial_screen")
let memoScreen = document.getElementById("memo_screen")
let recallScreen = document.getElementById("recall_screen")
let discordSubmitScreen = document.getElementById("discord_submit_screen")

// memoScreen   - elements
let memoTotalTime
let memoTime = document.getElementById("memo_time")
let numberSequence = document.getElementById("number_sequence")

// recallScreen - elements
let recallTotalTime
let recallTime = document.getElementById("recall_time")
let recallBox = document.getElementById("recall_box")

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

// Counter for the memoScreen
let memoElapsedTime = 0

console.log(memoTotalTime)

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

    console.log(memoElapsedTime)

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

// TODO: add more info
let recallStart

function finishMemo() {
    memoScreenVisible = !memoScreenVisible
    recallScreenVisible = !recallScreenVisible
    memoScreen.classList.toggle("hide")
    recallScreen.classList.toggle("hide")

    clearInterval(memoStart)

    recallStart = setInterval(recallCounter, 1000)
}

// TODO: add more info
function finishRecall() {
    memoScreenVisible = !memoScreenVisible
    recallScreen.classList.toggle("hide")
    discordSubmitScreen.classList.toggle("hide")

    clearInterval(recallStart)

    // Preparing to send to Discord

    let memoDjangoElapsed = document.getElementById("memoElapsedTime")
    let recallDjangoElapsed = document.getElementById("recallElapsedTime")
    let digitsDjangoAmount = document.getElementById("digitsAmount")

    // Text formattings

    console.log(memoElapsedTime)
    console.log(memoElapsedTime / 60)

    let memoMin = Math.floor(memoElapsedTime / 60)

    console.log(memoMin)

    let memoSec = memoElapsedTime % 60

    let recallMin = Math.floor(recallElapsedTime / 60)
    let recallSec = recallElapsedTime % 60

    if (memoSec >= 10) {
        memoDjangoElapsed.value = `${memoMin}m${memoSec}s`
    } else {
        memoDjangoElapsed.value = `${memoMin}:0${memoSec}`
    }

    if (recallSec >= 10) {
        recallDjangoElapsed.value = `${recallMin}m${recallSec}s`        
    } else {
        recallDjangoElapsed.value = `${recallMin}m0${recallSec}s`
    }

    digitsDjangoAmount.value = digitsAmount.value

}

let memoStart

function main() {
    
    generateDigits(digitsAmount.value)

    // TODO: add more checks
    checkValidationTimer()

    // Initialization

    initialScreen.classList.toggle("hide")
    memoScreen.classList.toggle("hide")
    memoScreenVisible = true

    memoTotalTime = parseInt(memoMinutes.value) * 60 + parseInt(memoSeconds.value)
    recallTotalTime = parseInt(recallMinutes.value) * 60 + parseInt(recallSeconds.value)
    
    memoStart = setInterval(memoCounter, 1000)

}