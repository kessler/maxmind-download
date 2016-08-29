var rimraf = require('rimraf')
var maxmind = require('maxmind')
var path = require('path')
var assert = require('assert')

describe('maxmind-download', function () {
	it.skip('download', function () {

	})

	it('use', function () {
		var lookup = maxmind.open(path.resolve(__dirname, 'download', 'countries.mmdb'))

		var ipv4Country = lookup.get('66.6.44.4')
		assert(ipv4Country)
		assert.strictEqual(ipv4Country.country.iso_code, 'US')

		var ipv6Country = lookup.get('2001:4860:0:1001::3004:ef68')
		assert(ipv6Country)
		assert.strictEqual(ipv6Country.country.iso_code, 'US')
	})

	//TODO add delete in beforeEach / before
	//TODO implement download test
})