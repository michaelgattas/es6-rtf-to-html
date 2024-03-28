// 'use strict'
import parse from 'rtf-parser'
import rtfToHTML from './rtf-to-html.js'

function asStream (opts, cb) {
  if (arguments.length === 1) {
    cb = opts
    opts = null
  }
  return parse(htmlifyresult(opts, cb))
}

function fromStream (stream, opts, cb) {
  if (arguments.length === 2) {
    cb = opts
    opts = null
  }
  return parse.stream(stream, htmlifyresult(opts, cb))
}

function fromString (string, opts, cb) {
  if (arguments.length === 2) {
    cb = opts
    opts = null
  }
  return parse.string(string, htmlifyresult(opts, cb))
}

function htmlifyresult (opts, cb) {
  return (err, doc) => {
    if (err) return cb(err)
    try {
      return cb(null, rtfToHTML(doc, opts))
    } catch (ex) {
      return cb(ex)
    }
  }
}

export { fromString, fromStream, htmlifyresult, asStream }