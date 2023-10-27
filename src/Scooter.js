class Scooter{
  static nextSerial = 1;
  constructor(station){
    if(!station) throw "no station provided, can't build Scooter"
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user){
    if(this.charge <= 20) throw "charge is below 20% so scooter cannot be rented"
    if(this.isBroken === true) throw "scooter is broken and needs repair so cannot be rented"
    this.user = user;
    this.station = null;
  }
  dock(station){
    if(!station) throw "no station passed"
    if(this.station === station) throw "scooter already present at station"
    this.user = null;
    this.station = station;
  }
    // use setinterval to schedule repair in 5s, set isbroken to false after this time, then change isbroken to false
  async requestRepair(){
    if(this.isBroken === false) throw "scooter is not broken"
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.isBroken = false;
        if (this.isBroken === false) {
          clearInterval(interval);
          resolve();
        }
      }, 5000);
    });
    }

  async recharge() {
    if(this.charge === 100) throw "scooter is already charged"
    console.log('Starting charge');
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
  }
}
module.exports = Scooter
