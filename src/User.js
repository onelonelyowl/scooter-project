class User {
  constructor(username, password, age){ // values have been checked in teh ScooterApp.registerUser() function so no need to check them here.
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }
  login(passedPassword){ // this method logs this user in
    if(this.loggedIn === true) throw "user is already logged in" // checks if user is logged in already, not that it would matter, as nothing would change other than running 3 lines
    if(passedPassword !== this.password) throw "Incorrect password" // checks if the password is correct
    this.loggedIn = true; // logs user in
  }
  logout(){
    if(this.loggedIn = false) throw "user is already logged out" // checks if user is already logged out, then throws error, as something has probably gone wrong if someone is trying to log someone out who is already logged out
    this.loggedIn = false;
  }
}
module.exports = User
