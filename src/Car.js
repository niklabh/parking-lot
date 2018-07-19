/**
 * Class Representing Car being parked.
 * Contains Registration Number and Colour of the Car.
 */
class Car {
  /**
   * Create a Car
   * @param  {String} numberPlate - Registration Number of the car
   * @param  {String} colour - Colour of the Car
   */
  constructor (numberPlate, colour) {
    this.numberPlate = numberPlate
    this.colour = colour
  }
}

module.exports = Car
