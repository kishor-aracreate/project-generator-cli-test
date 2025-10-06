import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp(answers) {
  const { projectName, projectType, frontendFramework, backendFramework } = answers;
  const targetDir = path.join(process.cwd(), projectName);

  try {
    if (projectType === "Frontend") {
      // Frontend only
      const templateDir = path.join(__dirname, "../templates/frontend", frontendFramework.toLowerCase());
      await fs.copy(templateDir, targetDir);

      // Update package.json
      const pkgPath = path.join(targetDir, "package.json");
      if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = projectName;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }

    } else if (projectType === "Backend") {
      // Backend only
      const templateDir = path.join(__dirname, "../templates/backend", backendFramework.toLowerCase());
      await fs.copy(templateDir, targetDir);

      // Update package.json
      const pkgPath = path.join(targetDir, "package.json");
      if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = projectName;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }

    } else if (projectType === "Full Stack") {
      // Fullstack: copy frontend
      const frontendDir = path.join(__dirname, "../templates/frontend", frontendFramework.toLowerCase());
      await fs.copy(frontendDir, targetDir);

      // Copy backend into subfolder 'backend'
      const backendDir = path.join(__dirname, "../templates/backend", backendFramework.toLowerCase());
      const backendTarget = path.join(targetDir, "backend");
      await fs.copy(backendDir, backendTarget);

      // Update frontend package.json
      const frontendPkgPath = path.join(targetDir, "package.json");
      if (await fs.pathExists(frontendPkgPath)) {
        const pkg = await fs.readJson(frontendPkgPath);
        pkg.name = projectName;
        await fs.writeJson(frontendPkgPath, pkg, { spaces: 2 });
      }

      // Update backend package.json
      const backendPkgPath = path.join(backendTarget, "package.json");
      if (await fs.pathExists(backendPkgPath)) {
        const pkg = await fs.readJson(backendPkgPath);
        pkg.name = `${projectName}-backend`;
        await fs.writeJson(backendPkgPath, pkg, { spaces: 2 });
      }
    }

    console.log(`✅ Project ${projectName} created successfully!`);

    if (projectType === "Full Stack") {
      console.log(`👉 cd ${projectName} && npm install`);
      console.log(`👉 cd ${projectName}/backend && npm install`);
    } else {
      console.log(`👉 cd ${projectName} && npm install && npm start`);
    }

  } catch (err) {
    console.error("❌ Error creating project:", err.message);
  }
}

