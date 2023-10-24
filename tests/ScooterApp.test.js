const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    const testApp = new ScooterApp()
    let response = testApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
  test("Should block under eighteens", () => {
    const testApp = new ScooterApp()
    expect(() => testApp.registerUser("Joe Bloggz", "test123", 16)).toThrow()
  });
  test("Should throw error on duplicate name", () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Brouges", "test123", 21);
    expect(() => {testApp.registerUser("Joe Brouges", "password", 25)}).toThrow();
  });
});
describe('createScooter tests', () => {
  test("scooter can be created and looks okay", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("brentford")
    expect(testApp.stations["brentford"]).toHaveLength(1)
  })
})

// log in

// log out

// rent scooter

// dock scooter
