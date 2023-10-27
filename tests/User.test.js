const User = require('../src/User');

const user = new User("Joe Bloggs", "test123", 21);

// User tests here
describe("User property tests", () => {
  //typeof scooter === object
  test('User class should create User instance', () => {
    expect(user).toBeInstanceOf(User);
  })
  test('user initialises with expected values', () => {
    const init = new User("Testing the name", "Testing the password", 21)
    expect(init).toEqual({username: 'Testing the name', password: 'Testing the password', age: 21, loggedIn: false})
  })
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  })
  // test password
  test("expect password to be a string", () => {
    expect(typeof user.password).toBe("string");
  })
  // test age
  test("expect age to be a number", () => {
    expect(typeof user.age).toBe("number");
  })
  // test loggedIn
  test("expect loggedIn to be boolean", () => {
    expect(typeof user.loggedIn).toBe("boolean");
  })

})


describe('User method tests', () => {
  //method tests
  // test login
  test("logs user in successfully when using correct password", () => {
    user.login("test123")
    expect(user.loggedIn).toBe(true)
  })
  test("login does not login with incorrect password", () => {
    expect(() => user.login("wrong_pw")).toThrow()
  })
  // test logout
  test("logs user out successfully", () => {
    user.logout()
    expect(user.loggedIn).toBe(false)
  })
})