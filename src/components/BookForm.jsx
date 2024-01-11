import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createBook, updateBook, getBookById } from '../consultas/booksAxios'

export default function PersonForm({ book, setBook }) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const id = params.get('id')

    const [data, setData] = useState({ id: '', isbn: '', title: '', author: '', price: '' });

    useEffect(() => {
        if (id) {
            getBookById(id).then((book) => {
                setData(book)
            }).catch(() => {
                const bookFromList = book.find(p => p.id === id)
                if (bookFromList) {
                    setData(bookFromList)
                }
            })
        }
    }, [id])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let updatedBook = [...book]
        if (id) {
            const index = updatedBook.findIndex(p => p.id === id)
            if (index !== -1) {
                updatedBook[index] = data
            }
            await updateBook(id, data)
        } else {
            await createBook(data)
            updatedBook.push(data)
        }
        setBook(updatedBook)
        navigate('/')
    }

    return (
        <>
            <h1 className='text-2xl font-bold mb-10'>Book</h1>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <input type="hidden" name="id" value={data.id} onChange={handleChange} />
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">ISBN:</span>
                        <div className="relative">
                            <input type="text" name="isbn" value={data.isbn} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Title:</span>
                        <div className="relative">
                            <input type="text" name="title" value={data.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Author:</span>
                        <div className="relative">
                            <input type="text" name="author" value={data.author} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Price:</span>
                        <div className="relative">
                            <input type="text" name="price" value={data.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Guardar</button>
            </form>
        </>
    )
}

