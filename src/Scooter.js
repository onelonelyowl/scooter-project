class Scooter{
  static nextSerial = 1;
  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user){
    // check for >20% charge and not broken, then link to scooterapp to rent to the user.
  }
  dock(station){
    // need to link to dockScooter in scooterapp, refencing this scooter, then the station from the func as the arguments
  }
  recharge(){
    // idk if this is th same as charge
  }
  requestRepair(){
    // use setinterval to schedule repair in 5s, set isbroken to false after this time, then change isbroken to false
  }

  async charge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
  }
}
module.exports = Scooter
