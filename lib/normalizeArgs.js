'use strict';

function normalizeArgs(orchestrator, args){
  return Array.prototype.slice.call(args).map(function(taskOrFn) {
    return typeof taskOrFn === 'function' ? function(cb) {

      orchestrator.asyncTime(taskOrFn, cb);

    } : orchestrator.registry.get(taskOrFn);
  }, orchestrator.registry);
}

module.exports = normalizeArgs;
