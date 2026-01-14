import fs from "fs";
import path from "path";

let modelInput = process.argv[2];

if (!modelInput || !modelInput.trim()) {
  console.error("Model name is required");
  process.exit(1);
}

modelInput = modelInput.trim();

const root = process.cwd();
const schemaPath = path.join(root, "prisma", "schema.prisma");

if (!fs.existsSync(schemaPath)) {
  console.error("prisma/schema.prisma not found");
  process.exit(1);
}

const toPascalCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const toSnakeCase = (str) =>
  str
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();

const modelName = toPascalCase(modelInput);
const tableName = toSnakeCase(modelInput);

let schemaContent = fs.readFileSync(schemaPath, "utf8").trimEnd();

const modelBlock = `
model ${modelName} {
  id         String    @id @default(cuid())

  createdAt  DateTime  @default(now())
  updatedAt  DateTime? @updatedAt

  @@map("${tableName}")
}
`;

schemaContent += "\n\n" + modelBlock.trimStart();

fs.writeFileSync(schemaPath, schemaContent + "\n");

console.log(`Model ${modelName} added to schema.prisma`);
