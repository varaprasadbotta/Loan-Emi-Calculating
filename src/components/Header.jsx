import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#1976D2',
  padding: '10px 20px',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    flexGrow: 1,
    textAlign: 'center',
  },
  [theme.breakpoints.up('sm')]: {
    flexGrow: 0,
  },
}));

const ButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
}));

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  color: theme.palette.text.primary,
  backgroundColor: isActive
    ? theme.palette.mode === 'dark'
      ? '#424242' // Darker color for active button in dark mode
      : 'rgba(255, 255, 255, 0.3)' // Darker color for active button in light mode
    : theme.palette.mode === 'dark'
    ? '#616161' // Lighter color for inactive buttons in dark mode
    : 'rgba(255, 255, 255, 0.1)', // Lighter color for inactive buttons in light mode
  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.mode === 'dark'
        ? '#383838' // Slightly darker on hover for active button in dark mode
        : 'rgba(255, 255, 255, 0.4)'
      : theme.palette.mode === 'dark'
      ? '#757575'
      : 'rgba(255, 255, 255, 0.2)',
  },
}));

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  backgroundColor: isActive
    ? theme.palette.mode === 'dark'
      ? '#616161' // Darker color for active item in dark mode
      : 'rgba(0, 0, 0, 0.1)' // Darker color for active item in light mode
    : 'transparent', // Inactive items have no background
  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.mode === 'dark'
        ? '#757575'
        : 'rgba(0, 0, 0, 0.2)'
      : theme.palette.mode === 'dark'
      ? '#424242'
      : 'rgba(0, 0, 0, 0.05)',
  },
}));

const ToggleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const DrawerList = styled(List)(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
  color: theme.palette.text.primary,
}));

const Header = ({ onThemeChange, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation(); // Get the current URL path

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Exchange Rates (Live)', path: '/exchange-rates' },
    { text: 'About', path: '/about' },
    { text: 'Error Page', path: '/error-page' },
  ];

  return (
    <HeaderContainer>
      {/* Hamburger Menu for Mobile */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Title>Loan Calculator</Title>

      {/* Navigation Buttons for Desktop */}
      <ButtonGroup>
        {navItems.map((item) => (
          <StyledButton
            key={item.text}
            component={Link}
            to={item.path}
            variant="contained"
            isActive={location.pathname === item.path} // Highlight if path matches
          >
            {item.text}
          </StyledButton>
        ))}
      </ButtonGroup>

      {/* Theme Toggle */}
      <ToggleContainer>
        <Switch checked={isDarkMode} onChange={onThemeChange} />
      </ToggleContainer>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerList>
          {navItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              isActive={location.pathname === item.path} // Highlight if path matches
            >
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </DrawerList>
      </Drawer>
    </HeaderContainer>
  );
};

export default Header;