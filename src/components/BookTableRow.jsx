import React from 'react'
import { deleteBook } from '../consultas/booksAxios'
import { useNavigate } from 'react-router-dom'

export default function PeopleTableRow({ book, setBook }) {

    const navigate = useNavigate()

    const handleEdit = (book) => {
        navigate(`/add-book?id=${book.id}`)
    }

    const handleDelete = async (id) => {
        await deleteBook(id)
        // Crear una nueva copia del array sin la persona que se acaba de eliminar
        const newBook = book.filter(p => p.id !== id)
        setBook(newBook)
    }

    return (
        book.map((book) => (
            <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.id}
                </th>
                <td className="px-6 py-4">
                    {book.isbn}
                </td>
                <td className="px-6 py-4">
                    {book.title}
                </td>
                <td className="px-6 py-4">
                    {book.author}
                </td>
                <td className="px-6 py-4">
                    {book.price}
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" onClick={() => handleEdit(book)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" onClick={() => handleDelete(book.id)} className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
        ))
    )
}
