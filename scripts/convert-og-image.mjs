import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../public/og-image.svg');
const pngPath = join(__dirname, '../public/og-image.png');

const svgBuffer = readFileSync(svgPath);

await sharp(svgBuffer, { density: 150 })
  .resize(1200, 630)
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(pngPath);

console.log('OG image converted to PNG successfully:', pngPath);
