import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function BookCard(props: any) {
  const { bookName, authorName, dateString, imgSrc } = props;
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{ bookName } by { authorName }</Typography>
        <Typography level="body-sm">{ dateString }</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={ imgSrc } />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2,900
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}
