import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, Select, MenuItem } from "@mui/material";
import { paisesData } from "./countryData";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const CountryDetails = ({ selectedCountry, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [countryCode, setCountryCode] = useState("");

  //hacer otra peticion para los detalles del pais
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
          setImageUrl("https://placekitten.com/300/150");
        }
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        setImageUrl("https://placekitten.com/300/150");
      }
    };

    const countryData = paisesData.find(
      (pais) => pais.paisName === selectedCountry.name
    );

    if (countryData) {
      fetchImage(countryData.code);
      setCountryCode(countryData.code);
    } else {
      fetchImage(selectedCountry.capital);
      setCountryCode("");
    }
  }, [selectedCountry]);

  return (
    <Box
      ml="1rem"
      width="300px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
      p="1rem"
      bgcolor="white"
      color="gray"
      height="600px"
      overflowY="auto"
      position="relative"
    >
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          cursor: "pointer",
          color:"black"
        }}
      >
        X
      </Button>

      {/* Mostrar la imagen */}
      {imageUrl && (
        <img
        src={imageUrl}
        alt={`${selectedCountry.name} Image`}
        style={{ maxWidth: "100%", marginTop: "2rem", borderRadius: "8px" }}
      />
      )}

      {/* Mostrar el icono de la bandera */}
      <Grid mt="1rem" container spacing={2}>
        <Grid item>
          {countryCode && (
            <img
              src={`https://flagcdn.com/48x36/${countryCode}.png`}
              srcSet={`https://flagcdn.com/96x72/${countryCode}.png 2x,
                  https://flagcdn.com/144x108/${countryCode}.png 3x"`}
              width="48"
              height="36"
              alt={selectedCountry.name}
            />
          )}
        </Grid>
        <Grid item>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontWeight: "bold", color: "#00bcd4" }}
          >
            {selectedCountry.name}
          </Typography>
          <Typography variant="h5" color="gray">
            {selectedCountry.continent.name}
          </Typography>
        </Grid>
      </Grid>
      <Typography mt="1rem" variant="subtitle1">
  <span style={{ color: "#00bcd4", fontWeight: "bold" }}>Capital:</span>{" "}
  <span style={{ color: "black" }}>{selectedCountry.capital}</span>
</Typography>
<Typography variant="subtitle1">
  <span style={{ color: "#00bcd4", fontWeight: "bold" }}>Languages:</span>{" "}
  <span style={{ color: "black" }}>
    {selectedCountry.languages.map((lang) => lang.name).join(", ")}
  </span>
</Typography>
<Typography variant="subtitle1">
  <span style={{ color: "#00bcd4", fontWeight: "bold" }}>Currency:</span>{" "}
  <span style={{ color: "black" }}>{selectedCountry.currency}</span>
</Typography>
<Typography variant="subtitle1" style={{ color: "#00bcd4", fontWeight: "bold" }}>
  States:
</Typography>
      {/*Select para colocar los estados */}
      <Select
        placeholder="Select states…"
        IconComponent={KeyboardArrowDown}
        style={{
          width: "100%",
          marginBottom: "1rem",
          color: "black",
          border: "1px solid black",
          borderRadius: "4px",
        }}
        value={selectedCountry.states.map((state) => state.name)}
      >
        {selectedCountry.states.length > 0 ? (
          selectedCountry.states.map((state) => (
            <MenuItem key={state.name} value={state.name}>
              {state.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Estados no encontrados</MenuItem>
        )}
      </Select>
    </Box>
  );
};

export default CountryDetails;
