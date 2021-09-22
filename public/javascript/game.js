// const sequelize = require("../../config/connection");
// const { Character } = require("../../models");

const textElement = document.getElementById("question-text");
const optionButtonsElement = document.getElementById("options");
const scoreDisplayElement = document.getElementById("score-display");

let state = {};
let health = 20;

function startGame() {
  //   state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  textElement.classList.add("fs-3");
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn", "fs-4");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function deductHealth() {
  console.log("deduct health has been called");
  //plays error sound when the wrong choice is selected.
  let errorMusic = new Howl({
    src: ["/music/327737__distillerystudio__error-02.wav"],
    volume: 0.1,
  });

  errorMusic.play();
  //passes the incremented health to the updateScoreDisplay function.
  updateScoreDisplay(--health);
  //can I push the values here as well to the "end game" function to it
  //pushes the score to the character table on the char_health for the current
  //character?
}

//plays correct sound when the right choice is made.
function correctChoice() {
  let correctMusic = new Howl({
    src: ["/music/415762__thebuilder15__notification-correct.wav"],
    volume: 0.2,
  });

  correctMusic.play();
}

function updateScoreDisplay(val) {
  document.getElementById("score-display").innerHTML = "Your score: " + val;
}

async function endgame() {
  // STUCK HERE.  1) How do we know which character id to update.  2) get char_health undefined because we can't
  //import sequelize for our tables.
  const response = await fetch(`/api/character/`, {
    method: "PUT",
    body: JSON.stringify({
      health,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    console.log("Health Updated!");
  } else {
    alert(response.statusText);
  }
  document.location.replace("/scores");
  // getId();
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  console.log(option);
  const nextTextNodeId = option.nextText;
  // if (nextTextNodeId <= 0) {
  //   return startGame();
  // }
  //   state = Object.assign(state, option.setState);
  if (option.damage) {
    deductHealth();
  } else {
    correctChoice();
  }
  if (option.endgame) {
    endgame();
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
        nextText: 3,
      },
      {
        text: "Stay put.  If I don’t put the ring on, they won’t notice me.",
        damage: true,
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "You arrive at the town you are supposed to meet Gandalf in, but he isn’t there.  Instead, a rough-looking Man tells you Gandalf won’t be meeting you and to follow him to Rivendell.",
    options: [
      {
        text: "No thanks, I’ll make my own way to Rivendell.",
        damage: true,
        nextText: 4,
      },
      {
        text: "Nice to have you along, Mr. Strider.",
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text: "In Rivendell, it is decided the Ring must be destroyed.  You volunteer to undertake the perilous journey into the heart of Mordor in order to do this.  Saruman the White shows his true colors as a servant of Sauron and blocks the path you planned to take over the Misty Mountains.  Now you must find a way around.",
    options: [
      {
        text: "Go through the Gap of Rohan, it will take you close to Saruman’s stronghold in Isengard, but you may be able to pass through unnoticed, and you can find help in Rohan.",
        damage: true,
        nextText: 5,
      },
      {
        text: "Go through the kingdom of Moria.  The ancient Dwarven city has long been abandoned and houses unknown dangers, but it’s far from Saruman’s citadel.",
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text: "As you travel through Moria, you become aware of a strange creature following your every move.  Gandalf tells you it’s Gollum, who is obsessed with the Ring.  You:",
    options: [
      {
        text: "Set a trap for him, what if Sauron is using him to capture the Ring?",
        damage: true,
        nextText: 6,
      },
      {
        text: "Try to make contact with him.  Maybe he can be reasoned with.",
        nextText: 6,
      },
    ],
  },
  {
    id: 6,
    text: "The commotion attracts the attention of the evil creatures living in Moria and soon you and your companions are fleeing as a creature made of smoke and fire appears and blocks your way.",
    options: [
      {
        text: "YOU SHALL NOT PASS",
        damage: true,
        nextText: 7,
      },
      {
        text: "Let Gandalf handle it; he is a wizard after all.",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "Your journey brings you to the forest of Lothlorien to the home of the Lorien elves.  Their ruler Galadriel gives you shelter for the night.  Later, she reveals she knows of the Ring and asks that you give it to her.",
    options: [
      {
        text: "No, this is my task.",
        nextText: 8,
      },
      {
        text: "Here you go, shiny elf lady.",
        damage: true,
        nextText: 8,
      },
    ],
  },
  {
    id: 8,
    text: "You travel up river to continue your journey.  When you stop to make camp, you are ambushed by Uruk-hai from Isengard.",
    options: [
      {
        text: "You stand and fight!",
        damage: true,
        nextText: 9,
      },
      {
        text: "You put on the Ring and escape to safety.",
        nextText: 9,
      },
    ],
  },
  {
    id: 9,
    text: "Your faithful friend Samwise Gamgee finds you as you head east towards Mordor.  He insists on accompanying you.",
    options: [
      {
        text: "No, Sam, you can’t come with me.",
        damage: true,
        nextText: 11,
      },
      {
        text: "It will be dangerous, but I can’t turn you away now.",
        nextText: 11,
      },
    ],
  },
  {
    id: 11,
    text: "You end up bringing Sam along, after all, he’s a reliable hobbit and handy with a frying pan.  The two of you end up lost in the mountains when you encounter Gollum following you again.",
    options: [
      {
        text: "You set a trap for him.  He will try to kill you if you do nothing.",
        damage: true,
        nextText: 12,
      },
      {
        text: "Do nothing.",
        nextText: 12,
      },
    ],
  },
  {
    id: 12,
    text: "Gollum brings you to the Black Gate of Mordor, as it opens to admit a battalion of soldiers summoned by Sauron, you think for a moment and then decide to:",
    options: [
      {
        text: "Let's go for it, Now may be your only chance!",
        damage: true,
        nextText: 13,
      },
      {
        text: "There’s too much distance between you and the Gate, it will be closed again before you can reach it.",
        nextText: 13,
      },
    ],
  },
  {
    id: 13,
    text: "You watch as the Gate swings shut.  One does not simply walk into Mordor.  Gollum tells you he knows another way in.  Gollum’s path takes you through a swamp filled with the bodies of fallen warriors from battles waged long ago.  He warns you not to follow the lights, but up ahead, you think you see a fire.  You:",
    options: [
      {
        text: "Follow Gollum.",
        nextText: 14,
      },
      {
        text: "Go towards the fire.",
        damage: true,
        nextText: 14,
      },
    ],
  },
  {
    id: 14,
    text: "You make it out of the Dead Marshes and into the relative safety of the Forest of Ithilien where you are surrounded by human rangers from the Kingdom of Gondor.  You:",
    options: [
      {
        text: "Resist.  You are unsure whether you can trust them.",
        damage: true,
        nextText: 15,
      },
      {
        text: "Try to reason with them to let you go.",
        nextText: 15,
      },
    ],
  },
  {
    id: 15,
    text: "The Nazgûl, sensing the Ring’s presence, swoop down upon you when you arrive in Osgiliath.  Faramir and his men are unable to keep sight of your party when a band of orcs from Mordor join the fight.",
    options: [
      {
        text: "Use this opportunity to slip away, out of the city.",
        nextText: 16,
      },
      {
        text: "Jump into the river and try to swim for it.",
        damage: true,
        nextText: 16,
      },
    ],
  },
  {
    id: 16,
    text: "Gollum leads you to Minas Morgul, a fortress that once guarded the eastern borders of Gondor.  Rather than go through the keep, Gollum shows you a secret route up the side of the mountain.",
    options: [
      {
        text: "Start climbing.",
        nextText: 17,
      },
      {
        text: "Take a nap",
        damage: true,
        nextText: 17,
      },
    ],
  },
  {
    id: 17,
    text: "Gollum’s secret passage brings you to the mouth of Cirith Ungol, a forgotten pass into Mordor.  The cave is dark and smells foul, but this is the only way to enter Mordor undetected.  You set off into the darkness, following Gollum’s voice, but manage to get separated from both him and Sam in the process.",
    options: [
      {
        text: "Stay calm and remember the magic light Galadriel gave you back in Lothlorien.",
        nextText: 18,
      },
      {
        text: "Try to backtrack to where you last remember hearing Sam’s voice.",
        damage: true,
        nextText: 18,
      },
    ],
  },
  {
    id: 18,
    text: "This was a trap! Cirith Ungol does lead into Mordor, but it houses a giant, hungry spider who’s itching for some tender non-orc meat.  Gollum tricked you, hoping Shelob will kill you so he can take the Ring for himself!  You are barely able to reach your sword, but you manage to get hold of it and start cutting yourself loose.",
    options: [
      {
        text: "Try to find a chamber with some space and stand your ground.",
        damage: true,
        nextText: 19,
      },
      {
        text: "Try to find your way out of the caves, using Galadriel’s magic light to guide your path.",
        nextText: 19,
      },
    ],
  },
  {
    id: 19,
    text: "You come to inside a Mordor dungeon and torture chamber.  As the orcs are arguing over what to do with your and your stuff, you hear a terrifying growling noise.  Frightened and defenseless, you prepare for what’s coming only to see Sam appear.",
    options: [
      {
        text: "Demand to know what happened to the Ring.",
        damage: true,
        nextText: 20,
      },
      {
        text: "Tell him how relieved you are to see him!",
        nextText: 20,
      },
    ],
  },
  {
    id: 20,
    text: "You and Sam make your ways (downtown) across the desolate plains of Mordor, dodging orcs and hiding from the Eye of Sauron atop the Tower of Barad-dûr.  The road is long and as you go, the Ring feels heavier and heavier around your neck as if it senses its proximity to both its master and its doom.  Finally, you step into the heat of Mount Doom where the Ring was forged.  You hear Sauron’s voice echoing in your head, promising you power and a place by your side if you give the Ring to him. (WARNING: Your choice here will determine your fate and the fate of all Middle Earth!)",
    options: [
      {
        text: "You throw the Ring into the fire without hesitation.  The sooner you are rid of it, the better.",
        nextText: 21,
      },
      {
        text: "You Hesitate as you hold it over the edge consumed by your desire for the 'power' the ring's presence provides; not realizing Gollum is behind you, you continue to pause.",
        damage: true,
        nextText: 21,
      },
    ],
  },
  {
    id: 21,
    text: "YOU MADE IT!!!  With a roar, the entire land of Mordor seems to collapse around you.  The last things you see before all goes black is the tower of Barad-dûr falling, the Eye of Sauron staring around wildly, and the distant forms of eagles flying towards where you and Sam are trapped on an outcropping.  When you awake, you are in Minas Tirith, Strider, now using his true name of Aragon, Gandalf, and the rest of your companions are waiting for you.  The evil plaguing the land has been vanquished once and for all and everyone is ready to celebrate in your honor.  You watch the coronation of Aragon as the rightful King of Gondor only for him to turn to you and bow as the savior of all the free peoples of Middle Earth.  You are rewarded by the elves with passage to the Undying Lands, but your legend lives on long after you leave Middle Earth.  You have come to the end of your journey, thanks for playing!",
    options: [
      {
        text: "Congratulations!!  Now Click Here to Checkout your score!",
        endgame: true,
        nextText: -1,
      },
    ],
  },
];

startGame();
