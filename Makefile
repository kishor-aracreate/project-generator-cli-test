# Variables
NODE=node
NPM=npm


# Install dependencies
install:
	@$(NPM) install

# Link CLI globally
link:
	@$(NPM) link

# Unlink CLI globally
unlink:
	@$(NPM) unlink -g my-cli-tool || true

# Run CLI interactively
run:
	@$(NODE) bin/index.js

# Scaffold project
# Scaffold project
# Usage: make scaffold PROJECT_NAME=my-app
scaffold:
	@if [ -z "$(PROJECT_NAME)" ]; then \
		node bin/index.js; \
	else \
		echo "⚡ Scaffolding project: $(PROJECT_NAME)"; \
		node bin/index.js $(PROJECT_NAME); \
	fi

	@if [ -f "$(PROJECT_NAME)/package.json" ]; then \
		cd $(PROJECT_NAME) && $(NPM) install; \
	fi
	@if [ -f "$(PROJECT_NAME)/backend/package.json" ]; then \
		cd $(PROJECT_NAME)/backend && $(NPM) install; \
	fi
	@echo "✅ $(PROJECT_NAME) ready!"


# Clean
clean:
	@rm -rf node_modules package-lock.json

# Lint
lint:
	@npx eslint src bin || true

# Test
test:
	@$(NPM) test || true

# Show help
help:
	@echo "Usage:"
	@echo "  make install            Install CLI dependencies"
	@echo "  make link               Link CLI globally"
	@echo "  make unlink             Unlink CLI globally"
	@echo "  make run                Run CLI interactively"
	@echo "  make scaffold NAME=app  Scaffold new project"
	@echo "  make clean              Remove node_modules and lock file"
	@echo "  make lint               Run linter"
	@echo "  make test               Run tests"
