$(document).ready(function() {
  const textArea = $("#tweet-text");

  textArea.on('keyup', function() {
    let counter = $("#char");
    console.log("counter: ", counter)

    let charExceed = 140 - this.value.length
    counter.text(charExceed);

    //Change font colour if characters exceeds 140. Reverts back to black if within char limit
    if (charExceed < 0) {
      counter.css({
        color: 'red'
      });
    } else if (charExceed > 0) {
      counter.css({
        color: 'white'
      });
    }

  })
});

