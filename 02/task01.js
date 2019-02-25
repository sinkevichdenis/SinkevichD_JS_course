/** get word's forms for number
 *
 * @param num (number) - number of something which we count
 * @param word1 (string) - word's form
 * @param word2 (string) - word's form
 * @param word5 (string) - word's form
 * @returns {*} (string) - one of word's forms
 */
function getNumWord(num, word1, word2, word5) {
    let dd = num % 100,
        d = num % 10;

    switch (true) {
        case (dd >= 11) && (dd <= 19):
            return word5;
        case (d >= 2) && (d <= 4):
            return word2;
        case d === 1:
            return word1;
        default:
            return word5;
    }
}

/** ask number from user
 *
 * @returns {number} - number of something which we asked about
 */
function getNumberApples() {
    let apples;
    apples = +prompt('Сколько у вас яблок?');
    while (isNaN(apples) || apples%1) {
        if (apples%1) {
            apples = +prompt('Введите целое число! Огрызки не пересчитываем!');
        }

        if (isNaN(apples)) {
            apples = +prompt('Введите число, а не текст! Сколько у вас яблок?');
        }
    }
    return apples;
}

/** display result with word's forms with help alert window
 *
 */
function displayResult() {
    let apples = getNumberApples();
    alert('У вас ' + apples + ' ' + getNumWord(apples, 'яблоко', 'яблока', 'яблок') + '!');
}