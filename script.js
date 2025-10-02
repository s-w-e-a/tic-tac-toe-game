let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let gameContainer = document.querySelector("#game-container");
let setupScreen = document.querySelector("#setup-screen");
let turnInfo = document.querySelector("#turn-info");


let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = false;


const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Start Game button
document.querySelector("#start-game").addEventListener("click", () => {
    player1 = document.querySelector("#player1").value || "player 1";
    player2 = document.querySelector("#player2").value || "player 2";

    setupScreen.style.display = "none";
    gameContainer.style.display = "block";
    gameActive = true;

    updateTurnInfo();
});

function updateTurnInfo() {
    if (currentPlayer === "X") {
        turnInfo.innerText = `${player1}'s turn(X)`;
    }
    else {
        turnInfo.innerText = `${player2}'s turn(O)`;
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      gameActive = false;
      turnInfo.innerText = `🎉 ${currentPlayer === "X" ? player1 : player2} Wins!`;
      disableBoxes();
      return;
    }
  }
}

function disableBoxes() {
  boxes.forEach((box) => (box.disabled = true));
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  currentPlayer = "X"; // always X starts again
  gameActive = true;
  updateTurnInfo();
}


//game starts here.

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameActive || box.innerText !== "") return; //if the game is over or the box(inner text contains X or O clicking doesnt work.return stop the function.)
    
      box.innerText = currentPlayer;
      if (currentPlayer === "O") {
      box.style.color = "red"; // change O color to red
    } else {
      box.style.color = "black"; // X color stays black
    }
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
//  if (currentPlayer === "X") {
//     currentPlayer = "O";
// } 
//  else {
//     currentPlayer = "X";
// } Another way without using ternanry operator.

      updateTurnInfo();
    }
  });
});

resetBtn.addEventListener("click", resetGame);

let newGameBtn = document.querySelector("#new-game");

function newGame() {
    // Reset board
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    
    });

    // Reset variables
    currentPlayer = "X";
    gameActive = false;
    player1 = "";
    player2 = "";

    // Show setup screen
    setupScreen.style.display = "flex";
    gameContainer.style.display = "none";

    // Clear input fields
    document.querySelector("#player1").value = "";
    document.querySelector("#player2").value = "";

    turnInfo.innerText = ""; // clear turn info
}

newGameBtn.addEventListener("click", newGame);


// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if (turnO) {
//             box.innerText = 'O';
//             turnO = false;
//         }
//         else {
//             box.innerText = 'X';
//             turnO = true;
//         }
//         box.disabled = true;
//         checkWinner();
//     });
// });


// const checkWinner = () => {
//     for (let pattern of winPatterns) {
//         let pos1 = boxes[pattern[0]].innerText;
//         let pos2 = boxes[pattern[1]].innerText;
//         let pos3 = boxes[pattern[2]].innerText;

//         if (pos1 != '' && pos2 != '' && pos3 != '') {
//             if (pos1 === pos2 && pos2 === pos3) {

//             }
//         }
//     }
// }