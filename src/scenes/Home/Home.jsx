import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import { useQuery, gql } from "@apollo/client";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { continentData } from "./components/continentData";
import CountryDetails from "./components/CountryDetails";

// Definir la consulta
const GET_COUNTRIES = gql`
  query {
    countries {
      name
      continent {
        name
      }
      emoji
      emojiU
      capital
      languages {
        name
        native
      }
      currency
      states {
        name
      }
    }
  }
`;

const Home = () => {
  const style = {
    mt: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Estados
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryLoading, setCountryLoading] = useState(false);

  // Manejar el estado cuando se selecciona un país
  useEffect(() => {
    // Marcar el pais cuando esta seleccionado
    if (selectedCountry) {
      setCountryLoading(true);
    }
  }, [selectedCountry]);

  // Actualizar el estado cuando la información del país ha terminado de cargar
  useEffect(() => {
    if (countryLoading && !loading) {
      setCountryLoading(false);
    }
  }, [countryLoading, loading]);

  // Filtrar los países por continente, nombre y actualizar el estado correspondiente
  useEffect(() => {
    if (!loading && data) {
      console.log("Data loaded successfully:", data);
      const countries = data.countries;

      let filteredCountriesByContinent = countries;

      if (selectedContinents.length > 0) {
        filteredCountriesByContinent = countries.filter((country) =>
          selectedContinents.includes(country.continent.name)
        );
      }

      const filteredCountriesByName = filteredCountriesByContinent.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredCountries(filteredCountriesByName);
    }
  }, [loading, data, selectedContinents, searchTerm]);

  // estado de carga de la consulta
  if (loading) {
    return <p>Cargando...</p>;
  }

  // estado de error de la consulta
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Manejar la apertura/cierre del Modal y la selección/deselección de continentes
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCardClick = (country) => {
    console.log("Country selected:", country);
    setSelectedCountry(country);
  };

  const handleContinentClick = (name) => {
    if (selectedContinents.includes(name)) {
      setSelectedContinents((prevSelected) =>
        prevSelected.filter((continent) => continent !== name)
      );
    } else {
      setSelectedContinents((prevSelected) => [...prevSelected, name]);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Paises" subtitle="Vista de los paises" />
      </FlexBetween>

      <Box mt="1rem">
        <TextField
          label="Buscar país"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={handleOpen}
          style={{
            backgroundColor: "#00bcd4",
            color: "white",
          }}
        >
          Filtrar por continentes
        </Button>
      </Box>

      {/* Renderizar las tarjetas de los países filtrados */}
      <Box mt="1rem" display="flex" flexDirection="row" flexWrap="wrap">
        <Box
          mt="1rem"
          flex="1"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          {filteredCountries.map((country) => (
            <Box
              key={country.name}
              m="0.5rem"
              flexBasis="30%"
              flexGrow="1"
              onClick={() => handleCardClick(country)}
            >
              <CountryCard
                country={country}
                onCardClick={() => handleCardClick(country)}
                loading={countryLoading}
              />
            </Box>
          ))}
        </Box>

        {/* Detalles de la card seleccionada */}
        {selectedCountry && (
          <CountryDetails
            selectedCountry={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}

        {/* Modal para filtrar por continente*/}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Continentes
              </Typography>
              <Box
                mt="1rem"
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                {continentData.map(({ name, img }) => (
                  <Box
                    key={name}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="1rem"
                    marginRight="1rem"
                    borderRadius="8px"
                    cursor="pointer"
                    border={`2px solid ${
                      selectedContinents.includes(name)
                        ? "#00bcd4"
                        : "transparent"
                    }`}
                    onClick={() => handleContinentClick(name)}
                    p="1rem"
                  >
                    <img
                      src={img}
                      alt={name}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                    <Typography variant="subtitle1">{name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

export default Home;
