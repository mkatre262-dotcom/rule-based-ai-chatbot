
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Enter key support
input.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});

// Send Message
function sendMessage(){

    let message = input.value.trim();

    if(message==="") return;

    addMessage(message,"user");

    input.value="";

    showTyping();

    fetch("/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    })

    .then(response=>response.json())

    .then(data=>{

        removeTyping();

        addMessage(data.reply,"bot");

    })

    .catch(error=>{

        removeTyping();

        addMessage("⚠ Server Error","bot");

    });

}

// Add Message

function addMessage(message,sender){

let div=document.createElement("div");

div.className="message "+sender;
if(sender === "bot" && message.startsWith("STOPWATCH:")){

    let seconds = parseInt(message.split(":")[1]);

    div.innerHTML = `
    <div class="avatar">🤖</div>
    <div class="text">
        <h3>⏱ Stopwatch</h3>
        <h2 id="timer">${seconds}</h2>
        <p>Seconds Remaining...</p>
    </div>
    `;

    chatBox.appendChild(div);

    scrollBottom();

    let timer = setInterval(function(){

        seconds--;

        document.getElementById("timer").innerHTML = seconds;

        if(seconds <= 0){

            clearInterval(timer);

            document.getElementById("timer").innerHTML = "✅ Time Over!";

        }

    },1000);

    return;
}

if(sender==="user"){

div.innerHTML=`

<div class="text">${message}</div>

<div class="avatar">👤</div>

`;

}

else{

div.innerHTML=`

<div class="avatar">🤖</div>

<div class="text">${message}</div>

`;

}

chatBox.appendChild(div);

scrollBottom();

}

// Auto Scroll

function scrollBottom(){

chatBox.scrollTop=chatBox.scrollHeight;

}

// Typing Animation

function showTyping(){

let typing=document.createElement("div");

typing.className="message bot";

typing.id="typing";

typing.innerHTML=`

<div class="avatar">🤖</div>

<div class="typing">

<span></span>

<span></span>

<span></span>

</div>

`;

chatBox.appendChild(typing);

scrollBottom();

}

function removeTyping(){

let typing=document.getElementById("typing");

if(typing){

typing.remove();

}

}
// ============================
// 🌙 Dark Mode
// ============================

function toggleTheme(){

    document.body.classList.toggle("dark");

}


// ============================
// 🎤 Voice Input
// ============================

function startVoice(){

if(!('webkitSpeechRecognition' in window)){

alert("Voice Recognition is not supported in this browser.");

return;

}

const recognition=new webkitSpeechRecognition();

recognition.lang="en-IN";

recognition.interimResults=false;

recognition.maxAlternatives=1;

recognition.start();

recognition.onresult=function(event){

const text=event.results[0][0].transcript;

input.value=text;

sendMessage();

};

recognition.onerror=function(){

alert("Voice Recognition Failed.");

};

}


// ============================
// 🗑 Clear Chat
// ============================

function clearChat(){

chatBox.innerHTML=`

<div class="message bot">

<div class="avatar">🤖</div>

<div class="text">

<h3>Chat Cleared ✅</h3>

<p>Hello! How can I help you today?</p>

</div>

</div>

`;

}


// ============================
// ⚡ Quick Buttons
// ============================

function quickMessage(text){

input.value=text;

sendMessage();

}


// ============================
// 👋 Welcome Animation
// ============================

window.onload=function(){

setTimeout(()=>{

addMessage("👋 Welcome to Rule Based AI Chat Assistant.","bot");

},500);

};
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;

function updateDisplay(){

    let h = String(hours).padStart(2,"0");
    let m = String(minutes).padStart(2,"0");
    let s = String(seconds).padStart(2,"0");

    document.getElementById("display").innerHTML =
    h + ":" + m + ":" + s;
}

function startStopwatch(){

    if(timer != null) return;

    timer = setInterval(function(){

        seconds++;

        if(seconds == 60){
            seconds = 0;
            minutes++;
        }

        if(minutes == 60){
            minutes = 0;
            hours++;
        }

        updateDisplay();

    },1000);
}

function stopStopwatch(){

    clearInterval(timer);
    timer = null;

}

function resetStopwatch(){

    clearInterval(timer);
    timer = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();

}

// function toggleStopwatch(){

// let popup=document.getElementById("stopwatch-popup");

// if(popup.style.display=="flex"){

// popup.style.display="none";

// }else{

// popup.style.display="flex";

// }
function toggleStopwatch() {
    const popup = document.getElementById("stopwatch-popup");

    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}
// }
