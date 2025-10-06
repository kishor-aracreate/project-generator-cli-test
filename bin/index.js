#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { createApp } from "../src/scaffold.js";

async function main() {
  console.log(chalk.green("🚀 Welcome to My CLI Tool"));

  const args = process.argv.slice(2);
  let projectName = args[0];

  const questions = [];

  if (!projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app"
    });
  }

  // Step 1: Ask project type
  questions.push({
    type: "list",
    name: "projectType",
    message: "Select project type:",
    choices: ["Frontend", "Backend", "Full Stack"]
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
        message: "Choose a frontend framework:",
        choices: ["React", "Angular", "Vanilla JS"]
      }
    ]);
    finalAnswers.frontendFramework = frontendFramework;

  } else if (finalAnswers.projectType === "Backend") {
    const { backendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "backendFramework",
        message: "Choose a backend framework:",
        choices: ["NestJS", "Express"]
      }
    ]);
    finalAnswers.backendFramework = backendFramework;

  } else if (finalAnswers.projectType === "Full Stack") {
    // Ask both frontend and backend
    const { frontendFramework, backendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "frontendFramework",
        message: "Choose a frontend framework:",
        choices: ["React", "Angular", "Vanilla JS"]
      },
      {
        type: "list",
        name: "backendFramework",
        message: "Choose a backend framework:",
        choices: ["NestJS", "Express"]
      }
    ]);
    finalAnswers.frontendFramework = frontendFramework;
    finalAnswers.backendFramework = backendFramework;
  }

  await createApp(finalAnswers);
}

main();
