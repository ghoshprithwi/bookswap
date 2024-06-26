import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import axios from 'axios';
interface Book {
	_id: string,
	bookName: string;
	authorName?: string;
	published?: string;
	condition?: string;
	availability: string;
	genres?: string;
	description?: string;
	owner?: string;
	requester?: string;
}

export default function Requests() {
	const [loading, setLoading] = useState<boolean>(true);
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const userId = localStorage.getItem('user');
				const response = await axios.get(`http://localhost:8082/api/requests?id=${userId}`);
				if (!response.data) {
					throw new Error('Failed to fetch posts');
				}
				const postsData = response.data;
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
								id={book._id}
								type='request'
								bookName={book.bookName}
								authorName= {book.authorName}
								condition={book.condition}
								description={book.description}
								dateString={book.availability}
								publishedYear={book.published}
								requestedBy={book.requester}
							/>
						))}
					</div>
			}
		</>
	);
}