import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import { GENRES } from '../../constants/options';
import Autocomplete from '@mui/joy/Autocomplete';


interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export default function Search() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults] = useState<[]>([]);
	const [genres, setGenres] = useState<string[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				const postsData = await response.json();
				setResults(postsData);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [searchTerm, genres]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	};

	return (
		<>
			<Grid container spacing={2} columns={16}>
				<Grid xs={8}>
					<FormControl required>
						<Input
							type="search"
							size="lg"
							name="searchTerm"
							sx={{ width: '800px' }}
							required
							onChange={handleInputChange}
							placeholder='Search for books'
						/>
					</FormControl>
				</Grid>
				<Grid>
					<Autocomplete
						multiple
						size='lg'
						placeholder="Select"
						limitTags={2}
						options={GENRES}
						value={genres}
						onChange={(_e, newValue) => {
							setGenres(newValue);
						}}
					/>
				</Grid>
			</Grid>
			{
				loading ? <div>Loading...</div> :
					<div className='container' style={{ width: '80%', marginTop: '2em' }}>
						{results.slice(0, 10).map((post: Post) => (
							<BookCard
								key={post.id}
								bookName={post.title}
								dateString="April 24, 2024 to May 2, 2024"
							/>
						))}
					</div>
			}
		</>
	);
}