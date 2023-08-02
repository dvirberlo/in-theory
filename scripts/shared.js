const shared = {
  /**
   * Clears the line and writes the provided string.
   * @param {string} str - The string to write.
   * @returns {void}
   */
  clearLineAndWrite(str) {
    shared.clearLine();
    process.stdout.write(str);
  },
  /**
   * Clears the line.
   * @returns {void}
   */
  clearLine() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  },
};

module.exports = shared;
