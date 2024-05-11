import Box from '@mui/joy/Box';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { ROUTES } from '../../constants/routes';

export default function Logo() {
	return (
		<>
			<Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
				<IconButton variant="soft" color="primary" size="sm">
					<MenuBookIcon />
				</IconButton>
					<Link href={ROUTES.login} underline="none" paddingRight={'8px'}>
					<Typography level="title-lg">BookSwap</Typography>
				</Link>
			</Box>
		</>
	)
}
