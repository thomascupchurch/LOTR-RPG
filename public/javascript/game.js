// const { Character } = require("../../models");

const textElement = document.getElementById("question-text");
const optionButtonsElement = document.getElementById("options");
// const char_name = document.querySelector('input[name="charName"]').value;
// const char_type = document.querySelector('select[name="char-type"]').value;

let damage;
let state = {};

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
  //   event.preventDefault();
  console.log("deduct health has been called");
  const response = fetch(`/api/characters/5`, {
    method: "PUT",
    body: char_health,

    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    char_health--;
  } else {
    alert(response.statusText);
  }
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

// function deductHealth() {
//   currentPlayerHealth = currentPlayerHealth - 1;
//   console.log(currentPlayerHealth);
//   //need to write code to push the currentPlayerhealth to the "posthealth function"
// }

// function posthealth() {
//   //need to write code to push the health value to the health column of the health model.
//   //need to figure out how to match it w/ the user_id.
// }

//write function to increase or decrease their health based on the option they chose.

const textNodes = [
  {
    id: 1,
    text: "Your relative has just left you his magic ring.  It may not be what it appears to be.  You:",
    options: [
      {
        text: "Try it on.  Magic rings do something, right?",
        // setState: { blueGoo: true },
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
    text: "You venture forth in search of answers to where you are when you come across a merchant.",
    options: [
      {
        text: "Trade the goo for a sword",
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a shield",
        // // requiredState: (currentState) => currentState.blueGoo,
        // // setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Find a room to sleep at in the town",
        nextText: 5,
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "You wake up well rested and full of energy ready to explore the nearby castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "While exploring the castle you come across a horrible monster in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        // requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        // // requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue goo at it",
        // requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Your attempts to run are in vain and the monster easily catches.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: "You foolishly thought this monster could be slain with a single sword.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "The monster laughed as you hid behind your shield and ate you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
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
