import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { paisesData } from "./countryData";

const CountryCard = memo(({ country, onCardClick  }) => {
  const {
    name,
    continent,
    capital,
  } = country;
  const [imageUrl, setImageUrl] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    const fetchImage = async (searchQuery) => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=40676871-b3da7cae6511f5e598bd90b65&q=${searchQuery}&image_type=photo`
        );
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          setImageUrl(data.hits[0].webformatURL);
        } else {
          //en caso no se encuentre nada en el buscador de la url original se colocara una imagen predeterminada
          setImageUrl('https://placekitten.com/300/150');
        }
      } catch (error) {
         //en caso no se encuentre nada en el buscador de la url original se colocara una imagen predeterminada
        setImageUrl('https://placekitten.com/300/150');
      }
    };

    //en caso el nombre del pais sea igual al de la data interna colocar el icono respectivo
    const countryData = paisesData.find((pais) => pais.paisName === name);

    if (countryData) {
      fetchImage(countryData.code);
      setCountryCode(countryData.code);
    } else {
      fetchImage(capital);
      setCountryCode('');
    }
  }, [name, capital]);

  return (
    <Card sx={{ maxWidth: 300 }} onClick={onCardClick}>
      <CardActionArea>
        <CardMedia
          component="div"
          style={{
            objectFit: 'cover',
            width: '300px',
            height: '150px',
            background: `url(${imageUrl}) center/cover no-repeat`,
          }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              {/* colocar el icono  */}
              {countryCode && (
                <img
                  src={`https://flagcdn.com/48x36/${countryCode}.png`}
                  srcSet={`https://flagcdn.com/96x72/${countryCode}.png 2x,
                  https://flagcdn.com/144x108/${countryCode}.png 3x"`}
                  width="48"
                  height="36"
                  alt={name}
                />
              )}
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h4" component="div" style={{ color: '#00bcd4' }}>
                {name}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {continent.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default CountryCard;