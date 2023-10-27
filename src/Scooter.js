class Scooter{
  static nextSerial = 1; // nextSerial is declared as static so that each scooter can have their own unique serial number
  constructor(station){
    if(!station) throw "no station provided, therefore cannot build Scooter" // making sure that each scooter is initalised with the correct values
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++ // after declaring the serial number, we iterate
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user){ // user has already been checked by scooterapp so not necessary here
    if(this.charge <= 20) throw "charge is below 20% so scooter cannot be rented" // checks for charge 
    if(this.isBroken === true) throw "scooter is broken and needs repair so cannot be rented" // checks if scooter is broken
    // could automatically call requestRepair if scooter is attempted to be rented but broken
    this.user = user; 
    this.station = null;
  }
  dock(station){ // this function is called by scooterapp when a user tries to dock a scooter at a station, scooterapp checks that station
    if(!station) throw "no station passed" // checks that the method hasn't been called incorrectly
    if(this.station === station) throw "scooter already present at station" // scooterapp also check if the scooter is at the station but can't hurt to double check
    this.user = null;
    this.station = station;
  }
    // use setinterval to schedule repair in 5s, set isbroken to false after this time, then change isbroken to false
  async requestRepair(){
    if(this.isBroken === false) throw "scooter is not broken" // throws an error when someone tries to repair a scooter that isn't broken
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.isBroken = false;
        if (this.isBroken === false) {
          clearInterval(interval);
          resolve();
        }
      }, 5000);
    }); // i used google bard to help me write this, as I couldn't figure out the syntax of promises and clearInterval etc. 
    }

  async recharge() { // asychronous functions confuse me a bit, but this was taken from the brief
    if(this.charge === 100) throw "scooter is already charged" // throws error if scooter is already charged
    console.log('Starting charge');
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
  }
}
module.exports = Scooter
