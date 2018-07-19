const readline = require('readline')

const Command = require('./src/Command')

const file = process.argv[2]

// parse file line by line and issue commands
function processFile () {
  const lineReader = readline.createInterface({
    input: require('fs').createReadStream(file)
  })

  lineReader.on('line', function (line) {
    Command.command(line)
  })
}

// Interactively ask commands
function question (rl) {
  rl.question('Input:\n', (answer) => {
    Command.command(answer)
    question(rl)
  })
}

// Prompt user for commands
function prompt () {
  console.log('#### Car parking ####')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  question(rl)
}

// Run from command line
if (require.main === module) {
  if (file) {
    processFile()
  } else {
    prompt()
  }
}
