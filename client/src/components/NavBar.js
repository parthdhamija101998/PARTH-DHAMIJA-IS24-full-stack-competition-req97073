import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = styled(AppBar)`
  background-color: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 15px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/">Home</Tabs>
        <Tabs to="/add">Add Product</Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
