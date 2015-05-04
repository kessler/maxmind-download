#!/usr/bin/env node
var argv = require('yargs').argv
var async = require('async')
var fs = require('fs')
var path = require('path')
var request = require('request')
var requestProgress = require('request-progress')
var Canvas = require('term-canvas')
var mkdirp = require('mkdirp')
var cp = require('child_process')

var target = argv.target || path.join(process.cwd(), 'download')

mkdirp.sync(target)

log('\033[2J')
log('downloading to %s', target)

var sources = require('./sources.json')
var work = []
var state = {}

var canvas = new Canvas(50, 50)
var ctx = canvas.getContext('2d')
ctx.resetState()

for (var source in sources) {
	var url = sources[source]
	log('adding %s', url)
	state[source] = { percent: 0 }
	work.push(download(source, url, path.join(target, source + '.dat.gz')))
}

async.parallel(work, function (err) {
	if (err) return log(err)
	else log('download complete')
})

setInterval(draw, 1000).unref()

function download(source, url, target) {

	return function downloadFunctor(callback) {
		var stream = requestProgress(request(url))
		
		stream.on('progress', function (p) {
			state[source].percent = p.percent
		}).on('end', function () {
			state[source].percent = 100
		})

		stream.pipe(fs.createWriteStream(target)).on('finish', function () {
			cp.execFile('gunzip', [target])
			callback()
		})
	}
}

function draw() {
	if (!argv.silent) {
		var y = 2

		for (var source in state) {
			var sourceState = state[source]
			ctx.fillStyle = 'blue'
			ctx.fillRect(1, y, sourceState.percent, 1)
			ctx.fillStyle = 'white';
  			ctx.fillText(source + '.dat.gz (' + sourceState.percent + '%)', 1, y);
			y += 2
		}

		console.log('\n\n\n')
	}
}

function log() {
	if (!argv.silent) {
		console.log.apply(console, arguments)
	}
}
