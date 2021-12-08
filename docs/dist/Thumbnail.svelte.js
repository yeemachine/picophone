import './Thumbnail.svelte.css.proxy.js';
/* src/Thumbnail.svelte generated by Svelte v3.44.2 */
import {
	SvelteComponent,
	attr,
	binding_callbacks,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../_snowpack/pkg/svelte/internal.js";

import * as PIXI from '../_snowpack/pkg/pixijs.js';
import { onMount } from '../_snowpack/pkg/svelte.js';

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "svelte-r84fdt");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[6](div);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[6](null);
		}
	};
}

let canvasSize = 1600;
let loaded = false;

function instance($$self, $$props, $$invalidate) {
	let { imageURL } = $$props;
	let { items = [] } = $$props;
	let { gridNum = 34 } = $$props;
	let gridWidth = canvasSize / gridNum;
	let canvasContainer;
	const sprites = {};

	const app = new PIXI.Application({
			width: canvasSize,
			height: canvasSize,
			resolution: window.devicePixelRatio || 2,
			backgroundAlpha: 0
		});

	const charList = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'flower',
		'sparkle',
		'music',
		'heart',
		'sunglasses',
		'~'
	];

	const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.

	charList.forEach(e => {
		if (e.length > 1) {
			loader.add(e + 'symbols', imageURL(e, 'symbols'));
		} else {
			loader.add(e + 'bold', imageURL(e, 'bold'));
			loader.add(e + 'jelly', imageURL(e, 'jelly'));
		}
	});

	const updatePosition = e => {
		if (!charList.includes(e.type)) {
			return;
		}

		if (!sprites[e.id]) {
			initSprite(e);
		}

		$$invalidate(4, sprites[e.id].position.x = e[34].x * gridWidth, sprites);
		$$invalidate(4, sprites[e.id].position.y = e[34].y * gridWidth, sprites);
	};

	const initSprite = e => {
		let resources = loader.resources;
		$$invalidate(4, sprites[e.id] = new PIXI.Sprite(resources[e.type + e.font].texture), sprites);
		$$invalidate(4, sprites[e.id].width = gridWidth * (e.type === "sunglasses" ? 16 : 8), sprites);
		$$invalidate(4, sprites[e.id].height = gridWidth * 8, sprites);
		updatePosition(e);
		app.stage.addChild(sprites[e.id]);
	};

	loader.load((loader, resources) => {
		items.forEach(e => {
			initSprite(e);
		});
	});

	onMount(() => {
		canvasContainer.appendChild(app.view);
	});

	let itemIDs = [];

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			canvasContainer = $$value;
			$$invalidate(0, canvasContainer);
		});
	}

	$$self.$$set = $$props => {
		if ('imageURL' in $$props) $$invalidate(1, imageURL = $$props.imageURL);
		if ('items' in $$props) $$invalidate(2, items = $$props.items);
		if ('gridNum' in $$props) $$invalidate(3, gridNum = $$props.gridNum);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*items, itemIDs, sprites*/ 52) {
			$: {
				$$invalidate(5, itemIDs = []);

				items.forEach(e => {
					itemIDs.push(e.id);
					updatePosition(e);
				});

				Object.keys(sprites).forEach(e => {
					if (!itemIDs.includes(e)) {
						sprites[e].destroy();
						delete sprites[e];
					}
				});
			}
		}
	};

	return [canvasContainer, imageURL, items, gridNum, sprites, itemIDs, div_binding];
}

class Thumbnail extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { imageURL: 1, items: 2, gridNum: 3 });
	}
}

export default Thumbnail;