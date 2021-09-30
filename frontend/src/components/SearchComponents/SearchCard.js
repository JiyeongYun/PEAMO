import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
// import { flexbox } from '@mui/system'

function SearchCard({ key, imgurl, brand, name}) {
  const cardStyle = {
    width: '340px',
    height: '500px',
    margin: '10px',
    display: 'block'
  }
  const imgStyle = {
    width: '340px',
    height: '400px'
  }

  return (
    <Card style={cardStyle} key={key}>
        <CardMedia
          style={imgStyle}
          component="img"
          src={imgurl}
        ></CardMedia>
        <div style={{ whiteSpace: 'nowrap' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 16 }}>
              {brand}
            </Typography>
            <Typography sx={{ width:'300px', alignItems: 'center', fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis', background: 'pink' }}>
              {name}
            </Typography>
          </CardContent>
        </div>
      </Card>
  )
}

export default SearchCard;