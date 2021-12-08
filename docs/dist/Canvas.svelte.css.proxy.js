// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "container.svelte-1ul8ke5{width:100vw;flex:1;top:0;left:0;display:flex;align-items:center;justify-content:center;border-bottom-left-radius:40px;border-bottom-right-radius:40px;overflow:hidden;position:relative}svg.svelte-1ul8ke5{width:100%;height:100%;background:#4c4646}.thumb.svelte-1ul8ke5{width:32px;height:4px;background:#CDCCC4;position:absolute;bottom:8px;border-radius:8px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}