const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/svg_icons');
const outDir = path.join(__dirname, '../out/svg_icons');

fs.mkdirSync(outDir, { recursive: true });

fs.readdirSync(sourceDir).forEach(file => {
    const from = path.join(sourceDir, file);
    const to = path.join(outDir, file);
    fs.copyFileSync(from, to);
});
