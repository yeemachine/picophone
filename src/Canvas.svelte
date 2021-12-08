<script>
  import Artboard from './Artboard.svelte'
</script>
<container>

<svg preserveAspectRatio="xMidYMid slice" id="svg" width="775" height="775" viewBox="-500 -500 1000 1000">
  <rect x="-500" y="-500" width="1000" height="1000" filter="url(#roughPaper) url(#pencilTexture5)" style="fill: #b5b5b5; stroke-width: 0; stroke: none;">
  </rect>
  <defs>
     <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="roughPaper">
      <feTurbulence type="fractalNoise" baseFrequency="128" numOctaves="1" result="noise">
      </feTurbulence>
      <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1" result="diffLight">
	<feDistantLight azimuth="45" elevation="55">
	</feDistantLight>
      </feDiffuseLighting>
      <feGaussianBlur in="diffLight" stdDeviation="0.75" result="dlblur">
      </feGaussianBlur>
      <feComposite operator="arithmetic" k1="1.2" k2="0" k3="0" k4="0" in="dlblur" in2="SourceGraphic" result="out">
      </feComposite>
    </filter>
    <filter x="-2%" y="-2%" width="104%" height="104%" filterUnits="objectBoundingBox" id="PencilTexture">
      <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" result="newSource">
      </feDisplacementMap>
    </filter>
    <filter x="-2%" y="-2%" width="104%" height="104%" filterUnits="objectBoundingBox" id="PencilTexture">
      <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" result="newSource">
      </feDisplacementMap>
    </filter>
    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture2">
      <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="f1">
      </feTurbulence>
      <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
      </feColorMatrix>
      <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3">
      </feComposite>
    </filter>
    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture3">
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1">
      </feTurbulence>
      <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
      </feColorMatrix>
      <feComposite operator="in" in2="f2b" in="SourceGraphic" result="f3">
      </feComposite>
      <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="2.5" in="f3" result="f4">
      </feDisplacementMap>
    </filter>
    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture4">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f1" result="f4">
      </feDisplacementMap>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f2" result="f5">
      </feDisplacementMap>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="f3" result="f6">
      </feDisplacementMap>
      <feBlend mode="multiply" in2="f4" in="f5" result="out1">
      </feBlend>
      <feBlend mode="multiply" in="out1" in2="f6" result="out2">
      </feBlend>
    </filter>
    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture5">
      <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="t1">
      </feTurbulence>
      <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="t2">
      </feColorMatrix>
      <feComposite operator="in" in2="t2" in="SourceGraphic" result="SourceTextured">
      </feComposite>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f1" result="f4">
      </feDisplacementMap>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f2" result="f5">
      </feDisplacementMap>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">
      </feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceTextured" in2="f3" result="f6">
      </feDisplacementMap>
      <feBlend mode="multiply" in2="f4" in="f5" result="out1">
      </feBlend>
      <feBlend mode="multiply" in="out1" in2="f6" result="out2">
      </feBlend>
    </filter>
  </defs>
</svg>
  
  <Artboard/>
  <div class="thumb">
    
  </div>
</container>

<style>
  container{
    width:100vw;
/*     height:calc(100vh - 250px); */
    flex:1;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    border-bottom-left-radius:40px;
    border-bottom-right-radius:40px;
    overflow:hidden;
    position:relative;
/*     position: absolute; */
  }
  svg{
    width: 100%;
    height: 100%;
    background: #4c4646;
  }
  .thumb{
    width:32px;
    height:4px;
    background:#CDCCC4;
    position:absolute;
    bottom:8px;
    border-radius:8px;
    
  }
</style>
