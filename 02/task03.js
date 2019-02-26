/** get string from user by prompt
 *
 * @returns {*} (string)
 */
function getString() {
    let string = prompt('Enter your string?');

    if ( !isGoodString(string) ) {
        string = getString();
    }
    return deleteSpaces(string);
}

/** check if string contain '' or null
 *
 * @param string
 * @returns {boolean}
 */
function isGoodString(string){
    let resultBool = true;

    if (string === '') {
        resultBool = false;
        alert ("Вы ввели пустую строку");
    }

    if (string === null) {
        resultBool = false;
        alert ("Вы отказались ввести строку");
    }

    return resultBool;
}

/** delete all spaces in string, because sentences can also be palindrome
 *
 * @param string
 * @returns {string}
 */
function deleteSpaces(string) {
    return string.split(' ').join('');
}

/** show result in alert
 *
 * @param boolean
 */
function showResult(boolean) {
    alert(boolean ? 'Yes. It is palindrome.' : 'No. It is simple string.');
}

/** check if string was palindrome
 *
 */
function isPalindrome1() {
    let str = getString();
    showResult(str.split('').reverse().join('') === str);
}

/** check if string was palindrome
 *
 */
function isPalindrome2() {
    let str = getString(),
        j = str.length-1,
        resultBool = true;

    for (let i = 0; i < str.length; i++) {
        if ( str[i] !== str[j] ) {
            resultBool = false;
        }
        j--;
    }
    showResult(resultBool);
}

/** check if string was palindrome
 *
 */
function isPalindrome3() {
    let str = getString(),
        reverseStr = '';

    for (let i = str.length - 1; i >= 0; i--) {
        reverseStr += str[i];
    }
    showResult(reverseStr === str);
}

/** check if string was palindrome
 *
 */
function isPalindrome4() {
    let str = getString(),
        len = Math.floor(str.length / 2),
        resultBool = true;

    for (let i = 0; i < len; i++) {
        if (str[i] !== str[str.length - 1 - i] ) {
            resultBool = false;
        }
    }
    showResult(resultBool);
}