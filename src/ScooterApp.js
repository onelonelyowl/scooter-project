const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(){
    this.stations = {brentford: [], ealing: [], acton: []}
    this.registeredUsers = {}
  }
  registerUser(username, password, age){
    if(age < 18) throw "Too young to register" // checks age
    let keys = Object.keys(this.registeredUsers)
    for(const user in this.registeredUsers){
      if(username == user) throw "already registered" // checks already registered
    }
    this.registeredUsers[username] = new User(username, password, age) // adds user
    console.log("user has been registered") 
    return this.registeredUsers[username]
  }
  loginUser(username, password){
    let user = this.registeredUsers[username]
    if(user.loggedIn === true) throw "user is already logged in"
    try{
    user.login(password)
    }
    catch(err){
      throw "user login function failed"
    }
  }
  logoutUser(username){
    let user = this.registeredUsers[username]
    if(user === null || user === undefined) throw "user not found"
    if(user.loggedIn === false) throw "user is already logged out"
    user.logout()
  }
  createScooter(station){
    let stationFound = false;
    for(const x in this.stations){
      if(x === station){
        stationFound = true;
        this.stations[x].push(new Scooter(x))
        console.log("created new scooter")
      }
    }
    if(stationFound === false) throw "no such station"
  }
  dockScooter(scooter, station){
    let stationFound = false;
    for(const x in stations){
      if(x === station){
        stationFound = true;
      }
    }
    if(stationFound === false) throw "no such station"
    // need to check if a scooter matching that serial number is at this station already
    let scootersAtStation = this.stations[station]
    for(const x of scootersAtStation){
      if(x.serial === scooter.serial) throw "scooter already at station"
    }
    this.stations[station].push(scooter)
    console.log("scooter is docked")
  }
  rentScooter(scooter, user){
    let foundScooter;
    for(station of this.stations){
      for(x of station){
        if(x.serial === scooter.serial){
          let index = this.stations[station].indexOf(x)
          this.stations[station].splice(index, 1)
          x.user = user;
        }
        else{
          throw "scooter already rented"
        }
      }
    }
  }
  print(){
    console.log(this.registeredUsers)
    console.table(this.stations)
  }
}

module.exports = ScooterApp
