import React, { useEffect, useLayoutEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { shades } from "../../theme";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useLayoutEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const itemsRes = await fetch(`http://localhost:5050/api/data/${"aerio_product"}`, { method: "GET" });
      const itemsJson = await itemsRes.json();
      dispatch(setItems(itemsJson.data));
      console.log("itemsJson", items);

    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const filterActiveItems = (items) => {
    return items.filter(item => item.active === true || item.active === "true");
  };

  const artifactsAntiquesItems = filterActiveItems(items?.filter((item) => item.category === "Artifacts&Antiques"));
  const vintageCollectiblesItems = filterActiveItems(items?.filter((item) => item.category === "VintageCollectibles"));
  const booksManuscriptsItems = filterActiveItems(items?.filter((item) => item.category === "Books&Manuscripts"));
  const culturalReligiousItems = filterActiveItems(items?.filter((item) => item.category === "Cultural&Religious"));
  const naturalHistoryItems = filterActiveItems(items?.filter((item) => item.category === "NaturalHistory"));

  return (
    <div>
      <Box id='fea_prod' width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
          Our Featured <b style={{color:`${shades.secondary[500]}`}}>Products</b>
        </Typography>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
          sx={{
            m: "25px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="All" value="all" />
          <Tab label="Artifacts & Antiques" value="Artifacts&Antiques" />
          <Tab label="Vintage Collectibles" value="VintageCollectibles" />
          <Tab label="Books & Manuscripts" value="Books&Manuscripts" />
          <Tab label="Cultural & Religious" value="Cultural&Religious" />
          <Tab label="Natural History" value="NaturalHistory" />
        </Tabs>
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {value === "all" &&
            filterActiveItems(items).map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "Artifacts&Antiques" &&
            artifactsAntiquesItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "VintageCollectibles" &&
            vintageCollectiblesItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "Books&Manuscripts" &&
            booksManuscriptsItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "Cultural&Religious" &&
            culturalReligiousItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "NaturalHistory" &&
            naturalHistoryItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </Box>
      </Box>
    </div>
  );
};

export default ShoppingList;
