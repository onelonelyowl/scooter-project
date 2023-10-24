class User {
  constructor(username, password, age){
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }
  login(password){
    // if password is correct, turn loggedin to true, else throw incorrect password error
  }
  logout(){
    this.loggedIn = false;
  }
}
module.exports = User
