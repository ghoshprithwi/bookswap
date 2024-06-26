import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ROUTES } from '../../constants/routes';
import axios from "axios";
import Snackbar from '@mui/joy/Snackbar';

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
	persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}


function ColorSchemeToggle(props: IconButtonProps) {
	const { onClick, ...other } = props;
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	return (
		<IconButton
			aria-label="toggle light/dark mode"
			size="sm"
			variant="outlined"
			disabled={!mounted}
			onClick={(event) => {
				setMode(mode === 'light' ? 'dark' : 'light');
				onClick?.(event);
			}}
			{...other}
		>
			{mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
		</IconButton>
	);
}

export default function LoginPage() {
	const [openErrorToast, setOpenErrorToast] = React.useState(false);

	const handleLogin = async (e: React.FormEvent<SignInFormElement>) => {
		e.preventDefault();

		const formElements = e?.currentTarget?.elements;

		// Form Data.
		const data = {
			email: formElements.email.value,
			password: formElements.password.value,
		};

		// TODO: Authenticate user.
		try {
			const response = await axios.post(
				"http://localhost:8082/api/login",
				{ ...data }
			);

			if (response.data) {
				// Get the logged in user id.

				// Save in localStorage.
				window.localStorage.setItem( 'user', response.data['_id'] );
				window.localStorage.setItem('email', response.data['email']);
				window.localStorage.setItem('name', response.data['firstName']);


				// Route to Home.
				window.location.replace("/home");
			}
		} catch (err) {
			setOpenErrorToast(true);
		}

	};

	return (
		<CssVarsProvider defaultMode="dark" disableTransitionOnChange>
			<CssBaseline />
			<GlobalStyles
				styles={{
					':root': {
						'--Form-maxWidth': '800px',
						'--Transition-duration': '0.4s', // set to `none` to disable transition
					},
				}}
			/>
			<Box
				sx={(theme) => ({
					width: { xs: '100%', md: '50vw' },
					transition: 'width var(--Transition-duration)',
					transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 1,
					display: 'flex',
					justifyContent: 'flex-end',
					backdropFilter: 'blur(12px)',
					backgroundColor: 'rgba(255 255 255 / 0.2)',
					[theme.getColorSchemeSelector('dark')]: {
						backgroundColor: 'rgba(19 19 24 / 0.4)',
					},
				})}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100dvh',
						width: '100%',
						px: 2,
					}}
				>
					<Box
						component="header"
						sx={{
							py: 3,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
							<IconButton variant="soft" color="primary" size="sm">
								<MenuBookIcon />
							</IconButton>
							<Link href={ROUTES.login} underline="none" paddingRight={'8px'}>
								<Typography level="title-lg">BookSwap</Typography>
							</Link>
						</Box>
						<ColorSchemeToggle />
					</Box>
					<Box
						component="main"
						sx={{
							my: 'auto',
							py: 2,
							pb: 5,
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							width: 400,
							maxWidth: '100%',
							mx: 'auto',
							borderRadius: 'sm',
							'& form': {
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
							},
						}}
					>
						<Stack gap={4} sx={{ mb: 2 }}>
							<Stack gap={1}>
								<Typography component="h1" level="h3">
									Sign in
								</Typography>
								<Typography level="body-sm">
									New to BookSwap?{' '}
									<Link href={ROUTES.register} level="title-sm">
										Sign up!
									</Link>
								</Typography>
							</Stack>
						</Stack>
						<Stack gap={4} sx={{ mt: 2 }}>
							<form onSubmit={handleLogin}>
								<FormControl required>
									<FormLabel>Email</FormLabel>
									<Input type="email" name="email" required />
								</FormControl>
								<FormControl required>
									<FormLabel>Password</FormLabel>
									<Input type="password" name="password" required />
								</FormControl>
								<Stack gap={4} sx={{ mt: 2 }}>
									<Button type="submit" fullWidth>
										Sign in
									</Button>
								</Stack>
							</form>
						</Stack>
					</Box>
					<Box component="footer" sx={{ py: 3 }}>
						<Typography level="body-xs" textAlign="center">
							© BookSwap {new Date().getFullYear()}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				sx={() => ({
					height: '100%',
					position: 'fixed',
					right: 0,
					top: 0,
					bottom: 0,
					left: { xs: 0, md: '50vw' },
					transition:
						'background-image var(--Transition-duration), left var(--Transition-duration) !important',
					transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
					backgroundColor: 'background.level1',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundImage: 'url(https://source.unsplash.com/random/900/?library&dpr=2)',
				})}
			/>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={openErrorToast}
				variant='outlined'
				color='danger'
				onClose={() => {
					setOpenErrorToast(false);
				}}
			>
				Wrong credentials.
			</Snackbar>
		</CssVarsProvider>
	);
}