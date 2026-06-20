// This module's purpose: Print to the console

// print normal log messages
const info = (...params) => {
  console.log(...params)
}

// print all error messages
const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
