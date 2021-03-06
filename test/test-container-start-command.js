// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-pm
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var Container = require('../lib/drivers/direct/container');
var tap = require('tap');

function newContainer() {
  return new Container({
    instanceId: '_id',
    baseDir: '_base',
    server: {},
  });
}

tap.test('start default', function(t) {
  var s = newContainer();
  t.equal(s.getStartCommand(), 'sl-run --cluster=CPU');
  t.end();
});

tap.test('start with env size', function(t) {
  process.env.STRONGLOOP_CLUSTER = 2;

  t.on('end', function() {
    delete process.env.STRONGLOOP_CLUSTER;
  });

  var s = newContainer();
  t.equal(s.getStartCommand(), 'sl-run --cluster=2');
  t.end();
});

tap.test('start with option', function(t) {
  var s = newContainer();
  t.equal(s.getStartCommand(), 'sl-run --cluster=CPU');
  s.setStartOptions({size: 3});
  t.equal(s.getStartCommand(), 'sl-run --cluster=3');
  s.setStartOptions({size: 7, profile: false});
  t.equal(s.getStartCommand(), 'sl-run --cluster=7 --no-profile');
  s.setStartOptions({size: 1, profile: true});
  t.equal(s.getStartCommand(), 'sl-run --cluster=1');
  t.end();
});
