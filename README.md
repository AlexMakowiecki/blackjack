# Blackjack Game
## Introduction
It's a website with a blackjack game in it, you can begin the game, hit for more cards, and stand when you want. You can also have currency as casino chips, you win chips when you win the game and lose in the other case.
The website was done to practice interaction with APIs and for my entertainment. The original website contained a war game, but I didn't know that game, so I changed to blackjack.
## Details
### JavaScript
  - **Begin button clicked**
    - The gameboard is reset to clear the information from previous games
    - To obtain the `ID` of a new deck, a GET request is sent to the `https://www.deckofcardsapi.com/` API
    - With the deck `ID`, another GET request is sent to get the `cards info` of 2 cards and remove them from the deck.
    - An `<img>` of each card is created, using the URL of the images stored in the `cards info`
    - The points counter of the player and the croupier are updated, based on the value of the cards, stored in `cards info` 
       - Parses "Q", "J", and "K" cards to 10.
       - Parses "A" to 1 or 11 depending on the current value of the points counter. 
    - The "Begin" button is hidden and the "Hit" and "Stand" buttons appear.
  - **Hit button clicked**
    - A new card is requested, the image is added, and the points counter of the player is updated.
  - **Stand button clicked**
    - As long as the dealer has not lost or won, it will request a new card and add it to its hand.
  - **Game conclusion**
    - When the hit or stand buttons are clicked, a function verifying the game state will run. 
    - The subtitle that shows "Who will win?" will change its content and style based on the game's conclusion
    - The player currency will change:
      - If the player wins with blackjack, 10 coins will be added to its currency.
      - If the player wins normally, 5 coins will be added to its currency.
      - If the player loses, 5 coins will be deducted from its currency.
### CSS
  - All cards are absolute positioned inside a relative container
  - When a card is added, his top and left positions are calculated based on the number of children of the parent.
  - The container is also moved a little to the left and top, to make it look better when a lot of cards are drawn. 
  - Grid used for the layout of the document
  - max-width used on the gameboard, to prevent the currency container from straying too far from the game.
    - currency container added as an absolute element with gameboard as its relative parent.
## Concepts learned in the course

## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
