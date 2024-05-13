import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';

interface Book {
	bookName: string,
	authorName: string,
	availability: string,
	published: string,
	_id: string,
	description: string,
	ownerid: string,
	condition: string,
	genre: string[]

}

export default function HomePage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
					
				const response = await fetch('http://localhost:8082/api/books');
				if (!response.ok) {
					throw new Error('Failed to fetch books');
				}
				const booksData = await response.json();
				setBooks(booksData);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchBooks();
	}, []);

	return (
		<>
			<Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
				Books For You
			</Typography>
			{
				loading ? <div>Loading...</div> : (
					<div className='container'>
						{books.slice(0, 12).map((book: Book) => (
							<BookCard
								id={book._id}
								bookName={book.bookName}
								authorName={book.authorName}
								publishedYear={book.published}
								dateString= {book.availability}
								description={book.description}
								owner = {book.ownerid}
								condition = {book.condition}
								genres={book.genre}
							/>
						))}
					</div>
				)
			}
		</>
	)
}