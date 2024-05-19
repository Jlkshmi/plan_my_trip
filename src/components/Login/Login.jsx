import React from 'react'
import './Login.css'
import { useFormik } from 'formik'
import * as Yup from "yup"



function Login() {


  const formik = useFormik({
    initialValues: { username: "", password: "", },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "username should contain atleast 3 characters")
        .max(25, "username is too long")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password should contain atleast 8")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password should contain one")
        .required("please secure your account with the password"),
    }),
  })
  return (
    <>
          <div className='login-wrapper-1'>
            <div className='login-wrapper'>
              <form  className='login-form' onSubmit={formik.handleSubmit}>
                <h2>LOGIN</h2>
                <div className=''>
                  <label>Username</label>
                  <input className='input' name='username' 
                  onChange={formik.handleChange}
                   value={formik.values.username}/>
                  <p>{formik.errors.username}</p>
                </div>
                <div className=''>
                  <label>Password</label>
                  <input className='input' type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
                  <p>{formik.errors.password}</p>
                </div>
                <div className='login'><button type='submit'> LOGIN</button>
                
                </div>
              </form>
            </div>
          </div>
        
      
    </>
  )
}

export default Login