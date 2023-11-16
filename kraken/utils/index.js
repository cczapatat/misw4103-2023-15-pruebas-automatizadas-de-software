const validateVersion = () => process.env.VERSION === '5.68.0'

module.exports = { validateVersion : validateVersion() }