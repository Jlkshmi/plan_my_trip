import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Signin.css'


function Manager_signin() {
    const navigate=useNavigate()

    const formik = useFormik({
      initialValues: { username: "",password1:'',password2:'',email:"", company_name: "", company_address: "",phone:"",},
      validationSchema: Yup.object({
        username: Yup.string()
          .min(3, "username should contain atleast 3 characters")
          .max(25, "username is too long")
          .required("username is required"),
        password1: Yup.string()
          .min(8, "password should contain atleast 8")
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password should contain one")
          .required("please secure your account with the password"),
        password2: Yup.string().oneOf([Yup.ref("password1")])
          .required("please confirm your password"),
        email: Yup.string()
          .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
          .required("email is required"),
        company_name: Yup.string()
          .required("This field is required"),
        company_address: Yup.string()
          .required("This field is required"),
        phone: Yup.string()
          .required("This field is required"),
      }),
      
      onSubmit: async(values)=>{
        axios
          .post('http://127.0.0.1:8000/manager_registration',values,{
            headers:{
              "Content-Type": "multipart/form-data"
            }
          })
          .then((res)=>{
          console.log(res.data)})
          .catch(err=>console.log(err))
          navigate('/')
        }
         
    })
    console.log(formik.errors)
  return (
    <>
      <div className='form-wrapper'>
        <div className='form-wrapper-1'>
          <h2>Signup</h2>
          <form onSubmit={formik.handleSubmit}>

            <div className=''>
              <label>UserName</label>
              <input
                value={formik.values.username}
                onChange={formik.handleChange}
                type='text'
                name='username'
              />
              <p>{formik.errors.username}</p>
            </div>
            <div className=''>
              <label>Password</label>
              <input
                value={formik.values.password1}
                type='password'
                name='password1'
                onChange={formik.handleChange}
              />
              <p>{formik.errors.password1}</p></div>

            <div className=''>
              <label>ConfirmPasssword</label>
              <input
                value={formik.values.password2}
                type='password'
                name='password2'
                onChange={formik.handleChange}
              />
              <p>{formik.errors.password2}</p>
            </div>

            <div className=''>
              <label>Email</label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                type='text'
                name='email'
              />
              <p>{formik.errors.email}</p>
            </div>

            <div className=''>
              <label>Company Name</label>
              <input
                value={formik.values.company_name}
                onChange={formik.handleChange}
                type='text'
                name='company_name'
              />
              <p>{formik.errors.company_name}</p>
            </div>

            <div className=''>
              <label>Company Address</label>
              <input
              name='company_address'
              type='text'
                value={formik.values.company_address}
                onChange={formik.handleChange}/>
              <p>{formik.errors.company_address}</p>
            </div>
            

            <div className=''>
              <label>Phone</label>
              <input
              name='phone'
              type='text'
                value={formik.values.phone}
                onChange={formik.handleChange}/>
              <p>{formik.errors.phone}</p>
            </div>
            
            <div><button type='submit'>Signup</button></div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Manager_signin