export function isPhone(data) {
    let ret = false;

    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    ret = regPhone.test(data);

    return ret;
}

export function isEmail(data) {
    let ret = false;

    const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    ret = regEmail.test(data);

    return ret;
}