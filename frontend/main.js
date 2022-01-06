import 'core-js';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Login from './modules/Login';
import Register from './modules/Register';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const register = new Register('.form-register');

login.init();
cadastro.init();
register.init();