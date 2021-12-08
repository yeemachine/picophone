<script context="module">
  import {writable} from 'svelte/store'
  export const mainText = writable('SHEEEESH')
  export const fonts = writable('bold')
</script>
<script>
  import AudioVisualizer,{recordedAudio,isPlaying} from './AudioVisualizer.svelte'
  import Speech,{recognition} from './Speech.svelte'
  let recording = false;
  
  const text2Array = () => {
    
  }
</script>
<container>
  <div class="modifier">
  <button class:playing={$isPlaying} on:click={()=>{
      isPlaying.set(true)
      recordedAudio.play()
    }}>
  <span class="material-icons">volume_up</span>
  </button>
     <input bind:value={$mainText} 
               data-length={$mainText.length} 
               maxlength='12'
               spellcheck="false"
               type="text"
              style="width:{$mainText.length>0 ? ($mainText.length) * 24 : 180}px"
              size={$mainText.length}
               placeholder='Your Text'
               />
  <button>
  <span class="material-icons">shuffle</span>
  </button>
  </div>
  <Speech recording={recording}/> 
  <AudioVisualizer recording={recording}/>
  <button class="record" class:recording={recording}
    on:pointerdown={(e)=>{
      recording = true
    }}
    on:pointerup={()=>{
      recording = false
    }}
    >
  </button>
</container>

<style>
  .record{
    width:56px;
    height:56px;
    border: 2px solid white;
    background:transparent;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    bottom:40px;
    -webkit-touch-callout: none !important; 
 -webkit-user-select: none !important;
  }
  
  .record:before{
    content:'';
    background:#F55088;
    border-radius:50px;
    width:44px;
    height:44px;
    transition:.2s;
  }
  .record:active{
    background:transparent;
  }
  .record.recording:before,.record:active:before{
    width:28px;
    height:28px;
    border-radius:4px;
  }
  container{
    height:250px;
    width:100%;
    display: flex;
    flex-direction: column;
    bottom: 0;
    align-items: center;
    
  }
  .modifier{
    margin:0 20px;
    max-width:calc(100vh - 290px);
    width:calc(100vw - 30px);
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: max-content;
    top:20px;
  }
  button{
    width:40px;
    height:40px;
    border-radius:50%;
    background:#434343;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    -webkit-user-select:none;
    -webkit-touch-callout: none;
  }
  button.playing,button:active{
    background:#646464;
  }
  button.playing:before{
    content:'';
    position:absolute;
    z-index:-2;
    width:44px;
    height:44px;
    border-radius:50%;
    background: rgb(0,209,255);
background: linear-gradient(36deg, rgba(0,209,255,1) 16%, rgba(121,255,231,1) 78%);
  }
  .material-icons{
    color:white;
  }
  input{
    font-size: 30px;
    background:none;
    color:white;
    text-transform: uppercase;
     margin: 24px 0 24px 0;
  border: none;
   border-radius:0;
  padding: 0;
    text-align:center;
    border-bottom: 1px solid transparent;
  }
  input:focus {
  outline: none;
  color: white;
    border-bottom: 1px solid white;
}
@media only screen and (max-width: 600px) {
  input {
    font-size: 25px;
  }
}
</style>