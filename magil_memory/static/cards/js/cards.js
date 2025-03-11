// let genCardsList = []

// // Conditionals
// let memoScreenVisible = false
// let recallScreenVisible = false


// // Input boxes -- Main screen
// let cardsAmount = document.querySelector("#cards_amount")

// let memoMinutes = document.querySelector("#memo_minutes")
// let memoSeconds = document.querySelector("#memo_seconds")

// let recallMinutes = document.querySelector("#recall_minutes")
// let recallSeconds = document.querySelector("#recall_seconds")


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

// function generateCards(amount) {

//     clearList()

//     // TODO validation checking for more cases instead of just 0
//     if (parseInt(amount) == 0) {
//         alert("Please provide a valid range")
//     }

//     amount = parseInt(amount)
    
//     // TODO generate a list with randomized itens added

//     // for(let i = 0; i < amount; i++) {
//     //     let random_number = Math.floor((Math.random() * 10))
//     //     numberSequence.innerHTML += random_number
//     //     genCardsList.push(random_number)
//     // }
// }

// function clearList() {
//     genCardsList = []
// }

// function checkValidationTimer() {
//     // TODO: add more checks
//     if (parseInt(memoMinutes.value) == 0 || parseInt(memoSeconds.value) == 0) {
//         alert("Please, provide a valid number")
//         return
//     }
//     if (parseInt(recallMinutes.value) == 0 || parseInt(recallSeconds.value) == 0) {
//         alert("Please, provide a valid number")
//          return
//     }
// }

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

// let memoStart

function main() {
    
    // Temporary test

    //let cardList = [ clubsA ]

    // TODO: write generateCards

    // generateCards(cardsAmount.value)

    // TODO: add more checks
    // checkValidationTimer()

    // Initialization

    // initialScreen.classList.toggle("hide")
    // memoScreen.classList.toggle("hide")
    // memoScreenVisible = true

    // memoTotalTime = parseInt(memoMinutes.value) * 60 + parseInt(memoSeconds.value)
    // recallTotalTime = parseInt(recallMinutes.value) * 60 + parseInt(recallSeconds.value)
    
    // memoStart = setInterval(memoCounter, 1000)

}

// Places to place the cards - Temporary
let place = document.getElementById("place")

let clubsA = '<span><img src="{% static 'cards/cards/clubs_10.png' %}" alt="10 of clubs" style="width: 5rem"></span>'


place.innerHTML = clubsA

console.log("hello, world")
