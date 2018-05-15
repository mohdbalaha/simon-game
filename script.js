window.onload = function () {
    let start = document.getElementById("start");
start.addEventListener("click", startStop);
let strict = document.getElementById("strict");

document.getElementById("onbtn").addEventListener("click", onOff);
var audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var audio4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let sounds = [audio1, audio2, audio3, audio4];
let stricts=false;
let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let yellow = document.getElementById("yellow");

let screen = document.getElementById("screen");

strict.addEventListener("click", function(){
  if(stricts){
    stricts=false;
  this.style.backgroundColor="yellow";     
  }else{
    stricts=true;
   this.style.backgroundColor="red";
  }  
});

let rnd = Math.floor(Math.random() * 4);
let colors = ["red", "blue", "green", "yellow"];
let colors1 = ["#A30A1C", "#054B8A", "#00A756", "#CDA636"];
let colors2 = ["#FF4950", "#128EF8", "#00FF8C", "#FFD85C"];
let pattern = [];
let input = [];
let number = 1;
let interval = 0;
let startVar = false;
let myVar;

let on = false;
function onOff() {
  if (on) {
    on = false;
    document.getElementById("onbtn").style.position = "relative";
    document.getElementById("onbtn").style.left = "0px";
    screen.value = "";
    reset();
    start.setAttribute("disabled", true);
    strict.setAttribute("disabled", true);
    red.setAttribute("disabled", true);
    blue.setAttribute("disabled", true);
    green.setAttribute("disabled", true);
    yellow.setAttribute("disabled", true);
  } else {
    on = true;
    document.getElementById("onbtn").style.position = "relative";
    document.getElementById("onbtn").style.left = "30px";
    screen.value = "--";
    start.removeAttribute("disabled");
    strict.removeAttribute("disabled");
  }
}
for (let i = 0; i < colors.length; i++) {
  document.getElementById(colors[i]).addEventListener("click", function() {
    input.push(colors[i]);
    sounds[i].play();
  });
}

function startStop() {
  if (startVar) {
    screen.value = "--";
    reset();
  } else {
    startVar = true;
    pattern.push(colors[Math.floor(Math.random() * 4)]);
    myVar = setTimeout(function() {
      screen.value = "--";
    }, 500);
    myVar = setTimeout(function() {
      screen.value = " ";
    }, 1000);
    myVar = setTimeout(function() {
      screen.value = "--";
    }, 1500);
    myVar = setTimeout(function() {
      screen.value = " ";
    }, 2000);
    myVar = setTimeout(startGame, 2500);
  }
}

function startGame() {
  if (number < 21&&!stricts) {
    interval = 0;
    screen.value = number;
    for (let i = 0; i < pattern.length; i++) {
      interval += 500;
      myVar = setTimeout(function() {
        sounds[colors.indexOf(pattern[i])].play();
        document.getElementById(pattern[i]).value = "";
        document.getElementById(pattern[i]).style.backgroundColor =
          colors2[colors.indexOf(pattern[i])];
      }, interval);
      interval += 500;
      myVar = setTimeout(function() {
        document.getElementById(pattern[i]).style.backgroundColor =
          colors1[colors.indexOf(pattern[i])];
      }, interval);
      myVar = setTimeout(function() {
        red.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        green.removeAttribute("disabled");
        yellow.removeAttribute("disabled");
        input = [];
      }, interval);
    }
    interval += number * 1500;
    myVar = setTimeout(function() {
      red.setAttribute("disabled", true);
      blue.setAttribute("disabled", true);
      green.setAttribute("disabled", true);
      yellow.setAttribute("disabled", true);
      if (compare(input, pattern)) {
        number++;
        pattern.push(colors[Math.floor(Math.random() * 4)]);
        startGame();
      } else {
        myVar = setTimeout(function() {
          screen.value = "!!";
        }, 500);
        myVar = setTimeout(function() {
          screen.value = " ";
        }, 1000);
        myVar = setTimeout(function() {
          screen.value = "!!";
        }, 1500);
        myVar = setTimeout(function() {
          screen.value = " ";
        }, 2000);
        myVar = setTimeout(startGame, 2500);
      }
    }, interval);
    }else if(stricts) {
                reset();
    screen.value = "--";
      myVar = setTimeout(startStop,2500);
      
            }else {
    reset();
    screen.value = "V";
    myVar = setTimeout(startStop,2500);
  }
}

function reset() {
  pattern = [];
  input = [];
  number = 1;
  interval = 0;
  startVar = false;
  myVar;
  on = false;
  stricts=false;
document.getElementById("strict").style.backgroundColor = "yellow";
  clearTimeout(myVar);
  for (let i = 0; i < colors.length; i++) {
    document.getElementById(colors[i]).style.backgroundColor = colors1[i];
  }
}

function compare(arr1, arr2) {
  if (arr1.length === arr2.length) {
    return arr1.every(function(item, x) {
      return item === arr2[x];
    });
  } else {
    return false;
  }
}


}