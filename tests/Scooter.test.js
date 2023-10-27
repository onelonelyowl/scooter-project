const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test("scooter initialises with the correct values", () => {
    const scooter = new Scooter('brentford')
    expect(scooter).toEqual(
      {station: 'brentford', user: null, serial: 1, charge: 100, isBroken: false}
    )
  })
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter('brentford');
    expect(scooter).toBeInstanceOf(Scooter);
  });
  test('scooter throws an error if no station passed to constructor', () => {
    expect(() => {const scooter = new Scooter()}).toThrow();
  })
})

//Method tests
describe('scooter methods', () => {
  //requestRepair method
  test('requestRepair', async () => {
    const scooter = new Scooter('brentford');
    scooter.isBroken = true;
    await scooter.requestRepair();
    expect(scooter.isBroken).toBe(false);
  }, 10000) 

  //recharge method
  test("recharge", async () => {
    const scooter = new Scooter('brentford');
    scooter.charge = 18;
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
  });
  test("if charge is already at 100 recharge throws error", async () => {
    const scooter = new Scooter('brentford');
    scooter.charge = 100;
     // we need to wait for the charge!
     expect.assertions(1);
     return scooter.recharge().catch(e => expect(e).toMatch('scooter is already charged')) // just took this off jest wiki
    // expect(() => scooter.recharge()).toThrow();
  });
  test('rent throws when charge is <= 20', () => {
    const scooter = new Scooter('brentford');
    scooter.charge = 18;
    expect(() => scooter.rent("bazza")).toThrow()

  })
  test('rent throws when scooter is broken', () => {
    const scooter = new Scooter('brentford');
    scooter.isBroken = true;
    expect(() => scooter.rent("bazza")).toThrow();
  })
  // maybe test for if rent() changes station and user correctly
  test('when renting, adjusts station and user correctly', () => {
    const scooter = new Scooter('brentford')
    scooter.serial = 1
    scooter.rent('jeff')
    expect(scooter).toEqual({station: null, user: 'jeff', serial: 1, charge: 100, isBroken: false})
  })
  test('when docking, adjusts station and user correctly', () => {
    const scooter = new Scooter('brentford')
    scooter.serial = 1
    scooter.rent('jeff')
    scooter.dock('acton')
    expect(scooter).toEqual({station: 'acton', user: null, serial: 1, charge: 100, isBroken: false})
  })
  test('dockScooter throws if no station specified', () => {
    const scooter = new Scooter('brentford')
    scooter.rent('jeff')
    expect(() => scooter.dock()).toThrow();
  })
  test("can't dock scooter if scooter is already present at station", () => {
    const scooter = new Scooter('brentford')
    scooter.serial = 1
    scooter.rent('jeff')
    scooter.dock('acton')
    expect(() => scooter.dock('acton')).toThrow()
  })
})
