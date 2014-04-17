
node_modules: package.json
	@npm install -d

test:
	@mocha test.js

.PHONY: test
