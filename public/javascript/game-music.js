let gameMusic = new Howl({
  src: ["/music/250972__luis-audp__celtic-tin-whistle-pennywhistle-in-d.mp3"],
  volume: 0.3,
  loop: true,
});

let elms = ["playBtn", "pauseBtn"];
elms.forEach(function (elm) {
  window[elm] = document.getElementById(elm);
});

// Bind our player controls.
playBtn.addEventListener("click", function () {
  gameMusic.play();
});
pauseBtn.addEventListener("click", function () {
  gameMusic.pause();
});

gameMusic.play();
