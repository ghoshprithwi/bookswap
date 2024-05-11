import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../Sidebar/Sidebar';
import Search from './Search';

export default function App() {
	return (
		<CssVarsProvider disableTransitionOnChange>
		  <CssBaseline />
		  <Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100%' }}>
			<Sidebar listItem="my-books" />
			<Box
			  component="main"
			  className="MainContent"
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				minWidth: '100%',
				maxWidth: '100%',
				height: '100vh',
				gap: 1,
				overflowY: 'scroll',
				padding: '1.5em',
			  }}
			>
			  <Search />
			</Box>
		  </Box>
		</CssVarsProvider>
	  );
}