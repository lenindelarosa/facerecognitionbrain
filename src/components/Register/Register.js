import { React, useState } from 'react';
import { useFormik } from 'formik'

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = '*Required';
    }
    if (!values.email) {
      errors.email = '*Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = '*Invalid email address';
    }
    if (!values.password) {
        errors.password = '*Required';
      } else if (values.password.length <8) {
        errors.password = '*Password must 8 characters long.';
      }
    return errors;
  };

export default function Register(props) {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            fetch('https://ldsmartbrainapi.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    name: values.name
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    props.loadUser(user);
                    props.onRouteChange('home');
                }
            })
    }});
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <form id="sign_up" onSubmit={formik.handleSubmit} className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0 blue b underline">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5 white b" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                    <div className="red pa1 b underline f7 tl">{formik.errors.name}</div>
                ) : null}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5 white b" htmlFor="email-address">Email</label>
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
                    <div className="red pa1 b underline f7 tl">{formik.errors.email}</div>
                ) : null}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5 white b" htmlFor="password">Password</label>
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
                    <div className="red pa1 b underline f7 tl">{formik.errors.password}</div>
                    ) : null}
                    <div className="mt3">
                        <input className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6 dib" 
                        //onClick={onSubmitSignIn}
                        type="submit" 
                        value="Register!" />
                    </div>
                    </form>
                    {/* <div className="lh-copy mt3 red">
                        <p className='db fw6 lh-copy f6'></p>
                    </div> */}
                </div>
            </main>
        </article>
    )
}