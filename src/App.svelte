<script>
  import Canvas from './Canvas.svelte'
  import BottomNav from './BottomNav.svelte'
  import TopNav from './TopNav.svelte'
</script>

<TopNav/>

<div>
<Canvas/>

<BottomNav/>
</div>

<style>
  div{
    flex-direction:column;
       position: fixed;
    margin: 0;
    padding:0;
    top: 0;
left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
    display:flex;
    justify-content:center;
    align-items:center;
  }
</style>