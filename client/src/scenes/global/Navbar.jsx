import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import logo from '../../assets/paymet/logo.png'


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart);


  return (
    <Box display="flex" alignContent="center" width="100%" height="60px" bgcolor="rgba(255,255,255, 0.95)" color="black" position="fixed" top="0" left="0" zIndex="1">
      <Box width="90%" margin="auto" display="flex" justifyContent="space-between" alignItems="center">
        <Box display='flex' alignItems='center' columnGap='10px'>
        <Box width='50px' height='50px'>
          <img src={logo} width='100%' />
        </Box>
        <Box fontSize={30} onClick={() => navigate("/")} sx={{'&:hover' : {cursor:"pointer"}}} color={shades.secondary[500]}>
            AERIO
        </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" columnGap="20px" zIndex="2">
          <IconButton sx={{color:"black"}}>
              <SearchOutlined/>
          </IconButton>
          <IconButton sx={{color:"black"}}>
              <PersonOutline/>
          </IconButton>
          <Badge badgeContent={cart.length} color="secondary" invisible={cart.length === 0} sx={{"& .MuiBadge-badge" : {
            right:5,
            top:5,
            padding:"0 4px",
            height:"14px",
            minWidth:"13px"
          }}}>
          <IconButton sx={{color:"black"}} onClick={() => dispatch(setIsCartOpen({}))}>
              <ShoppingBagOutlined/>
          </IconButton>
          </Badge>
          <IconButton sx={{color:"black"}}>
              <MenuOutlined/>
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar