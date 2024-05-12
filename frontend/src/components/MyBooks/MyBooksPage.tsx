import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Chip from '@mui/joy/Chip';
import LendingBooks from './LendingBooks';
import BorrowingBooks from './BorrowingBooks';

export default function MyBooksPage() {
	return (
		<>
			<Tabs
				variant='plain'
				defaultValue={0}
				sx={{
					maxWidth: '100%',
					borderRadius: 'lg',
				}}
			>
				<TabList
					sticky="top"
					tabFlex={1}
					variant='outlined'
				>
					<Tab sx={{ outline: 'none' }}>
						Lending {' '}
						<Chip
							size="md"
							variant="solid"
							color='primary'
						>
							5
						</Chip>
					</Tab>
					<Tab sx={{ outline: 'none' }}>
						Borrowing {' '}
						<Chip
							size="md"
							variant="solid"
							color='primary'
						>
							1
						</Chip>
					</Tab>
				</TabList>
				<TabPanel value={0}>
					<LendingBooks />
				</TabPanel>
				<TabPanel value={1}>
					<BorrowingBooks />
				</TabPanel>
			</Tabs>
		</>
	)
}