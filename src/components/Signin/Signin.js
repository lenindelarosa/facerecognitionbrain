import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import './Signin.css'

const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = '*Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = '*Required';
      } else if (values.password.length >3) {
        errors.password = 'Password must not be empty.';
      }
    return errors;
  };

export default function Signin (props) {
 
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate,
        onSubmit: values => {
            fetch('https://ldsmartbrainapi.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
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
      });

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
                <form onSubmit={formik.handleSubmit} id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw6 ph0 mh0 blue b underline center">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f5 bg white b" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email"  
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className="red pa1 b underline f6">{formik.errors.email}</div>
                ) : null}
                <div className="mv3">
                    <label className="db fw6 lh-copy f5 bg white b" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="red pa1 b underline f6">{formik.errors.password}</div>
                ) : null}
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in" />
                </div>
                </form>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} href="#0" className="f5 pointer dim black db b">Register</p>
                </div>
            </div>
        </main>
        </article>
    )
}