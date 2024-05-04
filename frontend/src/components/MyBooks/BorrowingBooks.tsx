import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import './MyBooks.css';

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
        let postsData = await response.json();
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
		<div className='container'>
			{ posts.slice(0, 8).map( ( post: any ) => (
				<BookCard
					key={post.id}
					bookName={post.title}
					dateString="April 24, 2024 to May 2, 2024"
					imgSrc="https://placehold.co/280"
				/>
			))}
    	</div>
	</>
  );
}
