// const textArea = document.getElementById("tweet-text");

$(document).ready(function() {
  const textArea = $("#tweet-text");

  textArea.on('keyup', function() {
    let counter = $("#char");
    console.log("counter: ", counter)

    let charExceed = 140 - this.value.length
    counter.text(charExceed);

    // console.log("x: ", x)
    // console.log("this.value: ", this.value)

    if (charExceed < 0) {
      counter.css({
        color: 'red'
      });
    }
    // colour = (counter.text(140 - this.value.length)) < 0 ? 'red' : 'black';

  })
});

// textArea.addEventListener("blur", () => {
//   console.log("checking with blur")
// });