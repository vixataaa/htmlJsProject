const passHashGenerator = function() {
    function generateHash(text) {
        return CryptoJS.SHA1(text).toString();
    }

    return {
        generateHash : generateHash
    };
};

export { passHashGenerator };