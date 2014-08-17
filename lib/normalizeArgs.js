'use strict';

function normalizeArgs(orchestrator, args){
  return Array.prototype.slice.call(args).map(function(taskOrFn) {
    return typeof taskOrFn === 'function' ? taskOrFn : orchestrator.registry.get(taskOrFn);
  }, orchestrator.registry);
}

module.exports = normalizeArgs;
