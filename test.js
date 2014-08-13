var Orchestrator = require('./index.js');

var orchestrator = new Orchestrator();

orchestrator.on('start', function (evt) {
  console.log('start: ', JSON.stringify(evt, null, 2));
});

orchestrator.on('stop', function (evt) {
  console.log('stop: ', JSON.stringify(evt, null, 2));
});

orchestrator.task('foo', function foo(done) {
  setTimeout(function(){
    console.log('finishing foo');
    done(null, 'foo');
  }, 1500);
});

orchestrator.task('bar', function bar(done) {
  setTimeout(function(){
    console.log('finishing bar');
    done(null, 'bar');
  }, 2000);
});

function baz(done) {
  setTimeout(function(){
    console.log('finishing baz');
    done(null, 'baz');
  }, 4000);
}


orchestrator.task('default', orchestrator.parallel('foo', 'bar', baz));


orchestrator.task('default')(function(err, result){
  console.log(err, result);
});


//orchestrator.series('foo', 'bar')

/*
orchestrator.task('bar')(function(err, result){
  console.log(err, result);
})*/;