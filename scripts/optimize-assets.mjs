// Builds web-ready copies of the supplied company assets.
// Originals in ./logo and ./image are only READ, never modified.
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = (...p) => path.join(root, ...p);
const out = (...p) => path.join(root, "public", "images", ...p);

await mkdir(out("real"), { recursive: true });
await mkdir(out("brand"), { recursive: true });

// Licence plates are blurred in the web copies only. Boxes are [left, top, width, height] in source pixels.
const photos = [
  { file: "WhatsApp Image 2026-11-10 at 22.50.57.jpeg", name: "parking-tensile-fabric-grey" },
  { file: "WhatsApp Image 2026-11-10 at 22.51.20.jpeg", name: "carport-laser-cut-white", crop: { left: 0, top: 22, width: 1055, height: 1054 } },
  {
    file: "WhatsApp Image 2026-11-10 at 22.51.57.jpeg",
    name: "parking-cream-canopies",
    blur: [
      [488, 628, 66, 34],
      [1040, 728, 128, 50],
      [196, 664, 38, 38],
      [44, 640, 34, 30],
    ],
  },
  {
    file: "WhatsApp Image 2026-11-10 at 22.51.58.jpeg",
    name: "parking-barrel-vault",
    blur: [
      [922, 1060, 60, 56],
      [1340, 1000, 48, 36],
    ],
  },
  { file: "WhatsApp Image 2026-11-10 at 22.51.57 (1).jpeg", name: "pergola-led-dusk" },
  { file: "WhatsApp Image 2026-11-10 at 23.22.24.jpeg", name: "door-charcoal-double" },
];

for (const p of photos) {
  let img = sharp(src("image", p.file));
  if (p.crop) img = img.extract(p.crop);
  let buf = await img.toBuffer();
  if (p.blur?.length) {
    const overlays = [];
    for (const [left, top, width, height] of p.blur) {
      const patch = await sharp(buf)
        .extract({ left, top, width, height })
        .blur(14)
        .toBuffer();
      overlays.push({ input: patch, left, top });
    }
    buf = await sharp(buf).composite(overlays).toBuffer();
  }
  const meta = await sharp(buf).metadata();
  const width = Math.min(meta.width ?? 1600, 1800);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out("real", `${p.name}.webp`));
  console.log("real:", p.name, `${width}px`, p.blur ? `(blurred ${p.blur.length})` : "");
}

// Brand: logo copied byte-for-byte; favicon = square crop of the symbol only.
await copyFile(src("logo", "logo.png"), out("brand", "logo.png"));
// Square crop centred on the symbol (excludes the vertical divider), padded with the logo's own background.
const icon = sharp(
  await sharp(src("logo", "logo.png"))
    .extract({ left: 1228, top: 21, width: 604, height: 604 })
    .extend({ top: 44, bottom: 44, left: 44, right: 44, background: { r: 7, g: 7, b: 6, alpha: 1 } })
    .toBuffer(),
);
await icon.clone().resize(512, 512).png().toFile(path.join(root, "src", "app", "icon.png"));
await icon.clone().resize(180, 180).png().toFile(path.join(root, "src", "app", "apple-icon.png"));
console.log("brand: logo copied, icon + apple-icon written");
