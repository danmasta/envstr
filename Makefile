.PHONY: test coverage mkdir clean build watch $(TARGET) compile status version major minor patch release

BIN := $(shell dirname $$(which qjs))
DIR = .
TARGET = linux-x64 linux-arm64 windows-x64 darwin
SEMVER = patch

test:
	node_modules/.bin/mocha tests

coverage:
	node_modules/.bin/c8 --reporter=lcov node_modules/.bin/mocha tests

mkdir:
	@mkdir -p build/$(DIR)

clean:
	@rm -rf build/$(DIR)/*

build: DIR = js
build: mkdir clean
	$(info Compiling bundle)
	@node_modules/.bin/rollup -c --silent
	@echo Done

watch: clean
	@node_modules/.bin/rollup -c -w

$(TARGET): FILE = $@
windows-x64: FILE = $@.exe
$(TARGET):
	$(info Compiling executable: $(FILE))
	@qjs -c build/js/bundle.js -o build/bin/envstr-$(FILE) --exe $(BIN)/qjs-$(FILE)
	@sha256sum --tag < build/bin/envstr-$(FILE)

compile: DIR = bin
compile: mkdir clean build $(TARGET)
	$(info Done)

status:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Git tree not clean"; \
		exit 1; \
	fi

version: status
	@npm version $(SEMVER)

major: SEMVER = major
major: version

minor: SEMVER = minor
minor: version

patch: SEMVER = patch
patch: version

release: TAG := $(shell git describe --tags --abbrev=0)
release: compile test status
	$(info Creating release: $(TAG))
	@if [ -n "$(TAG)" ]; then \
		gh release create $(TAG) build/bin/* --generate-notes --fail-on-no-commits --verify-tag; \
	else \
		echo "Tag not found"; \
		exit 1; \
	fi
	@echo Done
