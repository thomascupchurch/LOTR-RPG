let loginMusic = new Howl({
  src: ["/music/511311__theoteravainen__fantasy-classical-themes.mp3"],
  volume: 0.2,
});

let elms = ["playBtn", "pauseBtn"];
elms.forEach(function (elm) {
  window[elm] = document.getElementById(elm);
});

// Bind our player controls.
playBtn.addEventListener("click", function () {
  loginMusic.play();
});
pauseBtn.addEventListener("click", function () {
  loginMusic.pause();
});

loginMusic.play();
