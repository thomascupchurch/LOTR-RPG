async function loginFormHandler(event) {
  event.preventDefault();

  const user = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user && password) {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        user,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/character/");
    } else {
      alert("There was an issue with your login, please try again.");
      //Add to add the "await" to capture the response properly.
      const data = await response.json();
      console.log(data);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/character/");
    } else {
      alert("oops looks like there was a problem, please try again.");
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
