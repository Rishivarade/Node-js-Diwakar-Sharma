import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"


const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8008/book/getBooks');
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteBook = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8008/book/deleteBook/${id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getBooks();
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="">
            

            <header className="bg-white ">
                <div className="" style={{display:"flex",justifyContent:"space-evenly"}}>
                    <h1 className="">Book Store</h1>
                    <button className='btn' onClick={() => navigate('/book-form')}>Add Book</button>
                </div>
            </header>
            <main>
                <div className="" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr",gap:"10px"}}>
                    {books.length > 0 ? books.map((el, index) => (
                        <div className="card " key={el._id}>
                            <NavLink to={`/book-details/${el._id}`} className=''>
                                <img src={el.image} alt="" height={200} width={200} />
                            </NavLink>
                            <div className="card-body" style={{width:"250px"}}>
                                <h2 className="card-title">Book Title: {el.title}</h2>
                                <p><strong>Author</strong>: {el.author}</p>
                                <p>{el.description}</p>
                                <h3 className='card-title m-auto'>Price: &#8377; {el.price}</h3>
                                <div className="card-actions justify-center">
                                    <Link to={`/book-form/${el._id}`}><button className='btn btn-primary'>Edit</button></Link>
                                    <button className="btn btn-error text-white" onClick={() => deleteBook(el._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )) : <h1>No Any Book Available</h1>}
                </div>
            </main >
        </div >
    )
}


export default BookList