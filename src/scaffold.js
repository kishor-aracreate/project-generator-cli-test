import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp({ projectName, framework }) {
  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "../templates", framework.toLowerCase());

  await fs.copy(templateDir, targetDir);


  const pkgPath = path.join(targetDir, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName; 
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  console.log(`✅ Project ${projectName} created using ${framework}!`);
  console.log(`👉 cd ${projectName} && npm install && npm start`);
}
