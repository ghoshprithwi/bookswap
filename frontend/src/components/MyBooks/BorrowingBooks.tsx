import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Button from '@mui/joy/Button';
import Search from '@mui/icons-material/Search';
import Link from '@mui/joy/Link';
import { ROUTES } from '../../constants/routes';
import axios from 'axios';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
  }

export default function BorrowingBooks() {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {	
	const fetchPosts = async () => {
			
				
		const id = localStorage.getItem('user')  ?? ''
		try {
			const response = await axios.get(
				`http://localhost:8082/api/books/borrowed?id=${id}`
			  );
			if (response.data){
				setPosts(response.data);
			}
		}
				
	 catch (error) {
		
	}
};
fetchPosts();
}, []);


  if (loading) return <div>Loading...</div>;

  return (
	<>
		<Link href={ROUTES.search} underline="none">
			<Button
				size='lg'
				color='warning'
				startDecorator={<Search />}
				sx={{ mb: '1em' }}
			>
				Find Books
			</Button>
		</Link>
		<div className='container'>
			{ posts.slice(0, 1).map( ( post: Post ) => (
				<BookCard
					key={post.id}
					bookName={post.title}
					dateString="April 24, 2024 to May 2, 2024"
				/>
			))}
		</div>
	</>
  );
}
