import React from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//rrd
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductOverview from "./pages/ProductOverview";
// import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
//Component
import Footer from "./components/Footer";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PrivateRoute from "./Private/PrivateRoute";
import Reset from "./Auth/Reset";
import { GlobalStyle } from "./GlobalStyles";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import SearchProduct from "./pages/SearchProduct";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24,24,29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      card_bg: "#b0a69d",
      footer_bg: "#0a1435",
      head: "#E2218F",
      desc : "#8DC6A3",
      btn: "rgb(98,84,243)",
      hr: "#fffff",
      border: "rgba(98, 84, 243, 0.5)",
      gradient:
        "linear-gradient(0deg, rgb(132, 144, 255) 0%, rgb(98, 189, 252) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      shadowSupport: "rgba(0,0,0,0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Main>
          <GlobalStyle />
          {/* <Header /> */}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/resetpassword" element={<Reset />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/search" element={<SearchProduct />} />
            <Route
              exact
              path="/singleproduct/:id"
              element={<ProductOverview />}
            />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route
              exact
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route exact path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;
