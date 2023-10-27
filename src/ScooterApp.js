const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(){
    this.stations = {brentford: [], ealing: [], acton: []}
    this.registeredUsers = {}
  }
  registerUser(username, password, age){ // method to register a new user
    if(age < 18) throw "Too young to register" // checks age
    for(const user in this.registeredUsers){
      if(username == user) throw "already registered" // checks already registered
    }
    if(typeof username !== "string") throw "username is not a string" // check that values passed to registerUser are of the correct type before registering the user
    if(typeof password !== "string") throw "password is not a string" 
    if(typeof age !== "number") throw "age is not a number"
    this.registeredUsers[username] = new User(username, password, age) // adds user
    console.log(`${username} has been registered`) // logs to console
    return this.registeredUsers[username] // returns the user in the registeredUsers object
  }
  loginUser(username, password){ // function to log the user in
    let user = this.registeredUsers[username]
    if(user.loggedIn === true) throw "user is already logged in" // checks to see if the user is already logged in
    try{
    user.login(password) // calls the user login method, which has its own tests
    }
    catch(err){
      throw "user login function failed"
    }
  }
  logoutUser(username){ // method to log the user out
    let user = this.registeredUsers[username]
    if(user === null || user === undefined) throw "user not found" // checks that the user exists
    if(user.loggedIn === false) throw "user is already logged out" // checks if user is already logged out
    user.logout() // calls user.logout()
  }
  createScooter(station){ // method to create a new scooter at a specified station
    let stationFound = false;
    for(const x in this.stations){
      if(x === station){ // finds the station matching the one passed to the method
        stationFound = true;
        this.stations[x].push(new Scooter(x)) // adds a new scooter
        console.log(`created new scooter with serial number #${x.serial}`) // logs to the console
      }
    }
    if(stationFound === false) throw "no such station" // if the station cannot be found, then throw an error
  }
  dockScooter(scooter, station){
    let stationFound = false;
    for(const x in this.stations){ // checks to see if the station that has been passed is a real station
      if(x === station){
        stationFound = true;
      }
    }
    if(!(scooter instanceof Scooter)) throw ("scooter is not of the Scooter class") // checks that the scooter passed is a real scooter
    if(stationFound === false) throw "no such station"
    let scootersAtStation = this.stations[station]
    for(const x of scootersAtStation){
      if(x.serial === scooter.serial) throw "scooter already at station" // if the scooter is already at the station then throws an error as this can end up duplicating scooters
    }
    scooter.dock(station) // calls scooter.dock() method
    this.stations[station].push(scooter) // adds scooter to the correct station
    console.log(`scooter #${scooter.serial} has been docked at ${station}`) // logs this to the console
  }
  rentScooter(scooter, user){ // need to implement a check that the user passed is a real user as opposed to just some string
    let foundScooter;
    if(!(user instanceof User)) throw "user passed is not of the User class"  // checks that user parameter is of the User class
    if(user.loggedIn === false) throw "user is not logged in" // checks that the user is logged in before they can rent

    for(const station in this.stations){
      for(const x of this.stations[station]){
        if(x.serial === scooter.serial){ // loops through the stations to find the matching scooter by serial number
          foundScooter = 1;
          let index = this.stations[station].indexOf(x) 
          x.rent(user) // calls the scooter.rent() method with the user which sets station to null and user to user
          this.stations[station].splice(index, 1) // removes the scooter from the stations array
          console.log(`scooter #${scooter.serial} has been rented from ${station}`) // logs to console
        }
      }
    }
    if(foundScooter !== 1) throw "scooter is not present at any station" // throws if scooter cannot be found
}
  print(){
    console.log(JSON.stringify(this.registeredUsers, this.stations)) // prints relevant information for debugging
  }
}

module.exports = ScooterApp
