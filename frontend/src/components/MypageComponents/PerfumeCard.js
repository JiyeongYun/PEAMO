// style
import { makeStyles } from '@material-ui/core/styles';
import './PerfumeCard.css';

// components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    maxHeight: 275,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PerfumeCard({ perfume }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <img className="card_image" src={perfume.imgurl} alt={perfume.name} />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {perfume.name}
        </Typography>
        <Typography className="perfume_brand" component="p">
          {perfume.brand.name}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
