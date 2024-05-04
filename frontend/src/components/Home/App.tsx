import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../Sidebar/Sidebar';
import HomePage from './HomePage';

export default function Home() {
	return (
		<CssVarsProvider disableTransitionOnChange>
		  <CssBaseline />
		  <Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw' }}>
			<Sidebar listItem="home" />
			<Box
			  component="main"
			  className="MainContent"
			  sx={{
				padding: { xs: 2, sm: 2, md: 3 },
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				minWidth: '100vw',
				maxWidth: '100vw',
				height: '100vh',
				gap: 1,
				overflow: 'none',
			  }}
			>
			  <HomePage />
			</Box>
		  </Box>
		</CssVarsProvider>
	  );
}