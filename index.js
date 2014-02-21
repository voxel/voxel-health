'use strict';

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

module.exports = function(game, opts) {
  return new Health(game, opts);
};

function Health(game, opts) {
  this.maxHealth = opts.maxHealth || 10;
  this.minHealth = opts.minHealth || 0;
  this.startHealth = opts.startHealth || this.maxHealth;

  this.value = this.startHealth;
}

inherits(Health, EventEmitter);

Health.prototype.hurt = function(amount) {
  if (amount < 0) return this.heal(-amount);

  var oldValue = this.value;
  
  this.value -= amount;
  if (this.value < this.minHealth) 
    this.value = this.minHealth;

  var effectiveAmount = this.value - oldValue;

  this.emit('health', this.value, oldValue);
  this.emit('hurt', effectiveAmount, amount, this.value, oldValue);

  if (this.value === this.minHealth) {
    this.emit('die');
  }

  return effectiveAmount;
};

Health.prototype.heal = function(amount) {
  if (amount < 0) return this.hurt(-amount);

  var oldValue = this.value;

  this.value += amount;
  if (this.value > this.maxHealth)
    this.value = this.maxHealth;

  var effectiveAmount = oldValue - this.value;

  this.emit('health', this.value, oldValue);
  this.emit('heal', effectiveAmount, amount, this.value, oldValue);

  return effectiveAmount;
};

Health.prototype.scaledValue = function() {
  return this.value / this.maxHealth;
};

Health.prototype.percentage = function() {
  return this.scaledValue() * 100.0;
};

