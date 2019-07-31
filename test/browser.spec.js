'use strict'

const path = require('path')

const isNode = require('is-node')
// This file will be picked up by webpack into the
// tests bundle and the code here gets run when imported
// into the browser tests index through browser/run.js
if (!isNode) {
  // If in browser, put the fixture keys in local storage
  // so that Keystore can find them
  const levelup = require('levelup')
  const level = require('level-js')
  const storagePath = path.resolve('./test/fixtures/savedKeys')
  const signingStore = levelup(level(storagePath))
  console.log(signingStore.db)

  let copyFixtures = []
  copyFixtures.push(signingStore.open())

  const testKey1 = require('./fixtures/keys/QmPhnEjVkYE1Ym7F5MkRUfkD6NtuSptE7ugu1Ggr149W2X')
  // const testKey2 = require('./fixtures/keys/0260baeaffa1de1e4135e5b395e0380563a622b9599d1b8e012a0f7603f516bdaa')

  copyFixtures.push(signingStore.put('035756c20f03ec494d07e8dd8456f67d6bd97ca175e6c4882435fe364392f13140', JSON.stringify(testKey1)))
  // copyFixtures.push(signingStore.put('0260baeaffa1de1e4135e5b395e0380563a622b9599d1b8e012a0f7603f516bdaa', JSON.stringify(testKey1)))

  Promise.all(copyFixtures)
}
