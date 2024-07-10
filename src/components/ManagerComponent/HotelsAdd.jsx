import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import './CategoryAdd.css'


function HotelsAdd() {
    const formik_5 = useFormik({
        initialValues: {
            name: '',
            description: '',
            address: '',
            city: '',
            state: '',
            details: '',
            phone_number: '',
            facilities: '',
            price_per_night: '',
            created_at: '',
            updated_at: '',
            average_rating: '',
            images: []
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('This field is required'),
            description: Yup.string()
                .required('This field is required'),
            address: Yup.string()
                .required('This field is required'),
            city: Yup.string()
                .required('This field is required'),
            state: Yup.string()
                .required('This field is required'),
            details: Yup.string()
                .required('This field is required'),
            phone_number: Yup.string()
                .required('This field is required'),
            facilities: Yup.string()
                .required('This field is required'),
            price_per_night: Yup.string()
                .required('This field is required'),
            images: Yup.string()
                .required('This field is required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('address', values.address);
                formData.append('city', values.city);
                formData.append('state', values.state);
                formData.append('details', values.details);
                formData.append('phone_number', values.phone_number);
                formData.append('facilities', values.facilities);
                formData.append('price_per_night', values.price_per_night);
                Array.from(values.images).forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
                const { data } = await axios
                    .post('http://127.0.0.1:8000/add_hotels', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                formik_5.resetForm();
                console.log('Form submitted successfully:', response.data);
                 navigate('/')
            }
            catch (error) {
                console.log(error)
                
               
            }
        }
    },
    )
console.log(formik_5.errors)

    return (
        <>
            <div className='hotel-add-wrapper'>
                <div className='hotel-add-wrapper1'>
                    <form onSubmit={formik_5.handleSubmit}>
                        <div className='label-wrapper'>
                            <div>
                                <label>Hotel Name</label>
                            </div>
                            <input placeholder='enter the name' onChange={formik_5.handleChange} name='name' />
                            <p>{formik_5.errors.name}</p>
                            <div>
                                <label>
                                    Description
                                </label>
                            </div>
                            <input placeholder='enter the description' onChange={formik_5.handleChange} name='description' />
                            <p>{formik_5.errors.description}</p>
                            <div>
                                <label>Address</label>
                            </div>
                            <input placeholder='enter the address' onChange={formik_5.handleChange} name='address' />
                            <p>{formik_5.errors.address}</p>
                            <div>
                                <label>City</label>
                            </div>
                            <input placeholder='enter the city' onChange={formik_5.handleChange} name='city' />
                            <p>{formik_5.errors.city}</p>
                            <div>
                                <label>State</label>
                            </div>
                            <input placeholder='ente the state name' onChange={formik_5.handleChange} name='state' />
                            <p>{formik_5.errors.state}</p>
                            <div>
                                <label>details</label>
                            </div>
                            <input placeholder='enter the details' onChange={formik_5.handleChange} name='details' />
                            <p>{formik_5.errors.details}</p>
                            <div>
                                <label>
                                    phone_number
                                </label>
                            </div>
                            <input placeholder='enter the phone_number' name='phone_number' onChange={formik_5.handleChange}/>
                            <p>{formik_5.errors.phone_number}</p>
                            <div>
                                <label>Facilities</label>
                            </div>
                                <input placeholder='enter the fecilities' name='facilities' onChange={formik_5.handleChange}/>
                                <p>{formik_5.errors.facilities}</p>
                            <div>
                                <label>Price(Per_night)</label>
                            </div>
                            <input placeholder='enter the price' name='price_per_night' onChange={formik_5.handleChange}/>
                            <p>{formik_5.errors.price_per_night}</p>
                            <div>
                                <label>Images</label>
                            </div>
                            <input type='file' multiple name='images' onChange={e => formik_5.setFieldValue("images", e.target.files)} />
                            <p>{formik_5.errors.images}</p>

                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default HotelsAdd