import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  console.log("items", items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  } 

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    const items = await fetch("https://aerio-server.onrender.com/api/items?populate=image", {method:"GET"})
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data))
  } 

 

  const topRatedItems = items.filter((item) => item.attributes.category === "topRated")
  const newArrivalsItem = items.filter((item) => item.attributes.category === "newArrivals")
  const bestSellersItems = items.filter((item) => item.attributes.category === "bestSellers")


  return <div>
    <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
        </Typography>
        <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{sx:{display:isNonMobile? "block" : "none"}}}
            sx={{m:"25px", "& .MuiTabs-flexContainer" : {
                flexWrap:"wrap"
            }}}
        >
            <Tab label="All" value="all" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
            <Tab label="BEST SELLERS" value="bestSellers" />
            <Tab label="TOP RATED" value="topRated" />

        </Tabs>
            <Box margin="0 auto" display="grid" gridTemplateColumns="repeat(auto-fill, 300px)" justifyContent="space-around" rowGap="20px" columnGap="1.33%">
                {value === "all" && items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
                {value === "newArrivals" && newArrivalsItem.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
                {value === "topRated" && topRatedItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
                {value === "bestSellers" && bestSellersItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
            </Box>
    </Box>
  </div>;
};

export default ShoppingList;
