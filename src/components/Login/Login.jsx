// import React from 'react'
// import './Login.css'
// import { useFormik } from 'formik'
// import * as Yup from "yup"
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import {  updateUser } from '../../redux/slices/userSlice'



// function Login() {
//   const navigate=useNavigate()
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.user)
  
//   const handlelLogin=()=>{
//     dispatch(updateUser(true));
//   }

//   const formik = useFormik({
//     initialValues: { username: "", password1: "",},
//     validationSchema: Yup.object({
//       username: Yup.string()
//         .min(3, "username should contain atleast 3 characters")
//         .max(25, "username is too long")
//         .required("username is required"),
//       password1: Yup.string()
//         .min(8, "password should contain atleast 8")
//         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password should contain one")
//         .required("please secure your account with the password"),
//     }),
//     onSubmit: (values)=>{
//       console.log(values)
//       axios
//         .post('http://127.0.0.1:8000/login',values,{
//           headers:{
//             "Content-Type": "multipart/form-data"
//           }
//         })
//         .then((res)=>{
//           dispatch(updateUser({...user,username:res.data.result.username,name:res.data.result.name,email:res.data.result.email,phone:res.data.result.phone,address:res.data.result.address,type:res.data.result.type,id:res.data.result.id,is_blocked:res.data.result.is_blocked}))
//         console.log(res.data)})
//         .catch(err=>console.log(err))
//         navigate('/')
//       }
//   },[])
//   console.log(formik.errors)
//   return (
//     <>
//         <div className='login-wrapper-1'>
//             <div className='login-wrapper'>
//               <form  className='login-form' onSubmit={formik.handleSubmit}>
//                 <h2>LOGIN</h2>
//                 <div className=''>
//                   <label>Username</label>
//                   <input className='input' type='user_type' name='username' 
//                   onChange={formik.handleChange}
//                    value={formik.values.username}/>
//                   <p>{formik.errors.username}</p>
//                 </div>
//                 <div className=''>
//                   <label>Password</label>
//                   <input className='input' type='password' name='password1' onChange={formik.handleChange} value={formik.values.password1} />
//                   <p>{formik.errors.password1}</p>
//                 </div>
//                 <div className='login'><button type='submit' onClick={handlelLogin}> LOGIN</button>               
//                 </div>
//               </form>
//             </div>
//           </div>    
//     </>
//   )
// }

// export default Login
import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const formik = useFormik({
    initialValues: { username: '', password1: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username should contain at least 3 characters')
        .max(25, 'Username is too long')
        .required('Username is required'),
      password1: Yup.string()
        .min(8, 'Password should contain at least 8 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must include one uppercase letter, one lowercase letter, and one digit')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.status) {
          dispatch(updateUser({
            ...user,
            username: response.data.result.username,
            name: response.data.result.name,
            email: response.data.result.email,
            phone: response.data.result.phone,
            address: response.data.result.address,
            type: response.data.result.type,
            id: response.data.result.id,
            is_blocked: response.data.result.is_blocked,
          }));
          navigate('/'); 
        } else {
          if (response.data.result === 'User is blocked') {
            formik.setStatus('Your account is blocked. Please contact support.'); 
          } else {
            formik.setStatus('Invalid username or password.');
          }
        }
      } catch (error) {
        console.log(error)
        if (error.response.status == 403){
          return alert("dfghjk")
        }
        console.error('Error during login:', error);
        formik.setStatus('An error occurred while logging in.');
      }
    },
  });

  return (
    <>
      <div className='login-wrapper-1'>
        <div className='login-wrapper'>
          <form className='login-form' onSubmit={formik.handleSubmit}>
            <h2>LOGIN</h2>
            <div>
              <label>Username</label>
              <input
                className='input'
                type='text'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <p>{formik.errors.username}</p>
            </div>
            <div>
              <label>Password</label>
              <input
                className='input'
                type='password'
                name='password1'
                onChange={formik.handleChange}
                value={formik.values.password1}
              />
              <p>{formik.errors.password1}</p>
            </div>
            <div className='login'>
              <button type='submit'>LOGIN</button>
            </div>
            {formik.status && <p>{formik.status}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
