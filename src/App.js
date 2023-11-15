
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "scenes/Home/Home";
import Vista1 from "scenes/Vista1/Vista1";
import Vista2 from "scenes/Vista2/Vista2";
import Layout from "scenes/layout/Layout";
import { themeSettings } from "theme";


function App() {

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/home" replace /> } />
                <Route path="/home" element={<Home /> } />
                <Route path="/vista1" element={<Vista1 /> } />
                <Route path="/vista2" element={<Vista2 /> } />
              </Route>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
