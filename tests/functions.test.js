const functions = require('./functions');


test('adds 1 + 2 to equal 3', () => {
  expect(functions.sum(1, 2)).toBe(3);
});

// Mock functions allow you to test the links between code by erasing the 
// actual implementation of a function, capturing calls to the function 
// (and the parameters passed in those calls), capturing instances of 
// constructor functions when instantiated with new, and allowing test-time 
// configuration of return values.

test('tests forEach function',()=> {
  const mockCallback = jest.fn(x => 42 + x);
  functions.forEach([0, 1], mockCallback);
  
  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);
  
  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  
  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);
  
  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
})

// the complete doccumentation can be found here https://jestjs.io/docs/en/getting-started
