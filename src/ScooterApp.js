const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(){
    this.stations = {brentford: [], ealing: [], acton: []}
    this.registeredUsers = {}
  }
  registerUser(username, password, age){
    if(age < 18) throw "Too young to register" // checks age
    for(user in this.registeredUsers){
      if(username == user) throw "already registered" // checks already registered
    }
    this.registeredUsers.name = new User(username, password, age) // adds user
    console.log("user has been registered") 
    return this.registeredUsers.name
  }
  loginUser(username, password){
    try{
    let user = this.registeredUsers[username]
    user.login(password)
    }
    catch(err){
      throw "username or password is incorrect"
    }
  }
  logoutUser(username){
    try{
      let user = this.registeredUsers[username]
      user.logout()
    }
    catch(err){
      throw "no such user is logged in"
    }
  }
  createScooter(station){
    let stationFound = false;
    for(const x in stations){
      if(x === station){
        stationFound = true;
      }
    }
    if(stationFound === false) throw "no such station"
    let scooter = new Scooter(station)
    console.log("created new scooter")
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
