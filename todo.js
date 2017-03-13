var chore = [ "do History ", "do Science ", "do Math ", "do Spelling", "do Grammar", "do Reading",  "do Writing" ];
var choreList = [];
console.log(chore.length);

function rollDice(){
	var die1 = document.getElementById("die1");
	var die2 = document.getElementById("die2");
	var status = document.getElementById("status");
				
	var d1 = Math.floor(Math.random()*(chore.length/2)) +1;
	var d2 = Math.floor(Math.random()*(chore.length/2)) +1;
			
	var diceTotal = d1+d2;
						
	die1.innerHTML = d1;
	die2.innerHTML = d2;
	if (chore.length > 0) {
	status.innerHTML = "You rolled "+diceTotal+". You get to "+chore[diceTotal-2]+".";
	} else {
	status.innerHTML = "You are all done today! Great job!"
	}
				
	choreList = chore.splice(diceTotal-2, 1);
	console.log(chore.length);
}

//Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i=0; i<myNodelist.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	myNodelist[i].appendChild(span);
}

//Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i=0; i < close.length; i++) {
	close[i].onclick = function() {
		var div = this.parentElement;
		div.style.display = "none";
	}
}

//Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);

function newElement() {
	var li = document.createElement("li");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
		chore.push(inputValue);
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	for (i=0; i<close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
			
		}
	}
}
	
$(document).ready(function() {
  var buzzer = $("#buzzer")[0];
  var buzzer = document.createElement('audio');
  buzzer.setAttribute('src', 'buzzer.mp3');

  var count = parseInt($("#num").html());
  var breakCount = parseInt($("#breakNum").html());
  
  $("#reset").hide();
  
$("#start").click(function(){
  var counter = setInterval(timer, 1000);
  count *= 60;
  breakCount *= 60;
  
  function timer(){
    $("#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #title1, #title2").hide();
    $("#timeType").show();
    $("#timeType").html("Session Time: ");
    count-=1;
    
    if(count===0){
      buzzer.play();
      clearInterval(counter);
      var startBreak=setInterval(breakTimer, 1000);
      $("#num").hide();
    }
    
    if(count%60>=10) {
       $("#num").html(Math.floor(count/60)+":"+count%60);
       }
       else {
       $("#num").html(Math.floor(count/60)+":"+"0"+count%60);
       }
    
  
    function breakTimer(){
    $("#timeType").html("Break Time: ");
    $("#breakNum, #timeType").show();
     
    breakCount -=1;
    if (breakCount ===0){
      buzzer.play();
      clearInterval(startBreak);
      $("#reset").show();
      $("#timeType, #breakNum").hide();
    }
    if(breakCount%60>=10) {
       $("#breakNum").html(Math.floor(breakCount/60)+":"+breakCount%60);
       }
    else {
       $("#breakNum").html(Math.floor(breakCount/60)+":"+"0"+breakCount%60);
       }      
    }
    }
});
  
  $("#reset").click(function(){
    count=5;
    breakCount=5;
    $("#num").html(count);
    $("#breakNum").html(breakCount);
    $("#reset").hide();
    $("#start, #num, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #title1, #title2").show();
  })

  $("#minus5Clock").click(function() {
    if (count > 1) {
      count -= 1;
      $("#num").html(count);
    }
  })

  $("#add5Clock").click(function() {
    count += 1;
    $("#num").html(count);
  })
  $("#minus5Break").click(function() {
    if (breakCount > 1) {
      breakCount -= 1;
      $("#breakNum").html(breakCount);
    }
  })

  $("#add5Break").click(function() {
    breakCount += 1;
    $("#breakNum").html(breakCount);
  })
  
})