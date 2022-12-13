import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Divider, IconButton, Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Header } from 'components/Common/Header';
import { useState } from 'react';
import AppRouter from 'routes/AppRouter';
import { MenuList } from './MenuList';

const drawerWidth: number = 250;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px ',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid whitesmoke`,
    backgroundColor: 'white',
  },
  main: {
    gridArea: 'main',
    backgroundColor: 'white',
    padding: '16px',
  },
}));

export function AppLayout() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'flex-start',
            px: [1],
          }}>
          {open && (
            <img
              src="	https://noxshield.com.vn/images/logo-header.svg"
              alt="noxshild"
              style={{
                width: '200px',
                height: '45px',
                cursor: 'pointer',
                display: 'inline-block',
                // marginRight: '100px',
              }}
            />
          )}
          <IconButton onClick={toggleDrawer}>
            {open && <ChevronLeftIcon />}
            {!open && <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <MenuList />
      </Drawer>

      <Box className={classes.main}>
        <AppRouter />
      </Box>
    </Box>
  );
}
