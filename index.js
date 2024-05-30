const beginButton = document.getElementById("begin-button")
const hitButton = document.getElementById("hit-button")
const standButton = document.getElementById("stand-button")


beginButton.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
      const deckId = data.deck_id
      document.getElementById("gameboard").dataset.deck = data.deck_id
      fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
          const crupierCard = data.cards[0]
          const playerCard = data.cards[1]
          resetGame();
          renderCards(crupierCard, playerCard)
          updateScores(crupierCard, playerCard)
          toggleButtonsVisibility()
        })
    })
})

hitButton.addEventListener("click", () => {
  const gameboardEl = document.getElementById("gameboard")
  hitButton.disabled = true
  if (gameboardEl.dataset.deck)
    fetch(`https://www.deckofcardsapi.com/api/deck/${gameboardEl.dataset.deck}/draw/?count=1`)
      .then(res => res.json())
      .then(data => {
        const playerCard = data.cards[0]
        const playerCardsEl = document.getElementById("player-cards")
        const playerScoreEl = document.getElementById("player-score")
        renderCard(playerCardsEl, playerCard)
        updateScore(playerScoreEl, playerCard)
        handleGameState("hit")
        hitButton.disabled = false
      })
})

standButton.addEventListener("click", async () => {
  const gameboardEl = document.getElementById("gameboard")
  for (let winner = handleGameState("stand"); !winner; winner = handleGameState("stand")) {
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${gameboardEl.dataset.deck}/draw/?count=1`)
    const data = await res.json()
    const crupierCard = data.cards[0]
    const crupierCardsEl = document.getElementById("crupier-cards")
    const crupierScoreEl = document.getElementById("crupier-score")
    renderCard(crupierCardsEl, crupierCard)
    updateScore(crupierScoreEl, crupierCard)
  }
})


function resetGame() {
  document.getElementById("crupier-score").textContent = 0
  document.getElementById("player-score").textContent = 0
  document.getElementById("crupier-cards").innerHTML = ""
  document.getElementById("player-cards").innerHTML = ""
  document.getElementById("game-state").textContent = "Who will win?"
  document.getElementById("game-state").classList.remove("lost");
  document.getElementById("game-state").classList.remove("won")
}

function renderCards(crupierCard, playerCard) {
  const crupierCardsEl = document.getElementById("crupier-cards")
  const playerCardsEl = document.getElementById("player-cards")
  renderCard(crupierCardsEl, crupierCard)
  renderCard(playerCardsEl, playerCard)
}

function renderCard(element, card) {
  const positionCounter = element.children.length
  element.innerHTML +=
    `<img
      src="${card.image}" 
      class="card-img"
      loading="lazy"
      style="top:${positionCounter * 8}px;
             left: ${positionCounter * 13}%; 
             z-index: ${positionCounter}"
    />`
  element.style.translate = `-${positionCounter * 8}px -${positionCounter * 4}px`
}

function updateScores(crupierCard, playerCard) {
  const crupierScoreEl = document.getElementById("crupier-score")
  const playerScoreEl = document.getElementById("player-score")
  updateScore(crupierScoreEl, crupierCard)
  updateScore(playerScoreEl, playerCard)
}

function updateScore(element, card) {
  const cardValue = getNumberValue(card.value, element.textContent)
  element.textContent = Number(element.textContent) + cardValue
}

function getNumberValue(cardValue, totalScore) {
  if (Number(cardValue)) return Number(cardValue)
  if (cardValue === "ACE") {
    if (totalScore <= 10) return 11
    if (totalScore > 10) return 1
  }
  return 10
}

function toggleButtonsVisibility() {
  beginButton.classList.toggle("hidden")
  hitButton.classList.toggle("hidden")
  standButton.classList.toggle("hidden")
}

function handleGameState(action) {
  const crupierScore = Number(document.getElementById("crupier-score").textContent)
  const playerScore = Number(document.getElementById("player-score").textContent)
  const gameStateEl = document.getElementById("game-state")

  if (action === "hit"){
    if (playerScore < 21) return false
    if (playerScore === 21) {
      gameStateEl.textContent = "You win with Blackjack!"
      gameStateEl.classList.add("won")
      updateCurrency(10, "increase")
    }
    else if (playerScore > 21){
      gameStateEl.textContent = "Busted!"
      gameStateEl.classList.add("lost")
      updateCurrency(5, "decrease")
    }
    toggleButtonsVisibility()
    return true
  }

  if (action === "stand"){
    if (crupierScore <= playerScore && crupierScore < 21) return false
    if (crupierScore > 21){
      gameStateEl.textContent = "You win!"
      gameStateEl.classList.add("won")
      updateCurrency(5, "increase")
    }
    else if (crupierScore === 21){
      gameStateEl.textContent = "The croupier wins with Blackjack!"
      gameStateEl.classList.add("lost")
      updateCurrency(5, "decrease")
    }
    else if (crupierScore > playerScore){
      gameStateEl.textContent = "The croupier wins!"
      gameStateEl.classList.add("lost")
      updateCurrency(5, "decrease")
    }
    toggleButtonsVisibility()
    return true
  }
}


function updateCurrency(number, action){
  const currencyCounterEl = document.getElementById("currency-counter")
  if (action === "decrease"){
    for (let i=1; i <= number; i++){
      setTimeout(() => currencyCounterEl.textContent = Number(currencyCounterEl.textContent) - 1,100*i)  
    }
  }
  if (action === "increase"){
    for (let i=1; i <= number; i++){
      setTimeout(() => currencyCounterEl.textContent = Number(currencyCounterEl.textContent) + 1,100*i)
    }
  }
}





