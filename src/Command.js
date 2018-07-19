/* eslint camelcase: 0 */

const ParkingLot = require('./ParkingLot')

const commands = {
  create_parking_lot: true,
  park: true,
  leave: true,
  status: true,
  registration_numbers_for_cars_with_colour: true,
  slot_numbers_for_cars_with_colour: true,
  slot_number_for_registration_number: true
}

class Command {
  constructor () {
    this.parkingLot = null
  }

  /**
   * Create/Override parking lot object.
   * There can be only one instance per application.
   * Singleton pattern.
   * @param  {Number} capacity
   */
  static create_parking_lot (capacity) {
    const capacityNum = parseInt(capacity, 10)
    if (isNaN(capacityNum)) {
      return console.log(`Invalid slot capacity ${capacityNum}`)
    }
    this.parkingLot = new ParkingLot(capacityNum)
    console.log(`Created a parking lot with ${capacity} slots`)
  }

  /**
   * Park Command
   * @param {string} numberPlate
   * @param {string} colour
   */
  static park (numberPlate, colour) {
    try {
      const slot = this.parkingLot.park(numberPlate, colour)
      console.log(`Allocated slot number: ${slot}`)
    } catch (e) {
      console.log(e.message)
    }
  }

  /**
   * Leave Command
   * @param  {string} slot
   */
  static leave (slot) {
    const slotNum = parseInt(slot, 10)
    if (isNaN(slotNum)) {
      return console.log(`Invalid slot number ${slot}`)
    }
    try {
      this.parkingLot.leave(slotNum)
      console.log(`Slot number ${slotNum} is free`)
    } catch (e) {
      console.log(e.message)
    }
  }

  /**
   * status Command
   */
  static status () {
    this.parkingLot.status()
  }

  /**
   * registration_numbers_for_cars_with_colour command
   * @param  {String} colour
   */
  static registration_numbers_for_cars_with_colour (colour) {
    const result = this.parkingLot.numberPlatesByColor(colour)
    if (result.length) {
      console.log(result.join(', '))
    } else {
      console.log('Not found')
    }
  }

  /** slot_numbers_for_cars_with_colour command
   * @param  {String} colour
   */
  static slot_numbers_for_cars_with_colour (colour) {
    const result = this.parkingLot.slotsByColour(colour)
    if (result.length) {
      console.log(result.join(', '))
    } else {
      console.log('Not found')
    }
  }

  /**
   * slot_number_for_registration_number command
   * @param  {String} numberPlate
   */
  static slot_number_for_registration_number (numberPlate) {
    const result = this.parkingLot.slotByNumberPlate(numberPlate)
    if (result) {
      console.log(result)
    } else {
      console.log('Not found')
    }
  }

  /**
   * parse command and run
   * @param  {[type]}
   * @return {[type]}
   */
  static command (cmd) {
    const tokens = cmd.split(' ')
    const verb = tokens.shift()

    if (commands[verb] && Command.hasOwnProperty(verb) && typeof Command[verb] === 'function') {
      Command[verb].apply(this, tokens)
    } else {
      console.log('usage: command [options]')
      console.log('Where commands are:')
      console.log(Object.keys(commands).join('\n'))
    }
  }
}

module.exports = Command
