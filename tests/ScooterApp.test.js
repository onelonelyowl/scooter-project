const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// scooterapp creates scooterapp instance
describe('checking constructor for scooterapp', () => {
  test('ScooterApp class should create ScooterApp instance', () => {
    const testApp = new ScooterApp()
    expect(testApp).toBeInstanceOf(ScooterApp);
  })
  test('stations is initalised correctly', () => {
    const testApp = new ScooterApp()
    expect(testApp.stations).toEqual({brentford: [], ealing: [], acton: []})
  })
  test('registeredusers is initalised correctly', () => {
    const testApp = new ScooterApp()
    expect(testApp.registeredUsers).toEqual({})
  })
})

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
describe('testing logoutUser() method', () => {
  test('logs out user who is logged in successfully', () => {
    const testApp = new ScooterApp()
    let joebloggs = testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.loginUser("Joe Bloggs", "test123")
    testApp.logoutUser("Joe Bloggs")
    expect(joebloggs.loggedIn).toBe(false)
  })
  test('throws when trying to logout a user who is not logged in', () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
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
  test('works with all parameters being correct', () => {
    const testApp = new ScooterApp()
    let user = testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    testApp.rentScooter(scooter, user)
    expect(scooter.user).toBe(user)
  })
  test('throws an error when trying to rent a scooter that is not at a station', () => {
    const testApp = new ScooterApp()
    let user1 = testApp.registerUser("Joe Bloggs", "test123", 21)
    let user2 = testApp.registerUser("Joe Bloggs the Second", "test123", 21)
    testApp.createScooter("ealing")
    let scooter1 = testApp.stations["ealing"][0]
    testApp.rentScooter(scooter1, user1)
    expect(() => testApp.rentScooter(scooter1, user2)).toThrow()
  })
  test('throws an error when trying to rent a scooter to a user that does not exist', () => {
    const testApp = new ScooterApp()
    let user1 = testApp.registerUser("Joe Bloggs", "test123", 21)
    let user2 = testApp.registerUser("Joe Bloggs the Second", "test123", 21)
    testApp.createScooter("ealing")
    let scooter1 = testApp.stations["ealing"][0]
    testApp.rentScooter(scooter1, user1)
    expect(() => testApp.rentScooter(scooter1, user2)).toThrow()
  })
})


// dock scooter
describe('testing dockScooter()', () => {
  test('docks scooter when everything is in order', ()=> {
    const testApp = new ScooterApp()
    let user = testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    testApp.rentScooter(scooter, user)
    testApp.dockScooter(scooter, "brentford")
    expect(scooter.station).toBe("brentford")
  })
  //MAKE TEST SO SCOOTER CANNOT BE DOCKED IF IT IS ALREADY DOCKED AT STATION

})
const mockConsoleLog = jest.fn()
global.console.log = mockConsoleLog
describe('testing print()', () => {
  test('testing print()', () => {
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.registerUser("Joe Bloggs2", "test123", 21)
    testApp.registerUser("Joe Bloggs3", "test123", 21)
    testApp.createScooter("brentford")
    testApp.createScooter("ealing")
    testApp.createScooter("acton")
    testApp.print()
    expect(mockConsoleLog).toHaveBeenCalledWith('{"Joe Bloggs":{"username":"Joe Bloggs","password":"test123","age":21,"loggedIn":false},"Joe Bloggs2":{"username":"Joe Bloggs2","password":"test123","age":21,"loggedIn":false},"Joe Bloggs3":{"username":"Joe Bloggs3","password":"test123","age":21,"loggedIn":false}}')
  })
})
  // i just can't write a testing function for print()

