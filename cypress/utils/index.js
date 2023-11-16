const validateVersion = () => {
    const validation = process.env.VERSION === '5.68.0'

    console.log(validation)

    return validation
}

module.exports = {validateVersion}