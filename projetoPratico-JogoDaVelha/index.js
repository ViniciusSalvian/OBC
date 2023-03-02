let turnPlayer = "";
let vBoard = [];

// let boxes = document.querySelectorAll("box");
const boardRegions = document.querySelectorAll("#gameBoard span");
const h2 = document.querySelector('h2');

// let turno = "x";
// function switchTurn() {
//   const playerInput = document.getElementById(turnPlayer);
//   document.getElementById('turnPlayer').innerText = playerInput.value;
// }
function switchTurn() {
  //Seleciona o 
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  //Inicializando as variaveis globais
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  //h2.style.removeProperty("display");
  //document.getElementById("gameBoard").style.removeProperty('visibility:hidden');
  turnPlayer = "player1";
  //Ajusta o titulo da pagina, mudando o nome do jogador
  h2.innerHTML =
    '<h2><span id="turnPlayer"></span> turn</h2>';
  switchTurn();
  boardRegions.forEach((element) => {
    element.classList.remove("win");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handleBoardClick);
  });
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick);
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function handleWin(regions) {
  regions.forEach((region) => {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  h2.innerHTML = playerName + " venceu!";
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region;
  const rowColumnPair = region.split("."); // ["N", "N"]
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
    
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table(vBoard);
  disableRegion(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    switchTurn();
  } else {
    h2.innerHTML = "Empate!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);

// function backgroundWin(box1, box2, box3) {
//   box1.style.backgroundColor = "#4dff91";
//   box2.style.backgroundColor = "#4dff91";
//   box3.style.backgroundColor = "#4dff91";
// }

// function auxVerifyWinner(box1, box2, box3) {
//   if (
//     box1.textContent !== "" &&
//     box2.textContent !== "" &&
//     box3.textContent !== ""
//   ) {
//     if (
//       box1.textContent === box2.textContent &&
//       box2.textContent === box3.textContent
//     ) {
//       backgroundWin(box1, box2, box3);
//       return true;
//     } else {
//       return false;
//     }
//   } // função usada para verificar se caso haja vencedor, pintar o fundo da linha vencedora;

//   return false;
// }

// // função usada para verificar as celular e determinar se há vencedoras
// function verifyWinner() {
//   if (
//     auxVerifyWinner(boxes[0], boxes[1], boxes[2]) ||
//     auxVerifyWinner(boxes[0], boxes[3], boxes[6]) ||
//     auxVerifyWinner(boxes[0], boxes[4], boxes[8]) ||
//     auxVerifyWinner(boxes[1], boxes[4], boxes[7]) ||
//     auxVerifyWinner(boxes[2], boxes[5], boxes[8]) ||
//     auxVerifyWinner(boxes[2], boxes[4], boxes[6]) ||
//     auxVerifyWinner(boxes[3], boxes[4], boxes[5]) ||
//     auxVerifyWinner(boxes[6], boxes[7], boxes[8])
//   )
//     return true;
//   return false;
// }

// // Verificar empate
// function verifyATie() {}
