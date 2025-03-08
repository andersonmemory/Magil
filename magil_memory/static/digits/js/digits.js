let genDigitsList = []

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
let discordSubmitScreen = document.getAnimations("discord_submit_screen")

// memoScreen   - elements

let memoTime = document.getElementById("memo_time")
let numberSequence = document.getElementById("number_sequence")

// recallScreen - elements

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

let memoTotalTime = parseInt(memoMinutes) * 60 + parseInt(memoSeconds)

function memoCounter(minutes, seconds) {

    if (memoTotalTime <= 0) {
        finishMemo()
        console.log("Finished Memo")
        return "finishedMemo"
    }

    sec = memoTotalTime % 60
    min = Math.floor(memoTotalTime / 60)

    memoTotalTime-- 

    memoTime = String(memoMinutes) + ":" + String(memoSeconds)
    
}

// Counter for the recallScreen

let recallTotalTime = parseInt(recallMinutes) * 60 + parseInt(recallSeconds)

function recallCounter(minutes, seconds) {
    if (recallTotalTime <= 0) {
        finishRecall()
        console.log("Finished Recall")
        return "finishedRecall"
    }

    sec = recallTotalTime % 60
    min = Math.floor(recallTotalTime / 60)

    recallTotalTime--

    memoTime = String(memoMinutes) + ":" + String(memoSeconds)
    memoTime
}

// TODO: add more info
function finishMemo() {
    memoScreen.classList.toggle("hide")
    recallScreen.classList.toggle("hide")
}


// TODO: add more info
function finishRecall() {
    recallScreen.classList.toggle("hide")
    discordSubmitScreen.classList.toggle("hide")
}

function startMemo() {
    
    generateDigits(digitsAmount.value)

    // TODO: add more checks
    checkValidationTimer()

    initialScreen.classList.toggle("hide")
    memoScreen.classList.toggle("hide")

    if (!memoTotalTime <= 0 && memoScreen.is(":visible")) {
        setInterval(memoCounter, 1000)
    } else if (memoTotalTime <= 0 && memoScreen.is(":visible")) {
        finishMemo()
    }

    if (!recallTotalTime <= 0 && recallScreen.is(":visible")) {
        setInterval(recallCounter, 1000)
    } else if (recallTotalTime <= 0 && recallScreen.is(":visible")) {
        finishRecall()
    }


    
}