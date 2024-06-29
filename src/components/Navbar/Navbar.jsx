import React, { useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, updateUser } from '../../redux/slices/userSlice'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import ReactModal from 'react-modal';
import convertToBase64 from '../../utils/convertToBase64'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

function Navbar() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const { username } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  function closeModal() {
    setModalIsOpen(false);
  }

  const [image64, setImage64] = useState(null)
  const [imageErr, setImageErr] = useState("")


  const getBase64Image = async (file) => {
    try {
      const base64 = await convertToBase64(file);
      setImage64(base64);
    }
    catch (error) {
      console.log(error)
    }

  };

  const formik = useFormik({
    initialValues: { destination_name: "" },
    validationSchema: Yup.object({
      destination_name: Yup.string()
        .max(50, "title is too long")
        .required("this field is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (image64) {
          const { data } =
            await axios
              .post('http://127.0.0.1:8000/homestay_destination_add', {
                destination_name: values.destination_name,
                image: image64
              })
          setImage64(null)
          setModalIsOpen(false)
          formik.resetForm()
          toast.success("destination added", { position: 'top-center' })
        } else {
          setImageErr("please add an image")
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  // const formik_1 = useFormik({
  //   initialValues: { name: "", images: [], facilities: "", cash: "", state: "", details: "" },
  //   validationSchema: Yup.object({
  //     name: Yup.string()
  //       .max(50, "title is too long")
  //       .required("this field is required"),
  //     facilities: Yup.string()
  //       .required("this field is required"),
  //     cash: Yup.string()
  //       .required("this field is required"),
  //     state: Yup.string()
  //       .required("this field is required"),
  //     details: Yup.string()
  //       .required("this field is required"),

  //   }),
  //   onSubmit: async (values) => {
  //     try {

  //       const { data } =
  //         await axios
  //           .post('http://127.0.0.1:8000/add_homestays', {
  //             name: values.name,
  //             images: values.images,
  //             facilities: values.facilities,
  //             cash: values.cash,
  //             state: values.state,
  //             details: values.details
  //           }, {
  //             headers: {
  //               "Content-Type": "multipart/form-data"
  //             }
  //           })
  //       setModalIsOpen(false)
  //       formik.resetForm()
  //       toast.success("destination added", { position: 'top-center' })
  //     }
  //     catch (error) {
  //       console.log(error)
  //     }
  //     console.log(values)
  //   },

  // })

  const formik_1 = useFormik({
    initialValues: { name: '', images: [], facilities: '', cash: '', state: '', details: '' },
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Title is too long').required('This field is required'),
      facilities: Yup.string().required('This field is required'),
      cash: Yup.string().required('This field is required'),
      state: Yup.string().required('This field is required'),
      details: Yup.string().required('This field is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('facilities', values.facilities);
        formData.append('cash', values.cash);
        formData.append('state', values.state);
        formData.append('details', values.details);
        Array.from(values.images).forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });

        const { data } = await axios.post('http://127.0.0.1:8000/add_homestays', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setModalIsOpen(false);
        formik_1.resetForm();
        toast.success('Homestay added', { position: 'top-center' });
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <>
      <nav >
        <div className='nav-wrapper'>

          <ul className='nav-ul'>
            <div className='nav-logo' onClick={() => navigate('/')}>
              <li><h3>Plan</h3></li>
              <img src='/images/logomy.jpg' className='nav-logo1' />
              <li><h3>Trip</h3></li>
            </div>
          </ul>
          {(user.type == "user") ?
            (<div>
              <ul className='nav-ul'>
                <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                <li><i className="fa-regular fa-user" onClick={() => navigate('/profile')}></i></li>
                <li>Hello {username}</li>
              </ul></div>)
            : (user.type == "manager") ?
              (<>
                <ul className='nav-ul'>
                  <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                  <div className='dropdown'>
                    <li><i className="fa-regular fa-user" onClick={handleToggle}>
                    </i>{username}</li>
                    {isOpen && (
                      <div className='dropdown-menu'>
                        <button className='dropdown-item' onClick={() => setModalIsOpen(true)}>
                          Add Destination
                        </button>
                        <div>
                          <div>
                            <ReactModal
                              isOpen={modalIsOpen}
                              onRequestClose={closeModal}
                              style={customStyles}
                              contentLabel="Example Modal"
                            >
                              {user.type == "manager" ? (
                                <>
                                  <div className='modal-head'>
                                    <h2>Add Homestays</h2>
                                    <i onClick={closeModal} class="fa-solid fa-xmark"></i>
                                  </div>
                                  <form onSubmit={formik_1.handleSubmit}>
                                    <div className='label-wrapper'>

                                      <div>
                                        <div><label>Name</label></div>
                                        <input placeholder='enter the name' name='name' onChange={formik_1.handleChange} value={formik_1.values.name} />
                                        <p>{formik_1.errors.name}</p>
                                      </div>
                                      <div>
                                        <div><label>Add image</label></div>
                                        <input type='file' multiple name='images' onChange={e => formik_1.setFieldValue("images", e.target.files)} />
                                        <p>{formik_1.errors.images}</p>
                                      </div>

                                      <div>
                                        <div><label>Facilities</label></div>
                                        <input placeholder='enter the name' name='facilities' onChange={formik_1.handleChange} value={formik_1.values.facilities} />
                                        <p>{formik_1.errors.facilities}</p>
                                      </div>
                                      <div>
                                        <div><label>Amount</label></div>
                                        <input placeholder='enter the name' name='cash' onChange={formik_1.handleChange} value={formik_1.values.cash} />
                                        <p>{formik_1.errors.cash}</p>
                                      </div>
                                      <div>
                                        <div><label>State</label></div>
                                        <input placeholder='enter the name' name='state' onChange={formik_1.handleChange} value={formik_1.values.state} />
                                        <p>{formik_1.errors.state}</p>
                                      </div>
                                      <div>
                                        <div><label>Details</label></div>
                                        <input placeholder='enter the name' name='details' onChange={formik_1.handleChange} value={formik_1.values.details} />
                                        <p>{formik_1.errors.details}</p>
                                      </div>
                                      <div>
                                        <div><button type='submit'>DONE</button></div>
                                      </div>
                                    </div>
                                  </form>
                                </>
                              ) : (

                                <div>
                                  <div className='modal-head'>
                                    <h2>Add Post</h2>
                                    <i onClick={closeModal} className="fa-solid fa-xmark"></i>
                                  </div>
                                  <h5>Please login to add a post</h5>
                                  <button onClick={() => navigate('/login')}>Login</button>
                                </div>
                              )}

                            </ReactModal>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ul>
              </>)
              : (user.type == "admin") ? (<ul className='nav-ul'>
                <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                <div className='dropdown'>
                  <li onClick={handleToggle}><i className="fa-regular fa-user"
                  ></i>{username}
                  </li>
                  {isOpen && (
                    <div className='dropdown-menu'>
                      <button className='dropdown-item' onClick={() => setModalIsOpen(true)}>
                        Add Homestay
                      </button>
                      <div>
                        <div>
                          <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                          >
                            {user.type == "admin" ? (
                              <>
                                <div className='modal-head'>
                                  <h2>Add Post</h2>
                                  <i onClick={closeModal} class="fa-solid fa-xmark"></i>
                                </div>


                                <form onSubmit={formik.handleSubmit}>
                                  <div className='label-wrapper'>

                                    <div>
                                      <div><label>Destination Name</label></div>
                                      <input placeholder='enter the name' name='destination_name' onChange={formik.handleChange} value={formik.values.destination_name} />
                                      <p>{formik.errors.destination_name}</p>
                                    </div>
                                    <div>
                                      <div><img className='modal-i mage' src={image64} alt='' /></div>
                                      <div><label>Add image</label></div>
                                      <input type='file' name='image' onChange={e => getBase64Image(e.target.files[0])} /></div>
                                    <p>{imageErr}</p>
                                    <div>
                                      <div><button type='submit'>DONE</button></div>
                                    </div>
                                  </div>
                                </form>
                              </>
                            ) : (

                              <div>
                                <div className='modal-head'>
                                  <h2>Add Post</h2>
                                  <i onClick={closeModal} className="fa-solid fa-xmark"></i>
                                </div>
                                <h5>Please login to add a post</h5>
                                <button onClick={() => navigate('/login')}>Login</button>
                              </div>
                            )}

                          </ReactModal>
                        </div>
                      </div>
                      <div>Add packages</div>
                    </div>
                  )}
                </div></ul>)
                : (<ul className='nav-ul'>
                  <div className='nav-text'>
                    <li><h3 onClick={() => navigate('/login')}>Login</h3></li>
                    <li><h3 onClick={() => navigate('/signin')}>Signup</h3></li>
                    <li><h3 onClick={() => navigate('/manager_reg')}>Manager Registration</h3></li>
                  </div>
                </ul>)}
        </div>
      </nav >
    </>
  )
}

export default Navbar