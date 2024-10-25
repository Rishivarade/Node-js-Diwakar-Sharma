
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetails = () => {

    const [bookDetails, setBookDetails] = useState({});
    const { id } = useParams();
    async function getBookDetails() {
        try {
            const getBookDetailsWithId = await axios.get(`http://localhost:8008/book/getBookById/${id}`);
            setBookDetails(getBookDetailsWithId.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookDetails();
    }, [])
    return (
        <div className='' >
            <div className="card" style={{width:"500px",margin:"auto"}}>

                <div className="div" style={{width:"300px",height:"250px",margin:"auto"}}>
                    <img
                        src={bookDetails.image}
                        alt="" className='' height={300} width={300} />
                </div>

                <div className="card-body flex items-center justify-between">
                    <h2 className="card-title">Title: {bookDetails.title}</h2>
                    <h2 className="card-title">Author: {bookDetails.author}</h2>
                    <p style={{width:"250px"}}><strong>Description</strong>: {bookDetails.description}</p>
                    <p><strong>Price</strong>: {bookDetails.price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BookDetails