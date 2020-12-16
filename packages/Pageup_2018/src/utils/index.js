/**
 * Volume Calculation with arg check
 * @param {int} height 
 * @param {int} width 
 * @param {int} depth 
 */
const getVolume = (height = 0, width = 0, depth = 0) => {
    const isValid = checkInputs(height, width, depth);
    const volume = parseInt(height * width * depth);
    // utils.log(`Volume is: ${volume}`);
    
    return volume;
}

/**
 * Simple Input checker with output to cli on error
 * @param {*} height 
 * @param {*} width 
 * @param {*} depth 
 * @returns bool
 */
const checkInputs = (height, width, depth) => {
    const validHeight = checkNumber(height);
    const validWidth = checkNumber(width);
    const validDepth = checkNumber(depth);

    if (!validHeight || !validWidth || !validDepth) {
        utils.log(`Invalid input:\n Valid Height: ${validHeight}\n Valid Width: ${validWidth}\n Valid Depth: ${validDepth}`);
        return false;
    } else {
        return true;
    }
}

/**
 * Simple null & is number checker
 * @param {*} obj 
 */
const checkNumber = (obj) => {
    return Number.isInteger(obj);
};

/**
 * Simple abstraction around logger
 */
const utils = {
    log: (msg) => {
        console.log(msg);
    },
    getVolume,
    checkNumber,
    checkInputs,
};

export default utils;