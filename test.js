var rimraf = require('rimraf')
var maxmind = require('maxmind')
var path = require('path')
var assert = require('assert')

describe('maxmind-download', function () {
	it.skip('download', function () {

	})

	it('use', function () {
		maxmind.init(path.resolve(__dirname, 'download', 'countries.dat'))
		var country = maxmind.getCountry('66.6.44.4');
		assert(country)
		assert.strictEqual(country.code, 'US')
	})

	//TODO add delete in beforeEach / before
	//TODO implement download test
})