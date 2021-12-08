
<script context="module">
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  export var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1): str;
  };
</script>
<script>
import {mainText} from './BottomNav.svelte'
export let recording = false
// new speech recognition object
  
  if(!matchMedia('(pointer:fine)').matches){
    //recognition doesn't work well when other mediastreams are involved on mobile browsers
    //move to separate action for mobile
    // document.body.onclick = function() {
    //     recognition.start();
    // }
  }
  
  // recognition.continuous = true;
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
  recognition.on = true
  console.log("We are listening. Try speaking into the microphone.");
};
  
recognition.onend = function() {
  recognition.on = false
  console.log('Thank you for recording.')
}
  


recognition.onspeechend = function() {
    // when user is done speaking
  console.log(recognition)
    recognition.stop();
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    var transcript = event.results[event.results.length-1][0].transcript.toUpperCase();
    var confidence = event.results[event.results.length-1][0].confidence;
    console.log(event)
    if(confidence > .6){
      let truncated = transcript
      switch (true)  {  // sourceStr
        case (/LET'S GO/i.test(transcript)):
            console.log('Case 1');
            truncated = "LETS GOOOOO~~"
            break;

        case (/SHEESH/i.test(transcript)):
          console.log('Case 2');
          truncated = "SHEEEESH"
          break;

        default:
          if(transcript.length>12){
          truncated = truncate(transcript,12)
          }
      };
      mainText.set(truncated)
    }
};
  
$:{
  if(recording){
    if(!recognition.on){
      recognition.start();
    }
  }else{
    recognition.stop();
  }
}
</script>