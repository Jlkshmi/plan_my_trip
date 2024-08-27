import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function HomestaysImages() {
    const [image, setImage] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/homestayimages/${id}/`) 
            .then((res) => setImage(res.data))
            .catch((err) => console.log(err))
    }, [id])

    return (
        <div>
            {image ? (
                <div>
                    <h1>Image Detail</h1>
                    <img 
                        src={`http://127.0.0.1:8000${image.images}`} 
                        alt={`Detail of image ${id}`} 
                      
                    />
                  
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default HomestaysImages