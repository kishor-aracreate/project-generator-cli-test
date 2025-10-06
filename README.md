# My CLI Tool

`My CLI Tool` is a Node.js-based CLI that allows you to scaffold **frontend, backend, or fullstack web projects** with predefined templates. It supports frameworks like React, Angular, Vanilla JS for frontend, and Express, NestJS for backend.

---

## Features

* Scaffold **Frontend** apps (React, Angular, Vanilla JS)
* Scaffold **Backend** apps (Express, NestJS)
* Scaffold **Fullstack** apps (frontend + backend combined)
* Dynamic `package.json` updates based on project name
* Automated dependency installation for frontend and backend
* Integrated **Makefile** for faster workflow

---

## 1️⃣ Installation

Clone the repository:

```bash
git clone https://github.com/kishor-aracreate/project-generator-cli-test.git
cd project-generator-cli-test
```

Install dependencies:

```bash
make install
```

Link CLI globally for development:

```bash
make link
```

> Now you can use the `ac-cli` command anywhere.

---

## 2️⃣ Usage

Run the CLI interactively:

```bash
ac-cli
```

The CLI will prompt you for:

1. **Project name**
2. **Project type**: Frontend / Backend / Fullstack
3. **Framework selection** based on project type:

   * Frontend → React / Angular / Vanilla JS
   * Backend → Express / NestJS
   * Fullstack → select both frontend and backend

After selection, the CLI will scaffold the project and update `package.json` names automatically.

---

## 3️⃣ Makefile Commands

| Command                        | Description                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `make install`                 | Installs CLI dependencies                                                        |
| `make link`                    | Links CLI globally for testing                                                   |
| `make unlink`                  | Unlinks CLI globally                                                             |
| `make run`                     | Runs CLI interactively                                                           |
| `make scaffold NAME=<project>` | Scaffold a new project with the given name (installs dependencies automatically) |
| `make clean`                   | Removes `node_modules` and `package-lock.json`                                   |
| `make help`                    | Shows help                                                                       |

### Example: Scaffold a new project

```bash
make scaffold NAME=my-app
```

* CLI will prompt for project type and frameworks.
* If fullstack, backend is scaffolded in `my-app/backend`.
* Dependencies are installed automatically.

---

## 4️⃣ Template Structure

```
templates/
├── frontend/
│   ├── react/
│   ├── angular/
│   └── vanilla/
├── backend/
│   ├── express/
│   └── nestjs/
```

* **Frontend templates**: Contains `package.json`, `src/`, `public/` or `index.html`
* **Backend templates**: Contains `package.json`, `src/` or root files

> For fullstack, frontend is copied to project root, backend is copied to `backend/` folder.

---

## 5️⃣ Adding New Templates

1. Add the new template folder inside `templates/frontend` or `templates/backend`.
2. Ensure it includes a `package.json` file.
3. Update the CLI framework choices in `bin/mycli.js` if needed.

---

## 6️⃣ Notes

* On Windows, use **Git Bash** or **WSL** to run Makefile commands.
* Designed for extensibility: you can add new frontend or backend frameworks easily.
* Fullstack projects will have **frontend at root** and **backend in `/backend` folder**.

---

## 7️⃣ Example Workflow

```bash
# Install CLI dependencies
make install

# Link CLI globally
make link

# Scaffold a fullstack project
make scaffold NAME=my-fullstack-app
# -> Choose Frontend: React
# -> Choose Backend: Express

# Navigate to frontend
cd my-fullstack-app
npm start

# Navigate to backend
cd backend
npm start
```

---

This README is now **focused solely on frontend, backend, and fullstack scaffolding**, no deployment options included.

