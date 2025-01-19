import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const cart = useSelector((state) => state.cart.cart || [])

  const isInCart = cart.some((cartItem) => cartItem._id === item._id);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, imageName } = item;
  

//   const {
//   data: {
//     attributes: {
//       formats: { medium, small, thumbnail },
//     },
//   },
// } = image;

  const url = imageName;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="300px"
          src={`https://blackcms.onrender.com/uploads/${url}`}
          onClick={() => navigate(`/item`,  { state: { item } })}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* <Box
              display="flex"
              alignItems="center"
              bgcolor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton
                onClick={() => setCount(Math.max(count -1, 1))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton
                onClick={() => setCount(count + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box> */}
            <Button
              className="custbtn"
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
              disabled={isInCart}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px" width='300px'>
        <Typography variant="subtitle2" color={neutral.dark}>
            {category.replace(/([A-Z])/g, "$1")
                .replace(/^./, (str) => str.toUpperCase())
            }
        </Typography>
        <Typography>{name}</Typography>
        <Typography color={shades.secondary[600]} fontWeight="bold">$ {price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
