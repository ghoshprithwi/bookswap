import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import { useState } from 'react';
import BookCard from '../BookCard/BookCard';
import { GENRES } from '../../constants/options';
import Autocomplete from '@mui/joy/Autocomplete';
import axios from 'axios';
interface Book {
	bookName: string;
	authorName?: string;
	published?: string;
	condition?: string;
	availability: string;
	genres?: string;
	description?: string;
	owner?: string;
}
interface FormElements extends HTMLFormControlsCollection {
	title: HTMLInputElement,
	author: HTMLInputElement,
	genres: HTMLInputElement;
	location: HTMLInputElement;
}

interface SearchFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

export default function Search() {
	const [loading, setLoading] = useState<string>('No Results');
	const [results, setResults] = useState<[]>([]);
	const [genres, setGenres] = useState<string[]>([]);

	const sendSearchRequest = async (event: React.FormEvent<SearchFormElement>) => {
		event.preventDefault();

		const formElements = event.currentTarget.elements;

		// Form Data.
		const data = {
			title: formElements.title.value ?? '',
			author: formElements.author.value ?? '',
			location: formElements.location.value ?? '',
			genres: genres,
		};

		console.log( data );
		try {
			const response = await axios.post(
				"http://localhost:8082/api/users",
				{ ...data }
			);

			console.log( response );
			setLoading('Loading...');

			if (response.data) {
				setResults(response.data);
				setLoading('');
			}
		} catch (err) {
			setLoading('No Results');
		}
	};

	return (
		<>
			<form onSubmit={sendSearchRequest}>
				<Grid container spacing={2} columns={16}>
					<Grid xs={4}>
						<Input
							type="search"
							size="lg"
							name="title"
							placeholder='Search by title'
						/>
					</Grid>
					<Grid xs={3}>
						<Input
							type="text"
							size="lg"
							name="location"
							placeholder='Search by location'
						/>
					</Grid>
					<Grid xs={3}>
						<Input
							type="text"
							size="lg"
							name="author"
							placeholder='Search by author name'
						/>
					</Grid>
					<Grid xs={3}>
						<Autocomplete
							multiple
							size='lg'
							placeholder="Select Genre"
							limitTags={2}
							options={GENRES}
							value={genres}
							onChange={(_e, newValue) => {
								setGenres(newValue);
							}}
						/>
					</Grid>
					<Grid xs={2}>
						<Button size="lg" type="submit" fullWidth>
							Search
						</Button>
					</Grid>
				</Grid>
			</form>
			{
				loading ? <div>{loading}</div> :
					<div className='container' style={{ width: '80%', marginTop: '2em' }}>
						{ results?.length > 0 && results.map((book: Book) => (
							<BookCard
								// key={book.id}
								bookName={book.bookName}
								condition={book.condition}
								description={book.description}
								dateString={book.availability}
								publishedYear={book.published}
							/>
						))}
					</div>
			}
		</>
	);
}