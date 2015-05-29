'use strict';

/**
 * Run package tests.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');


/**
 * Test that a new object is clean: has no functions.
 * Same for string and array.
 */
function testObjectsAreClean(callback)
{
	var object = {};
	for (var key in object)
	{
		testing.fail('New object has attribute %s', key, callback);
	}
	var string = '';
	for (key in string)
	{
		testing.fail('New string has attribute %s', key, callback);
	}
	testing.success(callback);
}

/**
 * Run all module tests.
 */
exports.test = function(callback)
{
	var tests = {};

	tests.objectsAreCleanBeforeLoadingLibrary = testObjectsAreClean;

	var files = [ 'core', 'string', 'array', 'math', 'object' ];
	files.forEach(function(file)
	{
		tests[file] = require('./test/' + file + '.js').test;
	});

	tests.objectsAreCleanAfterLoadingLibrary = testObjectsAreClean;


	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

