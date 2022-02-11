import React, { useState } from 'react';

export default function Signin (props) {
 
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
 
    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignIn = async () => {
        fetch('https://ldsmartbrainapi.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
                props.loadUser(user);
                props.onRouteChange('home');
            }
        })
    }

    // useEffect(() => {
    //     const listener = (event) => {
    //       if (event.code === "Enter" || event.code === "NumpadEnter") {
    //         console.log("Enter key was pressed. Run your function.");
    //         event.preventDefault();
    //         onSubmitSignIn();
    //       }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //         document.removeEventListener("keydown", listener);
    //         console.log('removing listener.')
    //       };
    //   }, []);

    const { onRouteChange } = props;
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw6 ph0 mh0 blue b underline">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f5 bg white b" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        required= {true}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title='Invalid email address.'
                        onChange={onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f5 bg white b" htmlFor="password">Password</label>
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
                    value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} href="#0" className="f5 pointer dim black db b">Register</p>
                </div>
            </div>
        </main>
        </article>
    )
}
