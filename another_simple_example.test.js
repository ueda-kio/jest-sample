const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const setUp = () => {
	const html = fs.readFileSync('./index.html');
	const options = {
		resources: 'usable',
		runScripts: 'dangerously',
	};
	const scriptContent = fs.readFileSync('./simple_example_launch_school.js', 'utf8');

	const dom = new JSDOM(html, options);
	const window = dom.window;
	const document = window.document;
	document.write(html);
	const scriptElement = document.createElement('script');
	scriptElement.textContent = scriptContent;
	document.head.appendChild(scriptElement);
	return { window, document };
};

describe('Launch School A Simple Example', function () {
	let results, expected, output, addButton, resetButton;
	describe('Load Script In JSDOM Vice External Loading', function () {
		beforeEach(() => {
			const { document } = setUp();

			output = document.getElementById('output');
			addButton = document.getElementById('add');
			resetButton = document.getElementById('reset');
		});

		it('should allow output to increment via the add button', () => {
			expected = ['0', '1', '2'];
			results = [output.textContent];
			addButton.click();
			results.push(output.textContent);
			addButton.click();
			results.push(output.textContent);
			expect(results).toEqual(expected);
		});
	});
});
