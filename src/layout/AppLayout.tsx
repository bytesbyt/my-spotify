import { styled, Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import React from 'react'
import { Outlet, NavLink, } from 'react-router'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LibraryHead from './components/LibraryHead'
import Library from "./components/Library"
import Navbar from "./components/Navbar"

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: '8px',
});

const Sidebar = styled("div")(({theme}) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  gap: "8px",
}));

const MainContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  overflowY: 'auto',
  overflowX: 'hidden', 
  padding: "16px",
}));

const ContentBox = styled(Box)(({theme}) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "10px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink) (({theme}) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color:theme.palette.text.primary
  },
  "&.active":{
    color: theme.palette.text.primary
  },
}));

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Layout>
        <Sidebar>
          <ContentBox>
            <NavList>
              <li>
                <StyledNavLink to = "/">
                  <HomeIcon/>
                  <Typography variant = "h2" fontWeight= {700}>Home</Typography>
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to = "search">
                  <SearchIcon/>
                  <Typography variant = "h2" fontWeight= {700}>Search</Typography>
                </StyledNavLink>
              </li>
            </NavList>
          </ContentBox>
          <ContentBox sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <LibraryHead/>
            <Library/>
          </ContentBox>
        </Sidebar>

        <MainContentBox sx={{ paddingBottom: isMobile ? '80px' : '16px' }}>
          <Navbar/>
          <Outlet/>
        </MainContentBox>

    </Layout>
  )
}

export default AppLayout
