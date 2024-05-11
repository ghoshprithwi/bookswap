import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Button from '@mui/joy/Button';
import Search from '@mui/icons-material/Search';
import Link from '@mui/joy/Link';
import { ROUTES } from '../../constants/routes';

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
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await response.json();
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
