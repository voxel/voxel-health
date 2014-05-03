'use strict';

var test = require('tape');
var HealthPlugin = require('./');

function FakeGame() { }

test('hurt', function(t) {
  var p = HealthPlugin(new FakeGame(), {});

  t.equals(p.value, 10);
  p.hurt(1);
  t.equal(p.value, 9);
  p.hurt(6);
  t.equal(p.value, 3);
  p.hurt(1);
  t.equal(p.value, 2);
  p.hurt(1);
  t.equal(p.value, 1);
  p.hurt(1);
  t.equal(p.value, 0);

  t.end();
});

test('die', function(t) {
  var p = HealthPlugin(new FakeGame(), {});

  var self = this;

  p.on('die', function() {
    self.died = true;
  });

  p.hurt(10);

  t.equal(self.died, true);
  t.end();
});

test('clamped hurt', function(t) {
  var p = HealthPlugin(new FakeGame(), {});

  p.hurt(9999);
  t.equal(p.value, 0);  // not negative
  t.end();
});

test('clamped heal', function(t) {
  var p = HealthPlugin(new FakeGame(), {});

  p.heal(9999);
  t.equal(p.value, 10);
  t.end();
});

test('max health', function(t) {
  var p = HealthPlugin(new FakeGame(), {maxHealth: 20});

  t.equal(p.value, p.maxHealth);
  t.equal(p.value, 20);

  p.hurt(9);
  t.equal(p.value, 11);
  
  p.heal(9);
  t.equal(p.value, 20);

  p.hurt(9);
  t.equal(p.value, 11);
  p.heal(10);
  t.equal(p.value, 20);


  t.end();
});

test('bad health', function(t) {
  var p = HealthPlugin(new FakeGame(), {maxHealth: 20});

  t.throws(function() {
    p.heal(undefined);
  });

  t.throws(function() {
    p.hurt(undefined);
  });

  t.throws(function() {
    p.heal('abc');
  });

  t.throws(function() {
    p.hurt('abc');
  });

  t.throws(function() {
    p.heal(NaN);
  });

  t.throws(function() {
    p.hurt(NaN);
  });


  t.end();
});

test('infinite health', function(t) {
  var p = HealthPlugin(new FakeGame(), {maxHealth: 20});

  p.hurt(10);
  p.heal(Infinity);
  t.equal(p.value, 20);

  p.heal(-Infinity);
  t.equal(p.value, 0);

  p.hurt(-Infinity);
  t.equal(p.value, 20);

  p.heal(-Infinity)
  t.equal(p.value, 0);

  t.end();
});
