
.PHONY: dev dev-static build clean

dev:
	@echo "Starting Hugo development server..."
	hugo server -D --port 1313

dev-static:
	@echo "Starting static server for docs/..."
	python3 -m http.server 8000 --directory docs

build:
	@echo "Building Hugo site..."
	hugo

clean:
	@echo "Cleaning build artifacts..."
	rm -rf public node_modules
