import React from "react";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

//import assets images
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

const heroTextureImports = importAll(
  require.context("../../assets/", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      showArrows={false}
      // renderArrowPrev={(onClickHandler, hasPrev, label) => (
      //   <IconButton
      //     onClick={onClickHandler}
      //     sx={{
      //       position: "absolute",
      //       top: "50%",
      //       left: "0",
      //       color: "white",
      //       padding: "5px",
      //       zIndex: "10",
      //     }}
      //   >
      //     <NavigateBeforeIcon sx={{ fontSize: "40px" }} />
      //   </IconButton>
      // )}
      // renderArrowNext={(onClickHandler, hasNext, label) => (
      //   <IconButton
      //     onClick={onClickHandler}
      //     sx={{
      //       position: "absolute",
      //       top: "50%",
      //       right: "0",
      //       color: "white",
      //       padding: "5px",
      //       zIndex: "10",
      //     }}
      //   >
      //     <NavigateNextIcon sx={{ fontSize: "40px" }} />
      //   </IconButton>
      // )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "725px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="25px"
            borderRadius="1px"
            textAlign="left"
            bgcolor={isNonMobile ? 'unset' : 'rgba(0,0,0,0.5)'}
            position="absolute"
            top="25%"
            left={isNonMobile ? "4%" : "0%"}
            right={isNonMobile ? "undefined" : "0"}
            margin={isNonMobile ? "undefined" : "0 auto"}
            maxWidth={isNonMobile ? "undefined" : "240px"}
            width={isNonMobile ? "40%" : "100%"}
          >
            <Typography variant="h1" color={isNonMobile ? shades.secondary[500] : shades.secondary[200]} fontSize={'clamp(2rem, 5vw, 4rem)'} textAlign={'justify'}>Ancient Finds Festival</Typography>
            <Typography variant="h6" color={isNonMobile ? shades.secondary[800] : shades.primary[100]} fontWeight="normal" fontSize={'clamp(0.5rem, 5vw, 1rem)'} textAlign={'justify'}>
            Discover rare treasures at the Ancient Finds Festival! Explore vintage artifacts and historical gems at exclusive prices. Shop now before they’re gone!
            </Typography>
            <Typography
              fontWeight="normal"
              color={shades.secondary[100]}
              bgcolor={shades.secondary[800]}
              width={isNonMobile ? "fit-content" : "fit-content"}
              sx={{ textDecoration: "underline", cursor: "pointer", padding: "10px", marginTop:'15px' }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
