/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

//const tweetData = [
  // {
  // "user": {
  //   "name": "Newton",
  //   "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //   },
  // "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  // "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" 
  //   },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
//]  

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    console.log("tweet: ", tweet);
    const $tweet = createTweetElement(tweet);
    $('#tweet-section').append($tweet);
  }
}

const createTweetElement = function(twtObj) {
  console.log(twtObj)
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
      <textarea name="tweet" id="tweet-content" disabled="yes">${twtObj.content.text}</textarea>
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

//event listener for submit
//prevent default form behaviour
//serialize form data
//submit post request that sends the data to the server (jQuery)

$('#tweet-form').submit((event) => {
  event.preventDefault();
  const str = $( "#tweet-form" ).serialize();
  if (str === 'text=') {
    alert("Cannot tweet empty message!");
    return;
  }
  else if (str.length > 145) {   
    alert("Cannot tweet more than 140 characters!");
    return;
  }
  $.ajax('/tweets', { 
    method: 'POST',
    data: str 
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
  console.log('checking for load tweets')
}

loadTweets();

})

