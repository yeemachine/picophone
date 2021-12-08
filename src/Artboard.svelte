<style>
  container{
    --artboardColor: white;
    position: absolute;
    width: calc(100vw - 40px);
    height: calc(100vw - 40px);
    max-width: calc(100vh - 300px);
    max-height: calc(100vh - 300px);
  }
  svg{
    width:100%;
    height:100%;
    position:absolute;
  }
  
  .grid-item{
    background:transparent;
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img{
    position:relative;
    width:100%;
  }
  :global(.svlt-grid-shadow) {
    /* Back shadow */
    background: #00D1FF !important;
    z-index:-1;
    opacity:.2;
  }
   :global(.svlt-grid-item) {
    /* Back shadow */
    opacity:1 !important
  }
</style>

<container bind:clientWidth = {artboardW} bind:clientHeight = {artboardH}>
  <svg preserveAspectRatio="xMidYMid slice" id="svgArtboard" width="775" height="775" viewBox="-500 -500 1000 1000">
  <rect x="-500" y="-500" width="1000" height="1000" filter=" url(#pencilTexture5)" style="fill: var(--artboardColor); stroke-width: 1; stroke: black;opacity:1">
  </rect>
</svg>
  
  {#if artboardW > 0}
  
  <Grid bind:items={items} on:change={handleChange} throttleUpdate={100} fillSpace={false} rowHeight={artboardW/34} gap={[0, 0]} let:item let:dataItem {cols}>
    <div class=grid-item >
      <img id={dataItem.id} src="{imageURL(dataItem.type, dataItem.font)}"/>
    </div>
  </Grid>
  {/if}
  
</container>
  <Thumbnail items={items} imageURL={imageURL} sessionID={sessionID}/>


<script>
import Grid from "svelte-grid";
import Thumbnail from './Thumbnail.svelte';
import gridHelp from "svelte-grid/build/helper/index.mjs";
import {mainText} from './BottomNav.svelte'
let artboardW = 0, artboardH= 0 

let cached = null
mainText.subscribe(val=>{
  if(cached){
    let newItems = []
    var reg = /[^a-zA-Z~]+/g;
    let words = val.replace(reg,"").split(" ")
    let font = val.includes('GOOO') ? 'jelly' : 'bold'
    let letterCount = 0
    let rowCount = 0
    words.forEach((word,i)=>{
      let letters = word.split("")
      letters.forEach((letter,j)=>{
        let row = Math.floor(letterCount / 4)
        console.log(row)
        let newX = 1+Math.max((8*j)-(8*row*4),0)
        console.log(newX)
        newItems.push({
        34: gridHelp.item({ 
          x: newX,
          y: 3+10*row,
          w: 8,
          h: 8,
          resizable:false,
          draggable:true,
          fixed:false
        }),
        id: id(),
        type:letter.toUpperCase(),
        font:font,
      })
      letterCount+=1;
    })
    })
    items = newItems
    console.log(items)
  }
  cached=val
})

const id = () => "_" + Math.random().toString(36).substr(2, 9);
const imageURL = (e,font) => './fonts/'+font+'/' + e + '.png'
const handleChange = e => {
}
let sessionID = id();
let items = [
  {
    34: gridHelp.item({ 
      x: 1,
      y: 3,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'S',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 9,
      y: 3,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'H',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 17,
      y: 3,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'E',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 25,
      y: 3,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'E',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 1,
      y: 23,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'E',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 9,
      y: 23,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'E',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 17,
      y: 23,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'S',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 25,
      y: 23,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'H',
    font:'bold',
  },
  {
    34: gridHelp.item({ 
      x: 1,
      y: 13,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'heart',
    font:'symbols',
  },

  {
    34: gridHelp.item({
      x: 9,
      y: 13,
      w: 16,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'sunglasses',
    font:'symbols',
  },

  {
    34: gridHelp.item({
      x: 25,
      y: 13,
      w: 8,
      h: 8,
      resizable:false,
      draggable:true,
      fixed:false
    }),
    id: id(),
    type:'heart',
    font:'symbols',
  },
];

let cols = [
  [ 1200, 34 ],
];
  
</script>