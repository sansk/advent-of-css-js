const keys = document.querySelectorAll(".key");

keys.forEach(key => key.addEventListener("click", function(e) {
  const audFile = this.getAttribute("data-key"),
        audio = document.querySelector(`audio[data-key="${audFile}"]`);

  audio.currentTime = 0;
  audio.play();
}));