const errorMessage = document.querySelector('.no-supported-browser')

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    errorMessage.style.display = 'block'
  }


  
var noteTextarea = document.querySelector('textarea');
var instructions = document.querySelector('.instructions');
//var notesList = $('ul#notes');

var noteContent = '';

  recognition.onstart = function() { 
    instructions.innerHTML =  'Voice recognition activated. Try speaking into the microphone.';
  }
  
  recognition.onspeechend = function() {
    instructions.innerHTML = 'You were quiet for a while so voice recognition turned itself off.';
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.innerHTML = 'No speech was detected. Try again.';  
    };
  }

  recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    noteContent += transcript;
   
    noteTextarea.style.color = '#000'
    noteTextarea.innerHTML = transcript;
    
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        noteContent += transcript;
        noteTextarea.style.color = '#000'
        noteTextarea.innerHTML = transcript;
}
  }

const startBtn = document.querySelector('#start-btn')
const stopBtn = document.querySelector('#stop-btn')

startBtn.addEventListener('click', function(e) {
    recognition.start();
  });

  stopBtn.addEventListener('click', function(e) {
    recognition.stop();
  });
//Here is the entire code needed to read out a string.
  function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();
  
    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
  }