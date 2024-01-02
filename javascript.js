let cards = []
let sum = 0;
let hasBlackJack = false
let isAlive = false // jogador está em jogo
let message = ""
const messageEL = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el")
const cardsDiv = document.getElementById("cardsdiv")
const nameBox = document.getElementById("name-box")
const usernameEl = document.getElementById("username")
const backDrop = document.getElementById("backdrop")

let player = {
    name: "",
    chips: 200
}

function getRandomCard () {  
    let randomNumber = Math.floor( Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber
    }
}

function startGame() {
    event.preventDefault()
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secoundCard = getRandomCard()
    cards = [firstCard, secoundCard]
    sum = firstCard + secoundCard
    updateUserName ()
    renderGame()
    closeModal()
}

function renderGame() {
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: "

    let cardsImage = []

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
        cardsImage.push(`<img id="card-extra" class="cards" src="./cards/${cards[i]}.png">`)
    }

    cardsDiv.innerHTML = cardsImage.join(" ")

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got BLACKJACK!";
        hasBlackJack = true;
        player.chips += 30
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips -= 10
    }
    messageEL.textContent = message;
    updateUserName ()
}

function newCard() {
     if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        cardsDiv.innerHTML += `<img id="card-extra" class="cards" src="./cards/card back red.png">`
        renderGame ()
    }  
}

function closeModal() {
    nameBox.remove()
    backDrop.remove()
}

function updateUserName () {
    player.name = usernameEl.value

    let playerEl = document.getElementById("player-el")
    playerEl.textContent = player.name + ": $" + player.chips
}