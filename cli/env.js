import fs from "fs";
import path from "path";

const root = process.cwd();
const envPath = path.join(root, ".env");
const examplePath = path.join(root, ".env.example");

if (!fs.existsSync(envPath)) {
  console.error(".env file not found in project root");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");

const result = envContent
  .split("\n")
  .map((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) return line;

    const idx = line.indexOf("=");
    if (idx === -1) return line;

    const key = line.slice(0, idx);
    return `${key}=""`;
  })
  .join("\n");

fs.writeFileSync(examplePath, result);

console.log(".env.example generated");
