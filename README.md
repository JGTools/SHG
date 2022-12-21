# SHG

[![npm](https://img.shields.io/npm/v/@jgtools/shg)](https://www.npmjs.com/package/@jgtools/shg)
[![npm](https://img.shields.io/npm/dm/@jgtools/shg)](https://www.npmjs.com/package/@jgtools/shg)
[![GitHub](https://img.shields.io/github/license/jgtools/shg)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

2D Spatial Hash Grid

## Features

- :heavy_check_mark: Elements are stored on a 2D grid
- :heavy_check_mark: Filter nearby elements
- :blue_square: Written in TypeScript

## Installation

### Using npm

```bash
npm i @jgtools/shg
```

```javascript
import SHG from "@jgtools/shg";
// ...
```

### Using cdn

```html
<script type="module">
    import SHG from "https://cdn.jsdelivr.net/npm/@jgtools/shg@1.0.1/dist/index.min.js";
    // ...
</script>
```

## Usage

```javascript
import SHG from "@jgtools/shg";

const width = 100;
const height = 60;
const cellSize = 10;
const shg = new SHG(width, height, cellSize);

for (let i = 0; i < 10; i++) {
  const [x, y] = [Math.random() * width, Math.random() * height];
  shg.set(i.toString(), x, y);
}

console.log(shg.query(40, 30, 10));
shg.update("1", 40, 30); // update item '1' position
console.log(shg.query(40, 30, 10));
shg.delete("1"); // delete item '1'
console.log(shg.query(40, 30, 10));
```

## License

MIT
