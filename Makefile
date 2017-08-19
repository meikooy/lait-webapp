ENV_DEV = NODE_ENV=development
ENV_PROD = NODE_ENV=production

BIN = node_modules/.bin
NODE = babel-node --presets es2015 --presets stage-0
LINT = $(BIN)/eslint
JADE = $(BIN)/jade
IMAGEMIN = $(BIN)/imagemin
CHOKIDAR = $(BIN)/chokidar
RELOAD = $(BIN)/livereload
PARALLEL = $(BIN)/parallelshell
WEBPACK = $(BIN)/webpack
DEV_SERVER = $(BIN)/webpack-dev-server

FONT_FILES = $(shell find src/assets/fonts -type f)
PAGES = $(shell find src/jade -type f)
PACKAGE = $(shell cat package.json | grep name | tr -d " \t\n\r\":," | sed 's:name::')
VERSION = $(shell cat package.json | grep version | tr -d " \t\n\r\":,(a-z)")

# default
.PHONY: all

all: develop

#setup
.PHONY: setup

setup:
	@npm install

# clean
.PHONY: clean

clean:
	@rm -rf dist

# lint
.PHONY: lint
lint:
	@$(LINT) 'src/**/*/*.js' --quiet

# assets
.PHONY: assets images dist/fonts/

pre-assets:
	mkdir -p dist/fonts/galano/webfonts

src/assets/fonts/%: dist/fonts/
	cp $@ $<$*

images:
	cp src/assets/images/* dist/images

assets: pre-assets images $(FONT_FILES)

# jade
.PHONY: jade
jade:
	$(JADE) -O env.json src/jade/pages -o dist

# scripts
.PHONY: scripts
scripts:
	mkdir dist/js
	cp -r src/assets/fonts/galano/galano.js dist/js/
	cp node_modules/html5shiv/dist/html5shiv.min.js dist/js/
	cp node_modules/es5-shim/es5-shim.min.js dist/js/
	cp node_modules/respond.js/dest/respond.min.js dist/js/

# watch
.PHONY: watch
watch:
	$(CHOKIDAR) 'src/jade/**/*.jade' -c 'make jade'

# reload
.PHONY: reload
reload:
	$(RELOAD) 'dist/*.html'

# env
.PHONY: env-production env-development
env-development:
	echo '{"env": "development"}' > env.json
env-production:
	echo '{"env": "production"}' > env.json

.PHONY: develop
develop: clean assets env-development jade
	$(PARALLEL) 'make watch' 'make reload' 'make dev-server'

# dev server
.PHONY: dev-server

dev-server:
	NODE_ENV=development $(DEV_SERVER) --config webpack-dev-server.config.babel.js --progress --host 0.0.0.0

# build
.PHONY: development-build production-build development-release production-release

development-build production-build: clean assets scripts jade
	NODE_ENV=$(@:%-build=%) TARGET=server $(WEBPACK) --config webpack-build.config.babel.js --progress

development-release: env-development development-build
	cp src/static/* dist/
production-release: env-production production-build
	cp src/static/* dist/
