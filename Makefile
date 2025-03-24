.PHONY: test coverage mkdir clean build $(TARGET) compile watch status

BIN = $$(dirname $$(which qjs))
DIR = .
TARGET = linux-x64 linux-arm64 windows-x64 darwin-arm64

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
	$(info Compiling js bundle)
	@node_modules/.bin/rollup -c
	$(info Done)

$(TARGET): FILE = $@
windows-x64: FILE = $@.exe
$(TARGET):
	$(info Compiling executable: $(FILE))
	@qjs -c build/js/bundle.js -o build/bin/envstr-$(FILE) --exe $(BIN)/qjs-$(FILE)

compile: DIR = bin
compile: mkdir clean build $(TARGET)
	$(info Done)

watch: clean
	node_modules/.bin/rollup -c -w

status:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Git tree not clean"; \
		exit 1; \
	fi
