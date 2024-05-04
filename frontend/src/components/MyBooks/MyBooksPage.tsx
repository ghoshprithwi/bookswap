import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Chip from '@mui/joy/Chip';
import LendingBooks from './LendingBooks';

export default function MyBooksPage() {
	return (
		<>
		 {/*  <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2, backgroundColor: 'white', width: '100%' }}>
           My Books
          </Typography> */}
		  <Tabs
		    variant='plain'
		  	defaultValue={0}
			sx={{
				maxWidth: '90%',
				borderRadius: 'lg',
			}}
		  >
			<TabList
				sticky="top"
				tabFlex={1}
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
				<b>Second</b> tab panel
			</TabPanel>
		  </Tabs>
		</>
	)
}