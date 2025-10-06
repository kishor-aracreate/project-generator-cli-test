# Project Generator CLI

A simple, customizable **project scaffolding CLI** to quickly generate frontend, backend, or fullstack apps.
Inspired by tools like `create-vite`, but designed for flexibility with your own templates.

---

## 📦 Installation

### Global Install (Recommended)

```bash
npm install -g .
```

or use symlink during development:

```bash
npm link
```

---

## 🚀 Usage

### Create a new project

```bash
ac-cli my-app
```

You’ll be prompted to choose a framework:

```
🚀 Welcome to My CLI Tool
✔ Project name: my-app
✔ Choose a framework: React / Angular / Vanilla JS
```

Then a new folder `my-app/` will be created with the template.

---

### Non-interactive mode

```bash
ac-cli my-app react
```

Skips the prompt and directly scaffolds a React project.

---

### Run the project

After scaffolding:

```bash
cd my-app
npm install
npm start
```

---

## 📂 Project Structure

```
my-cli-tool/
├── bin/
│   └── index.js          # CLI entrypoint
├── src/
│   ├── scaffold.js       # Project generation logic
│   └── ...
├── templates/
│   ├── react/            # React starter template
│   ├── angular/          # Angular starter template
│   └── vanilla js/       # Vanilla JS starter template
└── package.json
```

---

## 🛠 Features

* Interactive prompts (via [Inquirer](https://www.npmjs.com/package/inquirer))
* Dynamic project naming (updates `package.json` automatically)
* Multiple framework templates (React, Angular, Vanilla JS by default)
* Extensible – add your own templates in `/templates`

---

## 🌱 Add a New Template

1. Create a folder under `templates/` (e.g. `templates/express`)
2. Put a `package.json` and source files inside.
3. Add the framework name to the choices in `bin/index.js`.