import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import './CategoryAdd.css'

function HomestayAdd() {
    const formik_1 = useFormik({
        initialValues: { name: '', images: [], facilities: '', cash: '', state: '', details: '' },
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'Title is too long').required('This field is required'),
            facilities: Yup.string().required('This field is required'),
            cash: Yup.string().required('This field is required'),
            state: Yup.string().required('This field is required'),
            details: Yup.string().required('This field is required'),
            address: Yup.string().required('This field is required')
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('facilities', values.facilities);
                formData.append('cash', values.cash);
                formData.append('state', values.state);
                formData.append('details', values.details);
                formData.append('address',values.address)
                Array.from(values.images).forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });

                const { data } = await axios.post('http://127.0.0.1:8000/add_homestays', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                formik_1.resetForm();
                toast.success('Homestay added', { position: 'top-center' });
            } catch (error) {
                console.log(error);
            }
        },
    });
  return (
    <>
     <div className='homestay-add-wrapper'> 
            <div className='homestayadd-wrapper1'>
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
                        <div><label>Address</label></div>
                        <input placeholder='enter the address' name='address' onChange={formik_1.handleChange} value={formik_1.values.address} />
                        <p>{formik_1.errors.address}</p>
                    </div>
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

export default HomestayAdd