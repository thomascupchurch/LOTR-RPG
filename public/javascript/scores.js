function playAgain() {
  console.log("I pushed the play again button.");
  document.location.replace("/game");
}

function logOut() {
  console.log("I pushed the logout button.");
  document.location.replace("/");
}

document.querySelector("#playagain").addEventListener("submit", playAgain);

document.querySelector("#logout").addEventListener("submit", logOut);
