var icons = document.querySelectorAll(".card");
var symbols = [...icons];
var iconslist = [...icons];
var min = 0;
var sec = 0;
var hr = 0;
timer = document.querySelector(".time");
var tim = false;
var moves = 0;
var matched = 0;
var shf = [];
var restartbutton = document.querySelector(".restart");
var cardsopened = [];
var movescontainer = document.querySelector(".moves");
var starscontainer = document.querySelector(".stars");
var congo = document.querySelector(".remodal");
var playa = document.querySelector(".remodal-play");
var cancela = document.querySelector(".remodal-cancel");
for (var i in iconslist) {
  symbols.push(iconslist[i].children[0].className);

}
init();
window.onclick = function(event) {
  if (event.target == congo) {
    congo.style.display = "none";
  }
}
//congratulations modal,displays when game is over
function congrat() {
  congo.style.display = "block";

  var crati = document.querySelector(".stars").innerHTML;
  var ctim = document.querySelector(".tim");

  ctim.innerHTML = timer.innerHTML;
  document.querySelector(".rati").innerHTML = crati;

} //Play-again method is wriiten for buttojn displayed on congratulations modal
function play_again() {
  if (matched == 16) {
    congo.style.display = "none";
    location.reload();

  }
}
//This method is onclick method for cancel button
function cancel() {
  congo.style.display = "none";

}
//init method is used to add event listener for cards
function init() {
  for (var j = 0; j < icons.length; j++) {

    icons[j].addEventListener("click", checkcard);
  }

}
//check card method is used to check whether two cards are matched or not
function checkcard() {
  this.classList.add('open', 'show', 'unable');
  cardsopened.push(this);

  if (tim == false) {
    tim = true;
    start();
  }


  presentcard = this;
  prevcard = cardsopened[0];
  if (cardsopened.length == 2) {
    addMove();
    if (prevcard.innerHTML == presentcard.innerHTML) {
      prevcard.classList.remove("open", 'show');
      prevcard.classList.add("match");

      presentcard.classList.remove("open", 'show');
      presentcard.classList.add("match");


      cardsopened = [];

      matched += 2;

      if (matched == 16) {
        congrat();
        clearInterval(iconslist);

      }
    } else {
      setTimeout(function() {
        prevcard.classList.remove("open", "show", "unable");
        presentcard.classList.remove("open", "show", "unable");
        cardsopened = [];
      }, 300);
    }
  }

}

//it restarts the game
restartbutton.addEventListener("click", function() {
  location.reload();

});

//to count the no of moves
function addMove() {
  moves++;
  movescontainer.innerHTML = moves;
  rating();

}
//to give rating
function rating() {

  if (moves <= 8) {
    starscontainer.children[0].childNodes[0].classList.replace('fa-star-o', 'fa-star');
    starscontainer.children[1].childNodes[0].classList.replace('fa-star-o', 'fa-star');
    starscontainer.children[2].childNodes[0].classList.replace('fa-star-o', 'fa-star');

  } else if (moves > 8 && moves < 12) {

    starscontainer.children[0].childNodes[0].classList.replace('fa-star-o', 'fa-star');
    starscontainer.children[1].childNodes[0].classList.replace('fa-star-o', 'fa-star');
    starscontainer.children[2].childNodes[0].classList.replace('fa-star', 'fa-star-o');

  } else if (moves >= 12 && moves <= 30) {
    starscontainer.children[0].childNodes[0].classList.replace('fa-star-o', 'fa-star');
    starscontainer.children[1].childNodes[0].classList.replace('fa-star', 'fa-star-o');
    starscontainer.children[2].childNodes[0].classList.replace('fa-star', 'fa-star-o');

  } else {

    starscontainer.children[0].childNodes[0].classList.replace('fa-star', 'fa-star-o');
    starscontainer.children[1].childNodes[0].classList.replace('fa-star', 'fa-star-o');
    starscontainer.children[2].childNodes[0].classList.replace('fa-star', 'fa-star-o');
  }



}
//to start the timer
function start() {
  iconslist = setInterval(function() {
    sec++;
    timer.innerHTML = hr + "hr " + min + "min " + sec + "sec";


    if (sec == 60) {
      min += 1;
      sec = 00;
    }
    if (min == 60) {
      hr += 1;
      min = 00;
    }
  }, 1000);
}


for (var il in iconslist) {

  shf.push(iconslist[il].children[0].className);
}
//to shuffle the cards
function shuffle(array) {
  console.log("shuffle is called");
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  for (var li in iconslist) {
    iconslist[li].children[0].className = array[li];
  }
  return array;
}
shuffle(shf);
