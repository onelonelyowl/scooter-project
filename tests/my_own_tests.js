const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
/*
    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test666", 22);
    testApp.registerUser("Joe Bloggz", "test163", 27);
    console.table(testApp.registeredUsers)
    let response = testApp.registerUser("Joe Bloggy", "test123", 21)
    console.log(response)
*/

/*
const testApp = new ScooterApp()
    testApp.createScooter("ealing")
    testApp.createScooter("ealing")
    testApp.createScooter("ealing")
    testApp.createScooter("ealing")
    testApp.createScooter("ealing")
    testApp.createScooter("ealing")
    let serials = [];
    for(const x of testApp.stations["ealing"]){
        serials.push(x.serial)
    }
    let scooter = testApp.stations["ealing"][3]
    console.dir(serials)
    console.log(scooter.serial)
*/
/*
const testApp = new ScooterApp()
    let user = testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.createScooter("ealing")
    let scooter = testApp.stations["ealing"][0]
    testApp.rentScooter(scooter, user)
    console.table(scooter)
*/
/*
const init = new User("Testing the name", "Testing the password", 21)
console.log(init)
*/

const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test123", 21)
    testApp.registerUser("Joe Bloggs2", "test123", 21)
    testApp.registerUser("Joe Bloggs3", "test123", 21)
    testApp.createScooter("brentford")
    testApp.createScooter("ealing")
    testApp.createScooter("acton")
testApp.print()

/*
const scooter = new Scooter('brentford')
    scooter.rent('jeff')
    console.log(scooter)

    */