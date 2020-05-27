import React, {Component} from 'react';
import FormErrors from "../FormError/FormError"
import './register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
            last_name: '',
            name: '',
            middle_name: '',
            formErrors: {username: '', password: '', last_name: '', name: '', middle_name: ''},
            last_nameValid: false,
            nameValid: false,
            middle_nameValid: false,
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let last_nameValid = this.state.last_nameValid;
        let nameValid = this.state.nameValid;
        let middle_nameValid = this.state.middle_nameValid;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'name':
                nameValid = /^[a-яёA-ЯЁ]{1,200}$/.test(value);
                fieldValidationErrors.name = nameValid ? '' : 'поле должно содержать только русские буквы';
                break;
            case 'middle_name':
                middle_nameValid = /^[a-яёA-ЯЁ]{1,200}$/.test(value);
                fieldValidationErrors.middle_name = middle_nameValid ? '' : 'поле должно содержать только русские буквы';
                break;
            case 'last_name':
                last_nameValid = /^[a-яёA-ЯЁ]{1,200}$/.test(value);
                fieldValidationErrors.last_name = last_nameValid ? '' : 'поле должно содержать только русские буквы';
                break;
            case 'username':
                usernameValid = /^[a-zA-Z][a-zA-Z0-9-_.]{5,20}$/.test(value);
                fieldValidationErrors.username = usernameValid ? '' : 'поле должно содержать 5-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква';
                break;
            case 'password':
                passwordValid = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
                fieldValidationErrors.password = passwordValid ? '': 'поле должно содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            last_nameValid: last_nameValid,
            nameValid: nameValid,
            middle_nameValid: middle_nameValid,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.last_nameValid && this.state.nameValid && this.state.middle_nameValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.formValid) {
            let formBody = [];
            formBody.push(encodeURIComponent('position')+"="+encodeURIComponent(''));
            for (let prop in this.state) {
                let encodedKey = encodeURIComponent(prop);
                let encodedValue = encodeURIComponent(this.state[prop]);
                formBody.push(encodedKey + "=" + encodedValue);
            }

            formBody = formBody.join("&");
            fetch('/api/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => console.log("err: =" + err))
                .then(dt => console.log(this.state.serverOtvet));
        }
    };


    render() {
        if (this.state.serverOtvet.success){
            localStorage.setItem('register', 'true')
            return window.location.assign('http://localhost:3000/auth');
        }else{
            return (
                <div>
                <div className="text-center">
                <h1> Регистарция:</h1>
            </div>
            <div>
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.serverOtvet}/>
            <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                <div className={`form-group ${this.errorClass(this.state.formErrors.last_name)}`}>
                    <label htmlFor="last_name">Фамилия:</label>
                    <input type="last_name" required className="form-control" name="last_name"
                           placeholder="Фамилия"
                           value={this.state.last_name}
                           onChange={this.handleUserInput}  />
                </div>
                <label htmlFor="username">Имя:</label>
                <input type="name" required className="form-control" name="name"
                placeholder="Имя"
                value={this.state.name}
                onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.middle_name)}`}>
                <label htmlFor="middle_name">Отчество:</label>
                <input type="middle_name" required className="form-control" name="middle_name"
                       placeholder="Отчество"
                       value={this.state.middle_name}
                       onChange={this.handleUserInput}  />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="username">Login:</label>
                    <input type="username" required className="form-control" name="username"
                           placeholder="username"
                           value={this.state.username}
                           onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password:</label>
                    <input type="password" required className="form-control" name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleUserInput}  />
                </div>
            <input type="submit" className="btn btn-dark btn-primary" onSubmit={this.handleSubmit} value='Отправить'/>
                </form>
                </div>
                <div className="register_text">
                <p className='text-info'>
                для регистрации:
                <li>укажите логин длинной от 5 символов</li>
            <li>укажите пароль как минимум с одной заглавной, <br/>
            одной прописной буквами и специальными символами <br/>
            длина паролья не меньше 8 символов
            </li>
            </p>
            </div>
            </div>

        );
        }

    }
}
export default Register;