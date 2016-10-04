// Here is the order of precedence of how 'this' is resolved
//1. Was the function called with 'new'?
//2. Was the function called with 'call' or 'apply' specifying an explicit 'this'
//3. Was the function called via a containing/owning object (context)?
//4. DEFAULT: global object (except strict mode, where default is undefined)

// NOTE that .bind() is already part of JS language
// specification and it's part of Function.prototype

// Rule 2: Explicit Binding using .call() or .apply()
function foo() {
  console.log(this.bar);
}

var bar = 'bar1';
var obj = { bar: 'bar2' };

foo(); // bar1
foo.call(obj);


// Hard binding (loose flexbility of this, however we gain predictibility)
var orig = foo;
foo = function() { orig.call(obj); }

foo(); // 'bar1'
foo.call(obj2); // 'bar1'


// Reusable Hard binding
function bind(fn, o) {
  return function() {
    fn.call(o);
  }
}

var obj = { bar: 'bar' };
var obj2 = { bar: 'bar2' };

foo = bind(foo, obj); // always ensure 'this' refers to 'obj' object
foo.call(obj2); // 'bar1' (the call site is fn.call(0) (line30))


// Placing Hard binding on function prototype
if (!Function.prototype.bind2) {
  Function.prototype.bind2 = function(o) {
    var fn = this; // the function!
    return function() {
      fn.apply(o, arguments);
    };
  };
}

var obj = { bar: 'bar'};
foo = foo.bind2(obj); // always ensure 'this' refers to 'obj' object

foo('baz');
