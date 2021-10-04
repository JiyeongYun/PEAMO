import { useDispatch } from 'react-redux';
import { getPerfumeDetail } from '../SearchComponents/searchSlice';
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
    // backgroundImage: `url('/images/myperfume.jpg')`,
    // backgroundSize: '100% 100%',
    // backgroundRepeat: 'no-repeat',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PerfumeCard({ perfume, togglePerfumeDetail }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const perfumeDetail = (perfumeId) => {
    dispatch(getPerfumeDetail(perfumeId));
    togglePerfumeDetail();
  };
  return (
    <Card className={classes.root} onClick={() => perfumeDetail(perfume.id)}>
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
