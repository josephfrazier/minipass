'use strict'
const t = require('tap')
const MP = require('../')

const butterfly = Buffer.from([0x61, 0xf0, 0x9f, 0xa6, 0x8b, 0xf0])
const mp = new MP({ encoding: 'utf8' })

let sawEnd = 0
mp.on('end', () =>
  t.equal(sawEnd++, 0, 'should not have seen the end yet'))

mp.once('data', () => {
  mp.once('data', () => {
    mp.once('data', () => mp.end())
    mp.end()
  })
  mp.end(butterfly.slice(3))
})
mp.end(butterfly.slice(0, 3))

t.equal(sawEnd, 1, 'should see end exactly once')