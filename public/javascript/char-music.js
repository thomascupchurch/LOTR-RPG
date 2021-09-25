let charMusic = new Howl({
  src: ["/music/250856__joshuaempyre__epic-orchestra-loop.wav"],
  volume: 0.1,
});

let elms = ["playBtn", "pauseBtn"];
elms.forEach(function (elm) {
  window[elm] = document.getElementById(elm);
});

// Bind our player controls.
playBtn.addEventListener("click", function () {
  charMusic.play();
});
pauseBtn.addEventListener("click", function () {
  charMusic.pause();
});

charMusic.play();
