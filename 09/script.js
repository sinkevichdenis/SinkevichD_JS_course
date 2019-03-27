const itemForm = new FormGroup('registration');
const control1 = new FormControl('input', 'login', ['Required', 'MinLength']);
const control2 = new FormControl('input', 'password', ['Required', 'MinLength']);
const control3 = new FormControl('input', 'password2', []);
itemForm.registerControls(control1);
itemForm.registerControls(control2);
itemForm.registerControls(control3);