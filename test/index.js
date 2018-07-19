/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect // we are using the "expect" style of Chai
const ParkingLot = require('../src/ParkingLot')
const Command = require('../src/Command')

describe('ParkingLot', () => {
  describe('Normal Operations', () => {
    const capacity = 10
    const lot = new ParkingLot(capacity)
    it('should Create parking Lot', () => {
      // will have n + 1 (0 index free) slots
      expect(lot.capacity).to.equal(capacity)
    })
    it('should allocate parking space', () => {
      lot.park('KA-01-P-333', 'White')
      expect(lot.slots[1].car.numberPlate).to.equal('KA-01-P-333')
      expect(lot.slots[1].car.colour).to.equal('White')
    })
    it('should deallocate parking space', () => {
      lot.leave(1)
      expect(lot.slots[1].car).to.equal(null)
    })
    it('should give Registration Numbers by colour', () => {
      lot.park('KA-01-P-333', 'White')
      lot.park('KD-03-P-343', 'White')
      lot.park('DL-12-AA-9999', 'Black')
      expect(lot.numberPlatesByColor('White')).to.have.all.members(['KA-01-P-333', 'KD-03-P-343'])
    })
    it('should give Slot numbers by colour', () => {
      expect(lot.slotsByColour('White')).to.have.all.members([1, 2])
    })
    it('should give Slot Number by Registration Number', () => {
      expect(lot.slotByNumberPlate('KA-01-P-333')).to.equal(1)
    })
    it('should track nearest free slot', () => {
      expect(lot.first).to.equal(4)
      lot.leave(2)
      expect(lot.first).to.equal(2)
    })
    it('should allocate nearest free slot', () => {
      lot.leave(3)
      expect(lot.first).to.equal(2)
      lot.park('EE-31-P-332', 'White')
      expect(lot.slotByNumberPlate('EE-31-P-332')).to.equal(2)
      expect(lot.first).to.equal(3)
    })
    it('should print status', () => {
      lot.status()
      expect(2).to.equal(2)
    })
  })

  describe('Invalid Operations', () => {
    const capacity = 2
    const lot = new ParkingLot(capacity)
    it('should not throw error when leaving empty car parking', () => {
      lot.leave(1)
      expect(lot.slots[1].car).to.equal(null)
    })
    it('should not throw error when empty on Registration Numbers by colour', () => {
      expect(lot.numberPlatesByColor('White')).to.have.all.members([])
    })
    it('should not throw error when empty on Slot numbers by colour', () => {
      expect(lot.slotsByColour('White')).to.have.all.members([])
    })
    it('should not throw error when empty on Slot Number by Registration Number', () => {
      expect(lot.slotByNumberPlate('KA-01-P-333')).to.equal(undefined)
    })
    it('should throw error when 2 Registration Numbers are same', () => {
      try {
        lot.park('KA-01-P-333', 'White')
        lot.park('KA-01-P-333', 'White')
      } catch (e) {
        expect(e.message).to.contains('Already')
      }
    })
    it('should throw error Parking lot is full', () => {
      try {
        lot.park('EE-31-P-333', 'White')
      } catch (e) {
        console.log(e)
        expect(e.message).to.contains('full')
      }
    })
  })

  /**
   * Parking lot operations given in test case
   */
  describe('Command', () => {
    it('create_parking_lot 6', () => {
      Command.command('create_parking_lot 6')
    })
    it('park KA-01-HH-1234 White', () => {
      Command.command('park KA-01-HH-1234 White')
    })
    it('park KA-01-HH-9999 White', () => {
      Command.command('park KA-01-HH-9999 White')
    })
    it('park KA-01-BB-0001 Black', () => {
      Command.command('park KA-01-BB-0001 Black')
    })
    it('park KA-01-HH-7777 Red', () => {
      Command.command('park KA-01-HH-7777 Red')
    })
    it('park KA-01-HH-2701 Blue', () => {
      Command.command('park KA-01-HH-2701 Blue')
    })
    it('park KA-01-HH-3141 Black', () => {
      Command.command('park KA-01-HH-3141 Black')
    })
    it('leave 4', () => {
      Command.command('leave 4')
    })
    it('status', () => {
      Command.command('status')
    })
    it('park KA-01-P-333 White', () => {
      Command.command('park KA-01-P-333 White')
    })
    it('park DL-12-AA-9999 White', () => {
      Command.command('park DL-12-AA-9999 White')
    })
    it('registration_numbers_for_cars_with_colour White', () => {
      Command.command('registration_numbers_for_cars_with_colour White')
    })
    it('slot_numbers_for_cars_with_colour White', () => {
      Command.command('slot_numbers_for_cars_with_colour White')
    })
    it('slot_number_for_registration_number KA-01-HH-3141', () => {
      Command.command('slot_number_for_registration_number KA-01-HH-3141')
    })
    it('slot_number_for_registration_number MH-04-AY-1111', () => {
      Command.command('slot_number_for_registration_number MH-04-AY-1111')
    })
  })
})
