# Makefile for My CLI Tool

# Default task: show help
all: help

# Install CLI dependencies
install:
	npm install

# Link CLI globally (for testing ac-cli command)
link:
	npm link

# Unlink CLI globally
unlink:
	npm unlink -g

# Run CLI interactively
run:
	npx ac-cli

# Scaffold a new project
# Usage: make scaffold NAME=my-project
scaffold:
	@if [ -z "$(NAME)" ]; then \
		echo "❌ Please provide project name: make scaffold NAME=my-project"; \
		exit 1; \
	fi; \
	npx ac-cli $(NAME); \
	echo "✅ Project $(NAME) scaffolded successfully!"; \
	if [ -d "$(NAME)/backend" ]; then \
		echo "Installing backend dependencies..."; \
		cd $(NAME)/backend && npm install; \
	fi; \
	echo "Installing frontend/main project dependencies..."; \
	cd $(NAME) && npm install

# Clean CLI project
clean:
	rm -rf node_modules package-lock.json

# Help
help:
	@echo "Usage:"
	@echo "  make install             # Install CLI dependencies"
	@echo "  make link                # Link CLI globally"
	@echo "  make unlink              # Unlink CLI globally"
	@echo "  make run                 # Run CLI"
	@echo "  make scaffold NAME=app   # Scaffold new project with given name"
	@echo "  make clean               # Clean node_modules and lock file"
