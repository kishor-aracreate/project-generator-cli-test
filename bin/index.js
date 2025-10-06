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

  questions.push({
    type: "list",
    name: "framework",
    message: "Choose a framework:",
    choices: ["React", "Angular", "Vanilla"]
  });

  const answers = await inquirer.prompt(questions);

  // if projectName was passed as arg, prefer it
  const finalAnswers = {
    ...answers,
    projectName: projectName || answers.projectName
  };

  await createApp(finalAnswers);
}

main();
