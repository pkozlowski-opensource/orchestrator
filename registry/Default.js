'use strict';

function DefaultRegistry(){
  if(!(this instanceof DefaultRegistry)){
    return new DefaultRegistry();
  }

  this.tasks = {};
}

DefaultRegistry.prototype.get = function(name){
  return this.tasks[name];
};

DefaultRegistry.prototype.set = function(name, fn){
  var evt = this.normalize(name, fn);

  if(this.tasks[name]){
    evt.oldFn = this.tasks[name];
    this.emit('update', evt);
  } else {
    this.emit('new', evt);
  }

  this.tasks[name] = fn;
};

DefaultRegistry.prototype.all = function(){
  var tasks = this.tasks;
  var taskNames = Object.keys(tasks);
  return taskNames.map(this.normalize, this);
};

DefaultRegistry.prototype.normalize = function(name, fn){
  if(typeof name === 'function'){
    fn = name;
    name = fn.name || null;
  }

  if(typeof name === 'string'){
    name = name;
  }

  if(typeof fn === 'function'){
    fn = fn;
  } else {
    fn = this.tasks[name];
  }

  return {
    name: name,
    fn: fn
  };
};

module.exports = DefaultRegistry;
