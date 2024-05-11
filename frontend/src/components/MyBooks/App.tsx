import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../Sidebar/Sidebar';
import MyBooksPage from './MyBooksPage';

export default function MyBooks() {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw' }}>
				<Sidebar listItem="my-books" />
				<Box
					component="main"
					className="MainContent"
					sx={{
						paddingInline: { xs: 2, sm: 2, md: 3 },
						paddingTop: 0,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						minWidth: '100vw',
						maxWidth: '90%',
						height: '100vh',
						gap: 1,
						overflowY: 'scroll',
					}}
				>
					<MyBooksPage />
				</Box>
			</Box>
		</CssVarsProvider>
	);
}