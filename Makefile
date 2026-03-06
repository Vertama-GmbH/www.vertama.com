
.PHONY: setup dev dev-static build build-news clean

setup:
	npm ci

dev: setup
	@echo "Starting Hugo development server..."
	hugo server -D --port 1313

dev-static:
	@echo "Starting static server for docs/..."
	python3 -m http.server 8000 --directory docs

build-news: setup
	@echo "Building news page from Markdown..."
	npm run build:news

build: setup build-news
	@echo "Building Hugo site..."
	hugo

clean:
	@echo "Cleaning build artifacts..."
	rm -rf public
