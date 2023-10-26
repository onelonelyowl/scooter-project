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
  test("User should initalise as not logged in", () => {
    const testApp = new ScooterApp()
    let response = testApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response.loggedIn).toBe(false);
  });
});

//createScooter()
describe('createScooter tests', () => {
  test("increases serial with each scooter", () => {
    const testAppSerial = new ScooterApp()
    testAppSerial.createScooter("ealing")
    testAppSerial.createScooter("ealing")
    let scooters = [];
    for(const x of testAppSerial.stations["ealing"]){
      scooters.push(x)
    }
    expect(scooters[1]).toHaveProperty('serial', 2)
  })
  test("scooter can be created and looks okay", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("brentford")
    expect(testApp.stations["brentford"]).toHaveLength(1)
  })
  test("throws an error if station does not exist", () => {
    const testApp = new ScooterApp()
    expect(() => testApp.createScooter("brentwood")).toThrow()
  }) 
  test("scooter initialises with .user = null", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    expect(scooter.user).toBeNull()
  })
  test("scooter initialises with charge = 100", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    expect(scooter.charge).toBe(100)
  })
  test("scooter initialises with isBroken = false", () => {
    const testApp = new ScooterApp()
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    expect(scooter.charge).toBe(100)
  })
})


// loginUser()
describe("testing loginUser() method", () => {
  test('logs in a user with the correct password', () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.loginUser("Joe Bloggs", "test123")
    expect(testApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(true)
  })
  test('throws when using an incorrect password', () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
    expect(() => testApp.loginUser("Joe Bloggs", "incorrect_pw")).toThrow()
  })
  test('throws when using a non-existent user', () => {
    const testApp = new ScooterApp()
    expect(() => testApp.loginUser("Joe Bloggs", "incorrect_pw")).toThrow()
  })
})


//logOut()
describe('testing ScooterApp.logOut()', () => {
  test('logs out user who is logged in successfully', () => {
    const testApp = new ScooterApp()
    let joebloggs = testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.loginUser("Joe Bloggs", "test123")
    testApp.logoutUser("Joe Bloggs")
    expect(joebloggs.loggedIn).toBe(false)
  })
  test('throws when trying to logout a user who is not logged in', () => {
    const testApp = new ScooterApp()
    let joebloggs = testApp.registerUser("Joe Bloggs", "test123", 21)
    expect(() => testApp.logoutUser("Joe Bloggs")).toThrow()
  })
  test('throws when passing an invalid name', () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
    expect(() => testApp.logoutUser("Fake User")).toThrow()
  })
})

// rent scooter
describe('testing rentScooter()', () => {
  test('test1', ()=> {

  })

})


// dock scooter
describe('testing dockScooter()', () => {
  test('test1', ()=> {
    
  })

})

