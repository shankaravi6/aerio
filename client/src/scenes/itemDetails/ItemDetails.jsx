import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart, setIdItems } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import CategoryIcon from "@mui/icons-material/Category";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SpaIcon from "@mui/icons-material/Spa";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([]); // State for shuffled items
  const cart = useSelector((state) => state.cart.cart || []);
  const itemNew = useSelector((state) => state.cart.idItems.id);
  const isInCart = cart.some((cartItem) => cartItem.id === itemNew);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    dispatch(setIdItems(itemJson.data));
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  // Fetch items on component mount
  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shuffle items and set only the first 3
  useEffect(() => {
    if (items.length > 0) {
      const shuffled = items
        .filter((item) => item.attributes.active)
        .sort(() => Math.random() - 0.5) // Shuffling the items
        .slice(0, 3); // Limit to the first 3 items
      setShuffledItems(shuffled);
    }
  }, [items]); // Trigger shuffle when items are fetched

  const item = useSelector((state) => state.cart?.idItems);
  const itemName = useSelector((state) => state.cart.idItems.attributes?.name);
  const itemPrice = useSelector(
    (state) => state.cart.idItems.attributes?.price
  );
  const itemShortDesc = useSelector(
    (state) =>
      state.cart.idItems.attributes?.shortDescription[0].children[0].text
  );
  const itemDesc = useSelector(
    (state) =>
      state.cart.idItems.attributes?.longDescription[0].children[0].text
  );
  const itemCate = useSelector(
    (state) => state.cart.idItems.attributes?.category
  );

  const itemImg = useSelector(
    (state) =>
      state.cart?.idItems?.attributes?.image.data.attributes.formats.small.url
  );

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={itemName}
            width="100%"
            height="500px"
            src={`http://localhost:1337${itemImg}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box m="15px 0 25px 0">
            <Typography variant="h3">{itemName}</Typography>
            <Typography variant="h2" fontFamily={"-moz-initial"} color={shades.secondary[500]}>
              $&nbsp;{itemPrice}
            </Typography>
            <Box m="20px 0 5px 0" display="flex" gap={1}>
              <CategoryIcon style={{ marginTop: "-2px" }} />
              <Box display="flex" gap={1} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h4" fontWeight="600" color={shades.secondary[500]}>
                  CATEGORY:
                </Typography>
                <Typography>{itemCate}</Typography>
              </Box>
            </Box>
            <Typography sx={{ mt: "20px" }} color={shades.neutral[800]}>
              {itemShortDesc}
            </Typography>
          </Box>

          <Box>
            <Box display="flex" gap={1}>
              <WorkspacePremiumIcon style={{ marginTop: "-2px" }} />
              <Typography variant="h4" fontWeight="600" color={shades.secondary[500]}>
                Certificate of Authenticity
              </Typography>
            </Box>
            <Typography sx={{ mt: "10px" }} color={shades.neutral[800]}>
              All our products come with a Certificate of Authenticity, guaranteeing their historical significance and ensuring the highest quality for collectors and enthusiasts alike.
            </Typography>
          </Box>

          <Box sx={{ mt: "25px" }}>
            <Box display="flex" gap={1}>
              <SpaIcon style={{ marginTop: "-2px" }} />
              <Typography variant="h4" fontWeight="600" color={shades.secondary[500]}>
                Care Instructions
              </Typography>
            </Box>
            <Typography sx={{ mt: "10px" }} color={shades.neutral[800]}>
              <ul>
                <li>Handle with care to preserve the item’s condition.</li>
                <li>Keep in a cool, dry place, away from direct sunlight.</li>
                <li>Use a soft cloth for cleaning and avoid harsh chemicals.</li>
              </ul>
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Button
              className="custbtn"
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              disabled={isInCart}
            >
              {isInCart ? "IN CART" : "ADD TO CART"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{itemDesc}</div>}
      </Box>
      <Box sx={{ mt: "25px" }}>
        <Typography variant="h4" fontWeight="600" color={shades.secondary[500]}>
          Why Choose Us?
        </Typography>
        <Typography sx={{ mt: "10px" }} color={shades.neutral[800]}>
          <ul>
            <li>Authenticity Guaranteed: All our products are certified as genuine artifacts or antiques, sourced from reputable suppliers and experts.</li>
            <li>Quality Assurance: We take pride in providing only the finest, well-preserved items that stand the test of time.</li>
            <li>Exclusive Collection: Our curated collection includes rare finds you won't find anywhere else.</li>
            <li>Customer-Centered Service: Enjoy personalized support, fast response times, and a hassle-free shopping experience.</li>
            <li>Expertly curated collection for collectors and history lovers.</li>
          </ul>
        </Typography>
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box mt="20px" display="flex" flexWrap="wrap" columnGap="1.33%" justifyContent="space-between">
          {shuffledItems.map((item, i) => (
            <Item key={`${item.attributes.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
