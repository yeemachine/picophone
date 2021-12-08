// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-1h45d87{flex-direction:column;position:fixed;margin:0;padding:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:flex;justify-content:center;align-items:center}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}