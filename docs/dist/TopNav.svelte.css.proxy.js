// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "nav.svelte-m6be0{position:absolute;top:20px;right:20px;display:flex;z-index:1}button.svelte-m6be0{width:40px;height:40px;border-radius:50%;margin-left:8px}.material-icons.svelte-m6be0{color:white}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}