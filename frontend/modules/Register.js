import { validate } from "schema-utils";
import validator from "validator";

export default class Register {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const inputFone = el.querySelector('input[name="telefone"]');
        const emailInput = el.querySelector('input[name="email"]');
        let error = false;

        if(inputFone.value.length < 5){
            alert('Campo Telefone precisa ter pelo menos 5 caracteres')
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        }

        if(!error) el.submit();
        
    }

}