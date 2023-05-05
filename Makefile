publish:
	npm publish --dry-run

lint:
	npx eslint .

test_install:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

.PHONY:	test