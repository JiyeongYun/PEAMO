import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
// import { flexbox } from '@mui/system'

function SearchCard({ key, imgurl, brand, name}) {
  const cardStyle = {
    width: '18vw',
    height: '500px',
    margin: '10px',
    display: 'block',
    border: 'none'
  }
  const imgStyle = {
    width: '18vw',
    height: '400px',
    objectFit: 'contain'
  }

  return (
    <Card style={cardStyle} variant="outlined" key={key}>
        <CardMedia
          style={imgStyle}
          component="img"
          src={imgurl}
        ></CardMedia>
        <div style={{ whiteSpace: 'nowrap' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 16 }}>
              {brand}
            </Typography>
            <Typography sx={{ width:'260px', display: 'inline-block', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {name}
            </Typography>
          </CardContent>
        </div>
      </Card>
  )
}

export default SearchCard;