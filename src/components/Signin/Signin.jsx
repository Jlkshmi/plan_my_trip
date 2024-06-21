import React from 'react'
import './Signin.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Signin() {

  const navigate=useNavigate()

  const formik = useFormik({
    initialValues: { username: "", password1: "", password2: "", name:"" , email: "",phone:"" ,address:"",},
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
      name: Yup.string()
        .required("This field is required"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
        .required("email is required"),
      phone: Yup.string()
        .required("This field is required"),
      address: Yup.string()
        .required("This field is required"),
    }),
    
    onSubmit: async(values)=>{

      console.log("sign up -------------------->", values);

      axios
        .post('http://127.0.0.1:8000/user_registration',values, {
          headers:{
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res)=>{
        console.log("API Response----------------->", res.data)})
        .catch(err=>console.log(err))
        navigate('/')
      }
       
  },[])

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
              <label>Name</label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                type='text'
                name='name'
              />
              <p>{formik.errors.name}</p>
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
              <label>Phone</label>
              <input
              name='phone'
              type='text'
                value={formik.values.phone}
                onChange={formik.handleChange}/>
              <p>{formik.errors.phone}</p>
            </div>
            
            <div className=''>
              <label>Address</label>
              <input
              name='address'
              type='text'
                value={formik.values.address}
                onChange={formik.handleChange}/>
              <p>{formik.errors.address}</p>
            </div>
            
            <div><button type='submit'>Signup</button></div>


          </form>
        </div>
      </div>
    </>
  )
}

export default Signin