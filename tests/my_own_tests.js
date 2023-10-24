const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

    const testApp = new ScooterApp()
    testApp.registerUser("Joe Bloggs", "test666", 22);
    testApp.registerUser("Joe Bloggz", "test163", 27);
    console.table(testApp.registeredUsers)
    let response = testApp.registerUser("Joe Bloggy", "test123", 21)
    console.log(response)
