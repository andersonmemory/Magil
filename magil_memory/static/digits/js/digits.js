let genDigitsList = []

// Input boxes -- Main screen
let digitsAmount = document.querySelector("#digits_amount")

function generateDigits(amount) {

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

    for(let i = 0; i < amount; i++) {
        let random_number = Math.floor((Math.random() * 10))
        numberSequence.innerHTML += random_number
        genDigitsList.push(random_number)
    }
}

function clearList() {
    genDigitsList = []
}

// Counter for the memoScreen
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

    // Check errors

    let userInput = recallBox.value

    let failure = 0
    let score = 0

    for (let i = 0; i < digitsAmount.value; i++) {
        if (userInput[i] == genDigitsList[i]) {
            score++
        } else {
            failure++
        }
    }

    

    // Preparing to send to Discord

    let memoDjangoElapsed = document.getElementById("memoElapsedTime")
    let recallDjangoElapsed = document.getElementById("recallElapsedTime")
    let digitsDjangoAmount = document.getElementById("digitsAmount")
    let scoreDjango = document.getElementById("userScore")
    let failureDjango = document.getElementById("userFailure")

    scoreDjango.value = score
    failureDjango.value = failure

    // Text formattings
    digitsDjangoAmount.value = digitsAmount.value

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