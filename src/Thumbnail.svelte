<script>
  import * as PIXI from 'pixi.js';
  import { onMount } from 'svelte';
  export let imageURL;
  export let items = []
  export let gridNum = 34
  let canvasSize = 1600
  let gridWidth = canvasSize/gridNum
  let canvasContainer;
  let loaded = false;
  const sprites = {};
  const app = new PIXI.Application({
        width: canvasSize, height: canvasSize, resolution: window.devicePixelRatio || 2,backgroundAlpha:0
  });
  const charList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','flower','sparkle','music','heart','sunglasses','~']
  const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
  charList.forEach(e=>{
    if(e.length>1){
      loader.add(e+'symbols', imageURL(e,'symbols'))
    }else{
      loader.add(e+'bold', imageURL(e,'bold'))
      loader.add(e+'jelly', imageURL(e,'jelly'))
    }
    
  })
  
  const updatePosition = (e) => {
    if(!charList.includes(e.type)){
      return
    }
    if(!sprites[e.id]){
      initSprite(e)
    }
    sprites[e.id].position.x = e[34].x * gridWidth
    sprites[e.id].position.y = e[34].y * gridWidth
  }
  
  const initSprite = e => {
    let resources = loader.resources
    sprites[e.id] = new PIXI.Sprite(resources[e.type+e.font].texture);
    sprites[e.id].width = gridWidth * (e.type==="sunglasses" ? 16 : 8 )
    sprites[e.id].height = gridWidth * 8
    updatePosition(e)
    app.stage.addChild(sprites[e.id]);
  }
  
  loader.load((loader, resources) => {
    items.forEach(e=>{
      initSprite(e)
    })
  });
  
	onMount(() => {
    canvasContainer.appendChild(app.view);
	});
  
  let itemIDs = []
  $:{
    itemIDs = []
    items.forEach(e=>{
      itemIDs.push(e.id)
      updatePosition(e)
    })
    Object.keys(sprites).forEach(e=>{
      if(!itemIDs.includes(e)){
        sprites[e].destroy()
        delete sprites[e]
      }
    })
  }

</script>

<div bind:this={canvasContainer}></div>

<style>
  :global(canvas){
    width:100%;
  }
  div{
    position:absolute;
    top:20px;
    left:20px;
    width:40px;
    height:40px;
  }
</style>