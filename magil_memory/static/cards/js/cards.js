const deckOfCards = [
    clubsA, clubs2, clubs3, clubs4, clubs5, clubs6, clubs7, clubs8, clubs9, clubs10, clubsJ, clubsQ, clubsK,
    spadesA, spades2, spades3, spades4, spades5, spades6, spades7, spades8, spades9, spades10, spadesJ, spadesQ, spadesK,
    heartsA, hearts2, hearts3, hearts4, hearts5, hearts6, hearts7, hearts8, hearts9, hearts10, heartsJ, heartsQ, heartsK,
    diamondsA, diamonds2, diamonds3, diamonds4, diamonds5, diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, diamondsJ, diamondsQ, diamondsK
]

const kings = [heartsK, spadesK, clubsK, diamondsK]

const deckSize = 52

let genCardsList = []

let copyOfgenCardList = []

let userAnswersList = []

let currentCards = []

// HTML elements
let currentCardsPlace = document.getElementById("current_cards")
let remainingCardsPlace = document.getElementById("remaining_cards")
let groupByCards = document.getElementById("group_by_cards")
let cardKeyboardPlace = document.getElementById("card_keyboard")
let cardAnswerPlace = document.getElementById("card_answer")

// Input boxes -- Main screen
let cardsAmount = document.querySelector("#cards_amount")

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

// TODO: add more info
// Transition between memoScreen to recallScreen
let recallStart

function finishMemo() {
    memoScreenVisible = !memoScreenVisible
    recallScreenVisible = !recallScreenVisible
    memoScreen.classList.toggle("hide")
    recallScreen.classList.toggle("hide")

    clearInterval(memoStart)

    recallStart = setInterval(recallCounter, 1000)
    createKeyboard()
}

// Counter for the recallScreen
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

    console.log("User answer:" + userAnswersList)
    console.log("Gen list:" + genCardsList)
}

// TODO: add more info
function finishRecall() {
    memoScreenVisible = !memoScreenVisible
    recallScreen.classList.toggle("hide")
    discordSubmitScreen.classList.toggle("hide")

    // Remove the keyboard from the DOM, restore pixels back to page
    cardKeyboardPlace.remove()

    clearInterval(recallStart)

    let failure = 0
    let score = 0

    for (let i = 0, j = genCardsList.length; i < j; i++) {
        if (genCardsList[i].includes(userAnswersList[i])) {
            score++
        } else {
            failure++
        }
    }

    console.log(`score is ${score} and failure is ${failure}`)

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

// Logic for switching cards by group size
function showNextCards() {

    let groupSize = parseInt(groupByCards.value)

    currentCards = copyOfgenCardList.splice(0, groupSize)
    updateCardsMemo()
}

function updateCardsMemo() {
    currentCardsPlace.innerHTML = currentCards
    remainingCardsPlace.innerHTML = copyOfgenCardList
}

function createKeyboard() {
    deckOfCards.forEach((cardElement, index) => {
        const card = document.createElement("span")
        card.innerHTML = cardElement
        card.setAttribute("onclick", `placeCard(event, ${index})`)
        card.setAttribute("card-id", index)
        card.firstChild.classList.add('keyboard_card')
        console.log(card.outerHTML)
        cardKeyboardPlace.append(card)

        if (kings.includes(deckOfCards[index])) {
            card.innerHTML += '<br>'
        }
    })
}

function placeCard(event, index) {
    userAnswersList.push(event.target.outerHTML)

    const card = document.createElement("span")
    card.innerHTML = event.target.outerHTML
    card.setAttribute("card-id", index)

    card.setAttribute("onclick", `undoCard(event, ${index})`)

    if (!(event.target.classList.contains("keyboard_choosen"))) {
        event.target.parentNode.classList.toggle("keyboard_choosen")
    }

    cardAnswerPlace.append(card)
}

function undoCard(event, index) {

    event.target.remove()
    let keyboardEquivalentCard = document.querySelectorAll(`[card-id="${index}"]`)
    userAnswersList.pop()

    keyboardEquivalentCard.forEach( (element, index) => {
        element.firstChild?.classList.toggle("keyboard_choosen")
    })

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

    // Initialize copyOfGenCardList
    for (let i = 0; i < genCardsList.length; i++) {
        copyOfgenCardList[i] = genCardsList[i]
    }

    showNextCards()

}