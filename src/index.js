import Foo from './modules/foo';

if (module.hot) {
  module.hot.accept('./modules/foo', function() {
    console.log(Foo.value);
  });
}
