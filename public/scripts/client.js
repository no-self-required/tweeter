/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

$( "#alert-140" ).hide();
$( "#alert-null" ).hide();

  const renderTweets = function(tweets) {
    $( "#tweet-section" ).empty();
    for (let tweet of tweets) {
      console.log("tweet: ", tweet);
      const $tweet = createTweetElement(tweet);
      $('#tweet-section').prepend($tweet);
    }
  }

  const createTweetElement = function(twtObj) {
    const item =`
    <div class="tweet-container">
      <div class="actual-container">
        <div id="top-box">
          <div id="ico-name">
            <img id="avatar" src="${twtObj.user.avatars}"/>
            <p id="name">${twtObj.user.name}</p>
          </div>
          <p id="handle">${twtObj.user.handle}</p>
        </div>
        <p id="tweet-content">${twtObj.content.text}</p>
        <div id="bottom-box">
          <p id="date">${timeago.format(twtObj.created_at)}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>            
          </div>
        </div>
      </div>
    </div> 
    `
    return item;
  }

  $('#tweet-form').submit((event) => {
    event.preventDefault();
    if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null || $('#tweet-text').val().trim().length === 0){
      $( "#alert-null" )
        .slideDown("slow")
        .delay(2000)
        .slideUp("slow");
        return;
    }
    else if ($('#tweet-text').val().length > 140) {   
      $( "#alert-140" )
        .slideDown("slow")
        .delay(2000)
        .slideUp("slow");
        return;
    }
    const str = $( "#tweet-form" ).serialize();
    $.ajax('/tweets', { 
      method: 'POST',
      data: str 
    }).then(() => {
      $( "#alert-140" ).slideUp( "slow", function() {
      });
      $( "#alert-null" ).slideUp( "slow", function() {
        });
      //refreshes tweet container tweets, resets char counter; and loads the tweet after submitting
      $('#tweet-text').val('');
      $('#char').val('140');
      loadTweets();
    })
  })

  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      dataType: 'JSON' 
    }).then((result) => {
      renderTweets(result);
    })
  }

  loadTweets();

})

