import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';

interface Book {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export default function HomePage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
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
								key={book.id}
								bookName={book.title}
								authorName="John Doe"
								publishedYear='2000'
								dateString="20 May 2024 to 1 Jun 2024"
								description="Agatha works at a cozy bookstore, but her life turns into a page-turner when a rare manuscript disappears. Aided by a handsome bookworm, she must decipher cryptic clues before a ruthless collector shuts the book on history forever."
							/>
						))}
					</div>
				)
			}
		</>
	)
}