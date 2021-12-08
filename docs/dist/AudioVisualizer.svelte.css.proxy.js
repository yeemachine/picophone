// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "main.svelte-lzo2pz{position:absolute;bottom:130px;display:flex;justify-content:center;align-items:center;transition:.2s opacity}main.hide.svelte-lzo2pz{transition:0s opacity;opacity:0}main > div{display:inline-block;width:3px;height:30px;margin:0 3px;background:#F55088;transform:scaleY(0.1);opacity:1}p.svelte-lzo2pz{color:white;position:absolute;bottom:120px;font-weight:300;transition:.2s opacity .5s;-webkit-touch-callout:none !important;-webkit-user-select:none !important}p.hide.svelte-lzo2pz{opacity:0;transition:0s opacity}figure.svelte-lzo2pz{display:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}