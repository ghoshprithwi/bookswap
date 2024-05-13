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
import Snackbar from '@mui/joy/Snackbar';
import axios from 'axios';

interface Book {
	id: string;
	bookName: string;
	authorName?: string;
	publishedYear?: string;
	condition?: string;
	dateString: string;
	genres?: string;
	description?: string;
	owner?: string;
	type?: string;
	requestedBy?: string;
}

export default function BookCard(props: Book) {
	const [open, setOpen] = useState<boolean>(false);
	const userid = localStorage.getItem('user')
	const ownerid = props.owner;
	const [showRequestToast, setShowRequestToast] = useState<boolean>(false);
	const [showAcceptToast, setshowAcceptToast] = useState<boolean>(false);
	const [showRejectToast, setshowRejectToast] = useState<boolean>(false);

	const sendBorrowRequest = async () => {
		try {
			const bookId = props.id;
			const userId = localStorage.getItem('user');
			const data = {
				bookId,
				ownerId: ownerid,
				userId
			}
			const response = await axios.post(
				"http://localhost:8082/api/requests",
				{ ...data }
			);

			if ( 200 === response.status ) {
				setShowRequestToast(true);
				window.location.reload();
			}
		}
		catch (err) {
			console.log(err)
		}
	};

	const acceptRequest = async () => {
		const bookId = props.id;
		const ownerId = localStorage.getItem('user')
		const requesterId = props.requestedBy;
		const data = {
			bookId, ownerId, requesterId
		}
		try {
			const response = await axios.put(
				"http://localhost:8082/api/requests/accept",
				{ ...data });
			if (response.data) {
				setshowAcceptToast(true);
				setOpen(false);
				window.location.reload();
			}
		}
		catch (error) {
			alert('Unable to accept this request');
		}
	};

	const rejectRequest = async () => {
		const bookId = props.id;
		const ownerId = localStorage.getItem('user')
		const requesterId = props.requestedBy;
		const data = {
			bookId, ownerId, requesterId
		}
		try {
			const response = await axios.put(
				"http://localhost:8082/api/requests/reject",
				{ ...data });
			if (response.data) {
				setshowRejectToast(true);
				setOpen(false);
				window.location.reload();
			}
		}
		catch (error) {
			alert('Unable to reject this request');
		}
	};

	const { bookName, authorName, publishedYear, condition, dateString, genres, description, owner, type, requestedBy } = props;
	console.log({ owner, userid });
	return (
		<>
			<Card sx={{ width: 320 }}>
				<div>
					{
						type === 'request' &&
						<div>
							<Typography level="body-xs">
								Requested by {' '}
								<Typography fontSize="md" fontWeight="lg">
									{requestedBy}
								</Typography>
							</Typography>
						</div>
					}
					<Typography level="title-lg">{bookName}</Typography>
					<Typography level="body-sm">{dateString}</Typography>
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
							width: 720,
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
									{bookName}
								</Typography>
								<Typography
									component="p"
									id="author-name"
									textColor="inherit"
									fontWeight="md"
									mb={1}
								>
									by {authorName}
								</Typography>
								<Divider sx={{ mb: '1em' }} />
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
								<Divider sx={{ mb: '1em' }} />
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
						{
							type === 'request' &&
							<>
								<Button
									variant="solid"
									size="md"
									color="success"
									sx={{ mr: '16px', alignSelf: 'center', fontWeight: 600 }}
									onClick={acceptRequest}
								>
									Accept Request
								</Button>
								<Button
									variant="solid"
									size="md"
									color="danger"
									sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
									onClick={rejectRequest}
								>
									Reject Request
								</Button>
							</>
						}
						{userid !== owner && type !== 'request' &&
							<Button
								variant="solid"
								size="lg"
								color="primary"
								sx={{ mt: '1em', alignSelf: 'center', fontWeight: 600 }}
								onClick={sendBorrowRequest}
							>
								Request to Borrow
							</Button>
						}

					</Sheet>
				</Modal>
			</Card>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={showRequestToast}
				variant='outlined'
				color='primary'
				onClose={() => {
					setShowRequestToast(false);
				}}
			>
				Borrow Request Sent
			</Snackbar>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={showAcceptToast}
				variant='outlined'
				color='primary'
				onClose={() => {
					setshowAcceptToast(false);
				}}
			>
				Request Accepted
			</Snackbar>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={showRejectToast}
				variant='outlined'
				color='primary'
				onClose={() => {
					setshowRejectToast(false);
				}}
			>
				Request Rejected
			</Snackbar>
		</>
	);
}
