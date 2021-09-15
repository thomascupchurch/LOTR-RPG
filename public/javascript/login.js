async function loginFormHandler(event) {
  event.preventDefault();

  const user = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        user,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
      //Add to add the "await" to capture the response properly.
      const data = await response.json();
      console.log(data);
    }
  }

  console.log("Do you see me? 1");
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }

  console.log("Do you see me? 2");
}

document
  .querySelector(".login-form")
  .addEventListener(
    "submit",
    loginFormHandler,
    console.log("you clicked the login button")
  );

document
  .querySelector(".signup-form")
  .addEventListener(
    "submit",
    signupFormHandler,
    console.log("you clicked the sign up button.")
  );
