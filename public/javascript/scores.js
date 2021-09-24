async function showScores() {
  const scoresElement = document.getElementById("scores-div");
  console.log("showScores has been called");
  //uses the character routes setup in character-routes.js
  //to get all the character data.
  const response = await fetch("/api/character", {
    method: "GET",
    body: JSON.stringify({
      char_name,
      char_type,
      char_health,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    console.log(response);
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

function playAgain(event) {
  event.preventDefault();
  //when they push play again redirect them back to the character page.
  document.location.replace("/character");
}

async function logout() {
  const response = await fetch("/api/user/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
document.querySelector("#playagain").addEventListener("click", playAgain);

showScores();
