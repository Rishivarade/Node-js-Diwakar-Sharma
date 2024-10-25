import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup';
// import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../index.css'
const bookValues = {
    title: '',
    author: '',
    description: '',
    price: '',
    isbn: '',
    image: '',
}
const BookForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    // add function function
    const addBook = async (values, { resetForm }) => {
        try {
            const addBook = await axios.post("http://localhost:8008/book/addBook", values);
            // if (addBook.status === 200) {
            //     toast.success(addBook.data);
            // }
            resetForm();


        } catch (error) {
            // toast.error("something went wrong");
            res.send("something went wrong")
        } finally {
            resetForm();
        }
    }

    const updateBook = async (values, { resetForm }) => {
        try {
            const updateBook = await axios.put(`http://localhost:8008/book/updateBook/${id}`, values);
            if (updateBook.status === 200) {

                // toast.success(updateBook.data);
                navigate('/')
                
                resetForm();
            }
        } catch (error) {
            toast.error(updateBook.data);
        }
    }

    const bookInputValidation = Yup.object({
        title: Yup.string().min(3, "Minimum 3 Characters").required(),
        author: Yup.string().min(3, "Minimum 3 Characters").required(),
        description: Yup.string(),
        price: Yup.string().required(),
        isbn: Yup.string()
    })

    const validationFunction = useFormik({
        initialValues: bookValues,
        validationSchema: bookInputValidation,
        onSubmit: id ? updateBook : addBook
    });

    useEffect(() => {
        if (id) {
            const getBookById = async () => {
                try {
                    const response = await axios.get(`http://localhost:8008/book/getBookById/${id}`);
                    if (response.status === 200) {
                        validationFunction.setValues(response.data);
                    }
                } catch (error) {
                    toast.error("something went wrong");
                }
            }
            getBookById();
        }
    }, [])
    return (
        <div className='' style={{width:"350px",margin:"auto",border:"2px solid black",padding:"40px"}}>
            <form className="" onSubmit={validationFunction.handleSubmit}>
                <h3 className="">{id ? "Update Book" : "Add New Book"}</h3>
                <div className='mb-4 text-center'>
                    <input type="text" name='image' placeholder="Book Image Url" value={validationFunction.values.image} className="" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.image && validationFunction.errors.image ? <div className=''>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='title' placeholder="Book Title" value={validationFunction.values.title} className="input" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.title && validationFunction.errors.title ? <div className=''>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='author' placeholder="Book Author" value={validationFunction.values.author} className="input" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.author && validationFunction.errors.author ? <div className=''>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="number" name='price' placeholder="Book Price" value={validationFunction.values.price} className="input" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.price && validationFunction.errors.price ? <div className=''>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='description' placeholder="Book Description" value={validationFunction.values.description} className="input" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.description && validationFunction.errors.description ? <div className=''>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='isbn' placeholder="Book ISBN" value={validationFunction.values.isbn} className="input" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.isbn && validationFunction.errors.isbn ? <div className=''>Field required</div> : null}
                </div>
                <button className='btn btn-primary block m-auto' type='submit'>{id ? "Update Book" : "Add Book"}</button>
            </form>
            
        </div>
    )
}

export default BookForm