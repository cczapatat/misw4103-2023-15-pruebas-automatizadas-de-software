const validateVersion = () => process.env.VERSION === '5.68.0'.trim()

module.exports = { validateVersion }