import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import useNavigate from 'hooks/useNavigate';
import React from 'react';

const useStyles = makeStyles(() => ({
  appbar: {
    boxShadow: 'none!important',
  },
  main: {
    backgroundColor: '#3c8dbc ',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { handleRouterChange: setting } = useNavigate('/setting');

  const { handleRouterChange: homePage } = useNavigate('/home');
  const { handleRouterChange: banner } = useNavigate('/banner');
  const { handleRouterChange: cases } = useNavigate('/case');
  const { handleRouterChange: content } = useNavigate('/content');
  const { handleRouterChange: producer } = useNavigate('/producer');
  const { handleRouterChange: reason } = useNavigate('/reason');
  return (
    <AppBar position="static" className={classes.appbar}>
      <Container maxWidth="xl" className={classes.main}>
        <Toolbar disableGutters className={classes.header}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Button onClick={homePage} size="small">
              <img
                src="	https://noxshield.com.vn/images/logo-header.svg"
                alt="noxshild"
                style={{
                  height: '45px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  marginRight: '100px',
                }}
              />
            </Button>
            <Button color="inherit" id="button" onClick={banner}>
              Banner
            </Button>

            <Button color="inherit" id="button" onClick={cases}>
              Cases
            </Button>
            <Button color="inherit" id="button" onClick={content}>
              Content
            </Button>
            <Button color="inherit" id="button" onClick={producer}>
              Producer
            </Button>
            <Button color="inherit" id="button" onClick={reason}>
              Reason
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open systems">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={setting}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Tài khoản
              </MenuItem>

              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Thoát
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
