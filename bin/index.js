#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import { createApp } from "../src/scaffold.js";
import checkDiskSpace from "check-disk-space"
import os from "os";
import path from "path";

async function main() {
  try {
    // Determine root path dynamically
    const rootPath = process.platform === "win32" 
      ? path.parse(process.cwd()).root // e.g., C:\
      : "/"; // Linux/macOS

    // Get disk space info
    const diskSpace = await checkDiskSpace(rootPath);

    console.log(chalk.greenBright("💾 Storage Info:"));
    console.log(
      chalk.white(`• Free space: ${(diskSpace.free / (1024 ** 3)).toFixed(2)} GB`)
    );
    console.log(
      chalk.white(`• Total space: ${(diskSpace.size / (1024 ** 3)).toFixed(2)} GB`)
    );
  } catch (error) {
    console.log(chalk.red("⚠️ Could not retrieve storage info."));
    console.error(error);
  }

  // Welcome messages
  console.log(gradient.pastel.multiline(""));
  console.log(gradient.pastel.multiline("🚀 Welcome to My CLI Tool 🚀"));
  console.log(chalk.cyanBright("===================================="));
  console.log(chalk.yellow("✨ Let's create something awesome! ✨"));
  console.log(chalk.cyanBright("====================================\n"));

  const args = process.argv.slice(2);
  let projectName = args[0];

  const questions = [];

  if (!projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: chalk.magenta("📦 Project name:"),
    });
  }

  // Step 1: Ask project type
  questions.push({
    type: "list",
    name: "projectType",
    message: chalk.blue("⚡ Select project type:"),
    choices: [
      { name: chalk.green("Frontend"), value: "Frontend" },
      { name: chalk.yellow("Backend"), value: "Backend" },
      { name: chalk.cyan("Full Stack"), value: "Full Stack" }
    ]
  });

  // Step 2: Prompt questions in sequence
  const answers = await inquirer.prompt(questions);

  const finalAnswers = {
    projectName: projectName || answers.projectName,
    projectType: answers.projectType
  };

  // Step 3: Ask framework(s) based on projectType
  if (finalAnswers.projectType === "Frontend") {
    const { frontendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "frontendFramework",
        message: chalk.green("🎨 Choose a frontend framework:"),
        choices: [
          { name: chalk.cyan("React"), value: "React" },
          { name: chalk.red("Angular"), value: "Angular" },
          { name: chalk.yellow("Vanilla JS"), value: "Vanilla JS" }
        ]
      }
    ]);
    finalAnswers.frontendFramework = frontendFramework;

  } else if (finalAnswers.projectType === "Backend") {
    const { backendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "backendFramework",
        message: chalk.yellow("🛠️ Choose a backend framework:"),
        choices: [
          { name: chalk.red("NestJS"), value: "NestJS" },
          { name: chalk.blue("Express"), value: "Express" }
        ]
      }
    ]);
    finalAnswers.backendFramework = backendFramework;

  } else if (finalAnswers.projectType === "Full Stack") {
    const { frontendFramework, backendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "frontendFramework",
        message: chalk.green("🎨 Choose a frontend framework:"),
        choices: [
          { name: chalk.cyan("React"), value: "React" },
          { name: chalk.red("Angular"), value: "Angular" },
          { name: chalk.yellow("Vanilla JS"), value: "Vanilla JS" }
        ]
      },
      {
        type: "list",
        name: "backendFramework",
        message: chalk.yellow("🛠️ Choose a backend framework:"),
        choices: [
          { name: chalk.red("NestJS"), value: "NestJS" },
          { name: chalk.blue("Express"), value: "Express" }
        ]
      }
    ]);
    finalAnswers.frontendFramework = frontendFramework;
    finalAnswers.backendFramework = backendFramework;
  }

  console.log("\n" + chalk.greenBright("✨ Generating your project... please wait ✨\n"));

  await createApp(finalAnswers);
}

main();
