<script context='module'>
  import {writable} from 'svelte/store'
  export const isPlaying = writable(false);
  export let Stream;
  export let a;
  export let recordedAudio = new Audio('https://cdn.glitch.me/801e15d5-563e-4c13-b86e-ec502b575d48%2Fsheesh.m4a?v=1638857553656')
  recordedAudio.onended = () => {isPlaying.set(false)}
  
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };
  
</script>
<script>
import {onMount} from 'svelte'
export let recording = false;
let loaded = false;
  
class AudioVisualizer {
  constructor( audioContext, processFrame, processError ) {
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind( this );
    navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( this.connectStream )
      .catch( ( error ) => {
        if ( processError ) {
          processError( error );
        }
      } );
  }

  connectStream( stream ) {
    Stream = stream
    if(!this.analyser){
    this.analyser = this.audioContext.createAnalyser();
    }
    this.source = this.audioContext.createMediaStreamSource( stream );
    this.source.connect( this.analyser );
    this.recorder = new MediaRecorder(stream);
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.fftSize = 128;
    if(!this.loop){
      this.initRenderLoop( this.analyser );
    }
    this.record()
  }
  
  reconnect(){
    navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( this.connectStream )
      .catch( ( error ) => {
        if ( processError ) {
          processError( error );
        }
      } );
  }
  
  record(){
    this.chunks = []
    this.recorder.addEventListener('dataavailable', e => {
      this.chunks.push(e.data)
    })
    this.recorder.addEventListener('stop', e => {
      let blob = new Blob(this.chunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
      let url = URL.createObjectURL(blob)
      recordedAudio = new Audio(url);
      recordedAudio.onended = () => {isPlaying.set(false)}
      setTimeout(()=>{
        // window.URL.revokeObjectURL(url); need to revoke url to manage memeory
        this.chunks.length = 0
      },100)

    })
    this.recorder.start()
  }
  
  stopRecord(){
    this.recorder.stop()
  }

  initRenderLoop() {
    this.loop = true
    const frequencyData = new Uint8Array( this.analyser.frequencyBinCount );
    const processFrame = this.processFrame || ( () => {} );

    const renderFrame = () => {
      this.analyser.getByteFrequencyData( frequencyData );
      processFrame( frequencyData );

      requestAnimationFrame( renderFrame );
    };
    requestAnimationFrame( renderFrame );
  }
}
  
  const init = () => {
    // Creating initial DOM elements
    const audioContext = new AudioContext();
    const initDOM = () => {
      visualMainElement.innerHTML = '';
      createDOMElements();
    };
    initDOM();

    // Swapping values around for a better visual effect
    const dataMap = { 
      0: 29, 
      1: 27, 
      2: 25, 
      3: 23,
      4: 21, 
      5: 19, 
      6: 17, 
      7: 15, 
      8: 13, 
      9: 11, 
      10: 9, 
      11: 7, 
      12: 5, 
      13: 3, 
      14: 1, 
      15: 0, 
      16: 2, 
      17: 4, 
      18: 6, 
      19: 8, 
      20: 10, 
      21: 12, 
      22: 14, 
      23: 16, 
      24: 18, 
      25: 20, 
      26: 22, 
      27: 24, 
      28: 26, 
      29 : 28, 
      30: 30, 
      31: 31, 
    };
    const processFrame = ( data ) => {
      const values = Object.values( data );
      let i;
      for ( i = 0; i < visualValueCount; ++i ) {
        const value = values[ dataMap[ i ] ] / 255;
        const elmStyles = visualElements[ i ].style;
        elmStyles.transform = `scaleY( ${ Math.max(value,.1) } )`;
        // elmStyles.opacity = Math.max( .25, value );
      }
    };

    const processError = (error) => {
      console.error(error)
      visualMainElement.classList.add( 'error' );
      visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
    }

    a = new AudioVisualizer( audioContext, processFrame, processError );
  };
  
  let visualMainElement;
    const visualValueCount = 32;
  let visualElements;
  const createDOMElements = () => {
    let i;
    for ( i = 0; i < visualValueCount; ++i ) {
      const elm = document.createElement( 'div' );
      visualMainElement.appendChild( elm );
    }

    visualElements = document.querySelectorAll( 'main div' );
  };

onMount(()=>{
  visualMainElement = document.querySelector( 'main' );

  createDOMElements();


})

$:{
  if(recording && !loaded && !isMobile.any()){
    init()
  }
}
  
$:{
  if(a && Stream){
    if(recording){
      if(!Stream){
        a.reconnect()
      }
    }else{
      if(Stream){
        a.stopRecord()
        Stream.getTracks().forEach(track => track.stop())
        Stream = null
      }
    }
  }
}
</script>

<main class:hide={!recording}></main>
<p class:hide={recording}>
  Tap and hold to record your voice
</p>

<figure>
    <figcaption>Listen to the T-Rex:</figcaption>
    <audio
        controls
        src="">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>

<style>

main {
  position: absolute;
  bottom:130px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:.2s opacity;
}
  main.hide{
    transition:0s opacity;
    opacity:0;
  }
:global(main > div) {
  display: inline-block;
  width: 3px;
  height: 30px;
  margin: 0 3px;
  background: #F55088;
  transform: scaleY(0.1);
  opacity: 1;
}
  p{
    color:white;
    position:absolute;
    bottom:120px;
    font-weight:300;
    transition:.2s opacity .5s;
    -webkit-touch-callout: none !important; 
-webkit-user-select: none !important;
  }
  p.hide{
    opacity:0;
    transition:0s opacity;
  }
  .error{
    color:#F55088;
  }
  figure{
    display:none;
  }
</style>