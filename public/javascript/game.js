const textElement = document.getElementById("question-text");
const optionButtonsElement = document.getElementById("options");

let state = {};
let health = 20;

function startGame() {
  //   state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function deductHealth() {
  console.log("deduct health has been called");
  let updatedHealth = (health -= 1);
  //   const scoreDiv = document.createElement("div");
  //   let scoreDisplay = document.createTextNode("Your score is: " + updatedHealth);
  //   scoreDiv.appendChild(scoreDisplay);
  //   const currentDiv = document.getElementById("scoreDisplay");
  //   document.body.insertBefore(scoreDiv, currentDiv);

  // STUCK HERE.  1) How do we know which character id to update.  2) get char_health undefined because we can't
  //import sequelize for our tables.
  //   const response = fetch(`/api/characters/1`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       char_health,
  //     }),

  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(response);
  //   if (response.ok) {
  //     console.log("Health Updated!");
  //   } else {
  //     alert(response.statusText);
  //   }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  console.log(option);
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  //   state = Object.assign(state, option.setState);
  if (option.damage) {
    deductHealth();
  }
  showTextNode(nextTextNodeId);
}

//write function to increase or decrease their health based on the option they chose.

const textNodes = [
  {
    id: 1,
    text: "Your relative has just left you his magic ring.  It may not be what it appears to be.  You:",
    options: [
      {
        text: "Try it on.  Magic rings do something, right?",
        damage: true,
        nextText: 2,
      },

      {
        text: "Put it away for later, there’s something about it you don’t like.",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Your wizard friend Gandalf has just shown up and proven that your magic ring is the One Ring, an ancient artifact of doom that the Dark Lord Sauron needs to restore his full power.  He suggests you leave immediately to avoid the evil forces looking for you.  You:",
    options: [
      {
        text: "Pack your bags and set out.",
        nextText: 11,
      },
      {
        text: "Stay put.  If I don’t put the ring on, they won’t notice me.",
        damage: true,
        nextText: 11,
      },
    ],
  },
  {
    id: 11,
    text: "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
];

startGame();
