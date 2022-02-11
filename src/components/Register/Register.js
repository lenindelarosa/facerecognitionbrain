import { React, useState } from 'react';

export default function Register(props) {

      // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

      // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const onNameChange = (event) => {
        setName(event.target.value);
        setSubmitted(false);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
        setSubmitted(false);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        setSubmitted(false);
    }

    const errorMessage = () => {
        return (
            error ? 'Please enter all the fields.' : ''
        );
    };

    const onSubmitSignIn = (event) => {
        event.preventDefault();
        if (!email || !password || !name){
            setError(true);
        } else {
            console.log(email, name,password);
            fetch('https://ldsmartbrainapi.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    props.loadUser(user);
                    props.onRouteChange('home');
                }
            })
            setSubmitted(true);
            setError(false);
        }
    }
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0 blue b underline">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5 white b" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={onNameChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f5 bg white b" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f5 white b" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6 dib" 
                        onClick={onSubmitSignIn}
                        type="submit" 
                        value="Register!" />
                    </div>
                    <div className="lh-copy mt3 red">
                        <p className='db fw6 lh-copy f6'>{errorMessage()}</p>
                    </div>
                </div>
            </main>
        </article>
    )
}