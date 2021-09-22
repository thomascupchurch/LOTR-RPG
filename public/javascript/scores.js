function playAgain(event) {
  event.preventDefault();

  console.log("I pushed the play again button.");
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
