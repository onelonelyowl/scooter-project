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
  test("scooter can be created and looks okay", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("brentford")
    expect(testApp.stations["brentford"]).toHaveLength(1)
  })
});

// log in

// log out

// rent scooter

// dock scooter
