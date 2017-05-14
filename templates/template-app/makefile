install:
	@echo "Pruning node_modules.."
	npm prune || true
	@echo "Installing node_modules..."
	npm install

start:
	node ./bin/server.js

build-watch:
	./node_modules/.bin/babel src -d build --watch

build:
	./node_modules/.bin/babel src -d build
