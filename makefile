start:
	./node_modules/.bin/babel src -d bin --watch

build:
	./node_modules/.bin/babel app -d bin

run:
	bin/kro.js ${ARGS}
