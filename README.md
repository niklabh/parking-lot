Parking Lot Application
=====================

This application is a command line tool for managing parking lot. The problem is given in [PROBLEM.md](PROBLEM.md).
The code is in node.js version v8.5.0. Please install node from https://nodejs.org before running ./parking_lot. parking_lot is the bash script which is doing the following tasks:
- install dev dependencies for testing
- checking and fixing code format
- running test suite
- running application
If there is input file provided as:
```
> ./parking_lot test/testcase
```
It will parse the file otherwise it will run a interactive shell for inputting commands.

##Architecture

Solution has implemented 4 classes:
- Car        To keep track of registration number and colour
- Slot       To keep track of parking slots
- ParkingLot Main Parking lot logic
- Command    For running application with commands

Each slot has a prev and next pointers to corresponding empty space to create a free list

```
--    -------  --  --  --
    O   x  x  O   O  O
--    -------  --  --  --
    |
    |
   first
```

Here x are filled slots and O are empty slots. Empty slots are connected to each other as a doubly linked list. first points to first available free slot. Time Complexities of park and leave are O(1).
HashMaps of registration number to slot numbers and Colours to set of slot numbers are maintained to get the registration_numbers_for_cars_with_colour, slot_numbers_for_cars_with_colour, slot_number_for_registration_number efficiently.

##Running

- Install node.js. from https://nodejs.org
- Run:
```
> ./parking_lot
```
or
```
> ./parking_lot test/testcase
```

##Tests
Test cases are written in mocha with chai assertion.

##Linting
Code has followed eslint standard formatting guidelines/

##Author
- Nikhil Ranjan
- niklabh811@gmail.com
