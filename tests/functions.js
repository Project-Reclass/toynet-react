function sum(a, b) {
    return a + b;
  }

  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }


  module.exports = {
    sum,
    forEach
  }

