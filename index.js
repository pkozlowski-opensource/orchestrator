'use strict';

var events = require('events');
var util = require('util');

var nowAndLater = require('now-and-later');

var normalizeArgs = require('./lib/normalizeArgs');
var validateRegistry = require('./lib/validateRegistry');

var DefaultRegistry = require('./registry/Default');

function Orchestrator(registry){
  events.EventEmitter.call(this);
  this.registry = registry || new DefaultRegistry();
  validateRegistry(this.registry);
}
util.inherits(Orchestrator, events.EventEmitter);

Orchestrator.prototype.task = function(taskName, fn){
  var registry = this.registry;
  var self = this;

  if(typeof taskName === 'function'){
    fn = taskName;
    taskName = fn.name;
  }

  if(!taskName){
    throw new Error('Task name must be supplied');
  }

  if(fn){
    return registry.set(taskName, fn);
  }

  return registry.get(taskName);
};

Orchestrator.prototype.setRegistry = function(newRegistry){
  validateRegistry(newRegistry);
  var tasks = this.registry.all();
  tasks.forEach(function(task){
    newRegistry.set(task.name, task.fn);
  });
  this.registry = newRegistry;
};

Orchestrator.prototype.series = function(){
  var args = normalizeArgs(this, arguments);
  return nowAndLater.series(args, {
    before: function (fn) { console.log('Starting ', fn.name, Date.now());},
    after: function (fn) { console.log('Stopping ', fn.name, Date.now());},
    error: function (fn) { console.log('Error ', fn.name, Date.now());}
  });
};

Orchestrator.prototype.parallel = function(){
  var args = normalizeArgs(this, arguments);
  return nowAndLater.parallel(args, {
    before: function (fn) { console.log('Starting ', fn.name, Date.now());},
    after: function (fn) { console.log('Stopping ', fn.name, Date.now());},
    error: function (fn) { console.log('Error ', fn.name, Date.now());}
  });
};

module.exports = Orchestrator;
