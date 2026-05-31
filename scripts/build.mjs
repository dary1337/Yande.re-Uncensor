import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import crx3 from "crx3";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const stage = join(dist, "yandere-uncencor");

const { version } = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));

rmSync(dist, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
for (const file of ["manifest.json", "main.js"]) {
  copyFileSync(join(root, file), join(stage, file));
}

// EXTENSION_KEY_PATH is provided by CI (key materialised from a secret);
// locally it falls back to the developer's key.
const keyPath = process.env.EXTENSION_KEY_PATH ?? join(root, "yandere-uncencor.pem");

await crx3([join(stage, "manifest.json")], {
  keyPath,
  crxPath: join(dist, "yandere-uncencor.crx"),
  zipPath: join(dist, "yandere-uncencor.zip"),
});

console.log(`Built v${version} -> dist/yandere-uncencor.{crx,zip}`);
