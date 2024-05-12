import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
interface Book {
	bookName: string;
	authorName?: string;
	published?: string;
	condition?: string;
	availability: string;
	genres?: string;
	description?: string;
	owner?: string;
	requestedBy?: string;
}

export default function Requests() {
	const [loading, setLoading] = useState<boolean>(true);
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:8082/api/books');
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				const postsData = await response.json();
				setBooks(postsData);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			<Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
				Requests
			</Typography>
			{
				loading ? <div>{loading}</div> :
					<div className='container' style={{ width: '80%', marginTop: '2em' }}>
						{ books?.length > 0 && books.map((book: Book) => (
							<BookCard
								// key={book.id}
								type='request'
								bookName={book.bookName}
								condition={book.condition}
								description={book.description}
								dateString={book.availability}
								publishedYear={book.published}
								requestedBy='John Doe'
							/>
						))}
					</div>
			}
		</>
	);
}