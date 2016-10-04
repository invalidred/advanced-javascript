// There is no way to make 'this' work with lexical scoping. 'this' scoping
// works dynamically based on the function call site.

// baz() is some function we don't have control over, however we want to
// assign it our 'bar' value, howevever, this is not possible
function foo() {
  var bar = 'bar1';
  this.baz = baz;
  this.baz();
}

function baz() {
  console.log(this.bar);
}

var bar = "bar2";
foo();  // bar2 (though the user actually wants 'bar1')

// when we call foo(), rule 4 applies, it's default binding on 'global' object
// which means that this.baz(line 8) is window.baz(browser) or global.baz(node).
// calling this.baz()(line 9) would call this.bar which is window.bar = bar2
// and not bar3.

// The lesson to learn here is, 'this' scoping works very differently then
// how variables are lexically scoped. There is no way to combine the 2.
