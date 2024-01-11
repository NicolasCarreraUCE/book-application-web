import React, { useEffect } from 'react'
import { getAllBooks } from '../consultas/booksAxios'
import BookTableRow from './BookTableRow'

export default function PeopleTable({ book, setBook }) {
    useEffect(() => {
        const fetchBook = async () => {
            const data = await getAllBooks()
            console.log(data);
            setBook(data);
        };

        fetchBook();
    }, []);
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ISBN
                        </th>
                        <th scope="col" className="px-6 py-3">
                            TITLE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            AUTHOR
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PRICE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <BookTableRow book={book} setBook={setBook} />
                    }
                </tbody>
            </table>
        </div>
    )
}
