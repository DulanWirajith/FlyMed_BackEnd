exports.print = (state, message) => {
    if (state == 'info') {
        console.info(message);
    } else if (state == 'success') {
        console.log(message)
    } else {
        console.error(message);
    }
};