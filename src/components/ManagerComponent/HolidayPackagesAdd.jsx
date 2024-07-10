import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import './CategoryAdd.css'

function HolidayPackagesAdd() {
    const formik_4 = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            discount_price: '',
            duration_days: '',
            start_date: '',
            end_date: '',
            destination: '',
            images:[],
            average_rating: 0,
            number_of_reviews: 0,
            facilities: '',
            created_at:'',
            updated_at:''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            description: Yup.string()
                .required('Required'),
            price: Yup.number()
                .required('Required')
                .positive('Must be positive'),
            discount_price: Yup.number()
                .positive('Must be positive')
                .nullable(),
            duration_days: Yup.string()
                .required('Required'),
            start_date: Yup.date()
                .required('Required'),
            end_date: Yup.date()
                .required('Required')
                .min(Yup.ref('start_date'), 'End date must be after start date'),
            destination: Yup.string()
                .required('Required'),
            facilities: Yup.string()
                .required('Required'),
            
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name',values.name);
                formData.append('description',values.description);
                formData.append('price',values.price);
                formData.append('discount_price',values.discount_price);
                formData.append('duration_days',values.duration_days);
                formData.append('start_date',values.start_date);
                formData.append('duration_days',values.duration_days);
                formData.append('end_date',values.end_date);
                formData.append('destination',values.destination);
                formData.append('average_rating',values.average_rating);
                formData.append('number_of_reviews',values.number_of_reviews);
                formData.append('facilities',values.facilities);
                Array.from(values.images).forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
                const { data } = await axios
                    .post('http://127.0.0.1:8000/add_holidaypackages', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        formik_4.resetForm();
                        console.log('Form submitted successfully:', response.data);        
            } catch (error) {
                console.log(error)
                navigate('/')
            }
        }
    },)
    console.log(formik_4.errors)
    return (
        <>
            <div className='holiday-add-wrapper'>
                <div className='holiday-add-wrapper1'>
                    <form onSubmit={formik_4.handleSubmit}>
                        <div className='label-wrapper'>
                            <div>
                                <label>Package Name</label>
                            </div>
                            <input placeholder='enter the packagename' name='name' type='text' onChange={formik_4.handleChange} value={formik_4.values.name} />
                            <p>{formik_4.errors.name}</p>
                            <div>
                                <label>Description</label>
                            </div>
                            <input placeholder='enter the description' type="text" name='description' onChange={formik_4.handleChange} value={formik_4.values.description} />
                            <p>{formik_4.errors.description}</p>
                            <div>
                                <label>Price</label>
                            </div>
                            <input placeholder='enter the price' name='price' onChange={formik_4.handleChange} value={formik_4.values.price} />
                            <p>{formik_4.errors.price}</p>
                            <div>
                                <label>Discount Price</label>
                            </div>
                            <input placeholder='enter the discount price' name='discount_price' onChange={formik_4.handleChange} value={formik_4.values.discount_price} />
                            <p>{formik_4.errors.discount_price}</p>
                            <div>
                                <label>Duration (days)</label>
                            </div>
                            <input placeholder='enter duration ' name='duration_days' onChange={formik_4.handleChange} value={formik_4.values.duration_days} />
                            <p>{formik_4.errors.duration_days}</p>
                            <div>
                                <label>Start Date</label>
                            </div>
                            <input placeholder='enter start date' name='start_date' onChange={formik_4.handleChange} value={formik_4.values.start_date} />
                            <p>{formik_4.errors.start_date}</p>
                            <div>
                                <label>End Date</label>
                            </div>
                            <input placeholder='enter end date' name='end_date' onChange={formik_4.handleChange} value={formik_4.values.end_date} />
                            <p>{formik_4.errors.end_date}</p>
                            <div>
                                <label>Destination</label>
                            </div>
                            <input placeholder='enter the destination' name='destination' onChange={formik_4.handleChange} value={formik_4.values.destination} />
                            <p>{formik_4.errors.description}</p>
                            <div>
                                <label>Image</label>
                            </div>
                            <input multiple name='images' type='file' onChange={e => formik_4.setFieldValue("images", e.target.files)} />
                            <p>{formik_4.errors.images}</p>
                            <div>
                                <label>Facilities</label>
                            </div>
                            <input name="facilities" onChange={formik_4.handleChange} placeholder='enter the facilities'/>
                            <p>{formik_4.errors.facilities}</p>
                            <div>
                                <label>Average Rating</label>
                            </div>
                            <input name='average_rating' type='number' step="0.1" readOnly />
                            <div>
                                <label>Number Of Reviews</label>
                            </div>
                            <input name='number_of_reviews' type="number" readOnly />
                           
                            
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default HolidayPackagesAdd