import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="90%"
        margin="auto"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width={isNonMobile ? 'clamp(20%, 30%, 40%)' :`100%`}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            AERIO
          </Typography>
          <div style={{textAlign: "justify"}}>
          At Aerio, we bring history to life with a carefully curated selection of ancient artifacts, vintage collectibles, and timeless treasures. Each piece tells a story, offering a glimpse into the past. Whether you're a passionate collector or simply appreciate the beauty of history, you'll find something extraordinary here. Explore our collection and own a piece of the past today! <br/>
© 2025 <a href="https://shanvix.netlify.app/">ShanVix</a>
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width={isNonMobile ? 'clamp(20%, 25%, 30%)' :`100%`}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: aerio@gmail.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
