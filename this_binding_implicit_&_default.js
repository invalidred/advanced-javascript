// Here is the order of precedence of how 'this' is resolved
//1. Was the function called with 'new'?
//2. Was the function called with 'call' or 'apply' specifying an explicit 'this'
//3. Was the function called via a containing/owning object (context)?
//4. DEFAULT: global object (except strict mode, where default is undefined)

// this: implicit & default binding
function foo() {
  console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo: foo };
var o3 = { bar: "bar3", foo: foo };

foo(); // "bar1"; rule 4
o2.foo(); // "bar2"; rule 3
o3.foo(); // "bar3"; rule 3

// this: implicit & default binding
var o1 = {
  bar: "bar1",
  foo: function() {
    console.log(this.bar);
  }
}

var o2 = { bar: 'bar2',  foo: o1.foo };

var bar = 'bar3';
var foo = o1.foo;

o1.foo(); // "bar1"
o2.foo(); // "bar2"
foo(); // "bar3"
