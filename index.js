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
  var oldValue = this.value;
  
  this.value -= amount;
  if (this.value < this.minHealth) 
    this.value = this.minHealth;

  this.emit('health', this.value, oldValue);
  this.emit('hurt', this.amount);

  if (this.value === this.minHealth) {
    this.emit('die');
  }
};

Health.prototype.heal = function(amount) {
  var oldValue = this.value;

  this.value += amount;
  if (this.value > this.maxHealth)
    this.value = this.maxHealth;

  this.emit('health', this.value, oldValue);
  this.emit('heal', this.amount);
};

Health.prototype.scaledValue = function() {
  return this.value / this.maxHealth;
};


