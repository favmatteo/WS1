function serializeOutputDB(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    serializeOutputDB: serializeOutputDB,
}