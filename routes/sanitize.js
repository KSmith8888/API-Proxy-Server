function sanitizeChars(userInput) {
    if (
        userInput.includes("<") ||
        userInput.includes(">") ||
        userInput.includes("`") ||
        userInput.includes("{") ||
        userInput.includes("}") ||
        userInput.includes("=") ||
        userInput.includes("&") ||
        userInput.includes(";") ||
        userInput.includes("(") ||
        userInput.includes(")") ||
        userInput.includes("|") ||
        userInput.includes("/") ||
        userInput.includes("@")
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = sanitizeChars();
