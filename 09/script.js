const funcHelper = FormClassChanger;

const itemForm = new FormGroup('registration', funcHelper);
const control1 = new FormControl('input', 'login', ['Required', 'MinLength'], funcHelper);
const control2 = new FormControl('input', 'password', ['Required', 'MinLength'], funcHelper);
const control3 = new FormControl('input', 'password2', ['Required', 'MinLength'], funcHelper);
const control4 = new FormControl('input', 'email', ['Required', 'Email'], funcHelper);
itemForm.registerControls(control1);
itemForm.registerControls(control2);
itemForm.registerControls(control3);
itemForm.registerControls(control4);