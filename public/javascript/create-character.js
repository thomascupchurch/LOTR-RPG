async function newFormHandler(event) {
  event.preventDefault();

  const char_name = document.querySelector('input[name="charName"]').value;
  const char_type = document.querySelector('select[name="char-type"]').value;

  

  const response = await fetch("/api/character", {
    method: "POST",
    body: JSON.stringify({
      char_name,
      char_type,
      // user_id
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    // response.render('char_name', {title: 'character id',  char_name: 'Frodo', id: 1 });
    document.location.replace("/game");
    
    // const char_id = this.character.id;
    }
   else {
    alert(response.statusText);
  };

  
};


document
  .querySelector(".create-char-form")
  .addEventListener("submit", newFormHandler)

  

//   const get_char_id = await fetch(`/api/character/${this.character.id}`, {
//     method: "GET",
//     body: JSON.stringify({
//       id,
//       char_name,
//       char_type,
//       char_health
//     }),
//     headers: {
//       "Content-Type": "application/json"
//   }
// });
// if (response.ok) {
//   console.log('char_id function has been called')
//   response.render(game, char_id)
//   // const char_id = this.character.id;
//   }
//  else {
//   alert(response.statusText);
// };
