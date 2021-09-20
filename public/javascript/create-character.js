async function newFormHandler(event) {
  event.preventDefault();

  const char_name = document.querySelector('input[name="charName"]').value;
  const char_type = document.querySelector('select[name="char-type"]').value;

  const response = await fetch("/api/characters", {
    method: "POST",
    body: JSON.stringify({
      char_name,
      char_type,
      user_id
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/game");
    }
   else {
    alert(response.statusText);
  }
  
};

document
  .querySelector(".create-char-form")
  .addEventListener("submit", newFormHandler)
  

  