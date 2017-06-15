import Foo from './modules/foo';

if (module.hot) {
  module.hot.accept('./modules/foo', function() {
    console.log('Accepting the updated library module!');
    console.log(Foo.value);
  });
}
