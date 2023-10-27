class User {
  constructor(username, password, age){
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }
  login(passedPassword){
    if(this.loggedIn === true) throw "user is already logged in"
    if(passedPassword !== this.password) throw "Incorrect password"
    else{
      this.loggedIn = true;
    }
  }
  logout(){
    if(this.loggedIn = false) throw "user is already logged out"
    this.loggedIn = false;
  }
}
module.exports = User
