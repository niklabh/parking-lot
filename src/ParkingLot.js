const Car = require('./Car')
const Slot = require('./Slot')

/**
 * Class representing Parking Lot.
 * Contains parking lot operations.
 */
class ParkingLot {
  /**
   * Create a Parking Lot
   * @param  {Number} capacity - Parking Lot capacity
   */
  constructor (capacity) {
    // Array of slots starting from index 1
    this.slots = []
    // Map of number-plates -> slot
    this.numberPlates = {}
    // Map of colours -> set of slots
    this.colours = {}
    // First Available Slot
    this.first = 1
    // Number of cars parked
    this.cars = 0
    // Capacity of lot
    this.capacity = capacity
    // initialised empty lot with capacity
    // slots are from 1 to capacity
    // 0 and last elements are empty slots
    for (let i = 0; i <= capacity + 1; i++) {
      this.slots.push(new Slot(i - 1, i + 1))
    }
  }

  /**
   * Check parking lot full or not
   * @return {Boolean}
   */
  full () {
    return this.cars === this.capacity
  }

  /**
   * Allocate a slot to a car
   * @param  {String} numberPlate - Registration Number of the car
   * @param  {String} colour - Colour of the Car
   * @return {Number} - slot number allocated
   */
  park (numberPlate, colour) {
    // Get the first free nearest slot
    const index = this.first
    const slot = this.slots[index]
    // throw error if numberPlate car already parked
    if (this.numberPlates[numberPlate]) {
      throw new Error(`Car ${numberPlate} Already parked`)
    }
    // throw error if Parking lot is full
    if (this.full()) {
      throw new Error('Sorry, parking lot is full')
    }
    // allocate car
    slot.car = new Car(numberPlate, colour)
    // set first to next available slot
    this.first = slot.next
    // set free list pointers
    this.slots[slot.prev].next = slot.next
    this.slots[slot.next].prev = slot.prev
    // set number plate map
    this.numberPlates[numberPlate] = index
    // Create colour Set
    if (!this.colours[colour]) { this.colours[colour] = new Set() }
    // Add slot index to colour set
    this.colours[colour].add(index)
    // Increment cars
    this.cars++

    return index
  }

  /**
   * Leave parking lot
   * @param  {Number} slot - Allocated slot number
   */
  leave (index) {
    // Get the slot to be freed
    const slot = this.slots[index]
    // return if no car on the slot
    if (!slot.car) return
    // set free list pointers
    this.slots[slot.prev].next = index
    this.slots[slot.next].prev = index
    // set first
    if (this.first > index) { this.first = index }
    // delete from numberPlates map
    delete this.numberPlates[slot.car.numberPlate]
    // delete from colours set
    this.colours[slot.car.colour].delete(index)
    // delete car from slot
    slot.car = null
    // Decrement cars
    this.cars--
  }

  /**
   * Get Registration Numbers by colour
   * @param  {String} colour - colour of the cars
   * @return {Array(String)} - Array of Registration Numbers
   */
  numberPlatesByColor (colour) {
    if (this.colours[colour]) {
      return Array.from(this.colours[colour]).map(index => this.slots[index].car.numberPlate)
    } else {
      return []
    }
  }

  /**
   * Get Slot numbers by colour
   * @param  {String} colour - colour of the cars
   * @return {Array(Number)} - Array of slot numbers
   */
  slotsByColour (colour) {
    if (this.colours[colour]) {
      return Array.from(this.colours[colour])
    } else {
      return []
    }
  }

  /**
   * Get Slot Number by Registration Number
   * @param  {String} numberPlate - Registration Number of the car
   * @return {Number} - slot number of the parked car
   */
  slotByNumberPlate (numberPlate) {
    return this.numberPlates[numberPlate]
  }

  /**
   * Show status
   */
  status () {
    console.log('Slot No.\tRegistration No\tColour')
    for (let i = 1; i <= this.capacity; i++) {
      if (this.slots[i].car) {
        console.log([i, this.slots[i].car.numberPlate, this.slots[i].car.colour].join('\t'))
      }
    }
  }
}

module.exports = ParkingLot
