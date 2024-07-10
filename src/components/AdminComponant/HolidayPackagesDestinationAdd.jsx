import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import convertToBase64 from '../../utils/convertToBase64'
import './Destination.css'

function HolidayPackagesDestinationAdd() {
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

    const formik_3 = useFormik({
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
                  .post('http://127.0.0.1:8000/holiday_destination_add', {
                    destination_name: values.destination_name,
                    image: image64
                  })
              setImage64(null)
              setModalIsOpen(false)
              formik_3.resetForm()
              toast.success("destination added", { position: 'top-center' })
            } else {
              setImageErr("please add an image")
            }
          } catch (error) {
            console.log(error)
          }
        },
      })
  return (
    <>
    <div className='holiday-des-add'>
        <div  className='holiday-des-add1'>
        <form onSubmit={formik_3.handleSubmit}>
                                  <div className='label-wrapper'>

                                    <div>
                                      <div><label>Destination Name</label></div>
                                      <input placeholder='enter the name' name='destination_name' onChange={formik_3.handleChange} value={formik_3.values.destination_name} />
                                      <p>{formik_3.errors.destination_name}</p>
                                    </div>
                                    <div>
                                      <div><img className='modal-image' src={image64} alt='' /></div>
                                      <div><label>Add image</label></div>
                                      <input type='file' name='image' onChange={e => getBase64Image(e.target.files[0])} /></div>
                                    <p>{imageErr}</p>
                                    <div>
                                      <div><button type='submit'>DONE</button></div>
                                    </div>
                                  </div>
                                </form>
        </div>
    </div>
    </>
  )
}

export default HolidayPackagesDestinationAdd