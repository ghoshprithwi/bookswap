import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import Grid from '@mui/joy/Grid';
import Divider from '@mui/joy/Divider';

interface Book {
	bookName: string;
	authorName?: string;
	publishedYear?: string;
	condition?: string;
	dateString: string;
	genres?: string;
	description?: string;
	owner?: string;
}

export default function BookCard(props: Book) {
	const [open, setOpen] = useState<boolean>(false);

	const sendBorrowRequest = () => {
		// TODO: Send borrow request via API.
		console.log( 'send borrow request');
	};

	const { bookName, authorName, publishedYear, condition, dateString, genres, description, owner } = props;
	return (
		<Card sx={{ width: 320 }}>
		<div>
			<Typography level="title-lg">{ bookName }</Typography>
			<Typography level="body-sm">{ dateString }</Typography>
		</div>
		<img src="https://placehold.co/240x320" />
		<CardContent orientation="horizontal">
			<div>
				<Typography level="body-xs">Written By</Typography>
				<Typography fontSize="md" fontWeight="lg">
					{authorName}
				</Typography>
			</div>
			<Button
				variant="solid"
				size="md"
				color="primary"
				sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
				onClick={() => setOpen(true)}
			>
				Details
			</Button>
		</CardContent>
		<Modal
			aria-labelledby="book-details"
			aria-describedby="book-details"
			open={open}
			onClose={() => setOpen(false)}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Sheet
				variant="outlined"
				sx={{
					maxWidth: 750,
					borderRadius: 'md',
					p: 3,
					boxShadow: 'lg',
				}}
			>
				<ModalClose variant="plain" sx={{ m: 1 }} />
				<Grid container spacing={2} columns={16} sx={{ flexGrow: 1, mb: '1.5em' }}>
					<Grid xs={6}>
						<img src="https://placehold.co/240x320" style={{ borderRadius: '1em' }} />
					</Grid>
					<Grid xs={10}>
						<Typography
							component="h3"
							id="modal-title"
							level="h3"
							textColor="inherit"
							fontWeight="lg"
							mb={1}
							sx={{
								textTransform: 'capitalize',
							}}
						>
							{ bookName }
						</Typography>
						<Typography
							component="p"
							id="author-name"
							textColor="inherit"
							fontWeight="md"
							mb={1}
						>
							by { authorName }
						</Typography>
						<Divider sx={{ mb: '1em' }}/>
						<Typography
							component="p"
							id="description"
							textColor="inherit"
							fontWeight="lg"
							mb={1}
						>
							Published in: {publishedYear}
						</Typography>
						<Typography
							component="p"
							id="condition"
							textColor="inherit"
							fontWeight="lg"
							mb={1}
						>
							Condition: {condition}
						</Typography>
						<Typography
							component="p"
							id="date"
							textColor="inherit"
							fontWeight="lg"
							mb={1}
						>
							Available between:  {dateString}
						</Typography>
						<Divider sx={{ mb: '1em' }}/>
						<Typography
							component="p"
							id="date"
							textColor="inherit"
							fontWeight="lg"
							mb={1}
						>
							Posted By: {owner}
						</Typography>
					</Grid>
				</Grid>
				<Typography
					component="p"
					id="description"
					textColor="inherit"
					fontWeight="md"
					mb={1}
				>
					Genres: {genres}
				</Typography>
				<Typography
					component="p"
					id="description"
					textColor="inherit"
					fontWeight="md"
					mb={1}
				>
					{description}
				</Typography>
				<Button
					variant="solid"
					size="lg"
					color="primary"
					sx={{ mt: '1em', alignSelf: 'center', fontWeight: 600 }}
					onClick={sendBorrowRequest}
				>
					Request to Borrow
				</Button>
			</Sheet>
		</Modal>
	</Card>
  );
}
