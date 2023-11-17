const validateVersion = () => {
    const validation = process.env.VERSION.trim() == '5.68.0'  

    return validation
}

module.exports = {validateVersion}