/**
 * Class Representing parking Slot.
 * Contain car and previous and next free space pointers.
 */
class Slot {
  /**
   * Create a Slot
   * @param  {Number} prev - Previous free space index
   * @param  {Number} next - Next free space index
   */
  constructor (prev, next) {
    this.car = null
    this.prev = prev
    this.next = next
  }
}

module.exports = Slot
