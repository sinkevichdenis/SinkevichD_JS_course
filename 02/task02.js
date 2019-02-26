/** get name in reply to a prompt-question
 *
 * @param question (string) question in prompt
 * @returns {string}
 */
function getNameData(question) {
    let str;

    do {
        str = prompt(question);
    }
    while ( !isNaN(+str) );

    return str;
}

/** get age from user
 *
 * @param question (string) - default question for prompt
 * @returns {number,string} - string ('Unknown') or integer number > 0
 */
function getAge(question) {
    let result = 'Unknown',
        num = prompt(question);

    do {
        if (num === null) {
            return result;
        } else {
            num = +num;
        }

        switch (true) {
            case (isNaN(num)):
                num = prompt('Введите число, а не текст! ' + question);
                break;
            case (num % 1 > 0):
                num = prompt(question + ' Введите количество полных лет!!!');
                break;
            case (num <= 0 || num > 120):
                num = prompt('Что-то с трудом в это верится. ' + question);
                break;
        }
    } while ( !Number.isInteger(num) || num < 0 );

    result = num;
    return result;
}

/**get man's sex from user
 *
 * @param question - default question for confirm
 * @returns {boolean}
 */
function isMan(question) {
    return confirm(question);
}

/** create profile about user
 *
 * @returns {{}}
 */
function createProfile() {
    let profile = {};

    profile.surname =  getNameData('Какая у Вас фамилия?');
    profile.name = getNameData('Какое у Вас имя?');
    profile.fatherName = getNameData('Какое у Вас отчество?');
    profile.age = getAge('Сколько Вам лет?');
    profile.sex = isMan('Вы мужчина?');

    return profile;
}

/** show sex's name from boolean
 *
 * @param profile (object) - input profile object
 * @returns {string}
 */
function showSex(profile) {
    if (profile.sex) {
        return 'Мужчина';
    } else {
        return 'Женщина';
    }
}

/** check if user was retired
 *
 * @param profile - input profile object
 * @returns {boolean}
 */
function isRetired(profile) {
    let result = false;
    const MAN_RETIRE_AGE = 63,
        WOMAN_RETIRE_AGE = 58;

    if ( profile.sex && (profile.age >= MAN_RETIRE_AGE)
        || !profile.sex && (profile.age >= WOMAN_RETIRE_AGE) ) {
            result = true;
        }

    return result;
}

/** show result if user was retired
 *
 * @param profile - input profile object
 * @returns {string}
 */
function showRetired(profile) {
    if (isRetired(profile)) {
        return 'Да';
    } else {
        return 'Нет';
    }
}

/** show user's age data
 *
 * @param profile - input profile object
 * @returns {string}
 */
function showAgeData(profile) {
    const PROFILE = profile;
    let result,
        period = 5;

    result = 'Ваш возраст в годах: ' + PROFILE.age + '\n';
    if ( isNaN(PROFILE.age) ){
        return result;
    }
    result += 'Ваш возраст в днях: ' + (PROFILE.age * 365) + '\n';
    result += 'Через ' + period + ' лет Вам будет: ' + (PROFILE.age + period) + '\n';

    return result;
}

/** show user's profile in alert
 *
 */
function showProfile() {
    let result;
    const PROFILE = createProfile();

    result = 'Ваше ФИО: ' + PROFILE.surname + ' ' + PROFILE.name + ' ' + PROFILE.fatherName + '\n';
    result += showAgeData(PROFILE);
    result += 'Ваш пол: ' + showSex(PROFILE) + '\n';
    result += 'Вы на пенсии: ' + showRetired(PROFILE);

    alert(result);
}
