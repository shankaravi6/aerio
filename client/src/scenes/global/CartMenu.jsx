import { Box, Button, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart.cart);
  const isCartOpen = useSelector((state) => state?.cart.isCartOpen);

  const totalPrice = cart?.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const handleOverlayClick = (e) => {
    const cartContainer = e.target.closest(".cart-container");
    if (!cartContainer) {
      // If click is outside the cart container, close the cart
      dispatch(setIsCartOpen({}));
    }
  };

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      bgcolor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      onClick={handleOverlayClick} // Listen for clicks on the overlay
    >
      <Box
        className="cart-container" // Add a class to the cart container
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        bgcolor="white"
      >
        <Box p="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart?.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          <Box>
            {cart && cart.map((item) => (
              <Box key={`${item.name} - ${item?.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="125px"
                      height="125px"
                      src={`https://blackcms.onrender.com/uploads/${item?.imageName}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item?.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item?.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <FlexBox m="15px 0">
                      <Typography color={shades.secondary[500]} fontWeight="bold">
                        ${item?.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
              </Box>
            ))}
          </Box>
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              variant="contained"
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
