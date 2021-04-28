import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { storageThunk } from '../store/redux/storage';
import CartIcon from './CartIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { getUserInfoThunk } from '../store/redux/user';

// search bar
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  //search bar
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '20ch',
  //   },
  // },
  sectionShoppingCart: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionAccount: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Navbar = ({
  handleClick,
  isLoggedIn,
  firstName,
  userId,
  getUser,
  user,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickHere = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  const handleCloseHere = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getUser(userId);
  }, []);
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            // onClick={handleClickHere}
          >
            <MenuIcon onClick={handleClickHere} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleCloseHere}
            PaperProps={{
              style: {
                width: '20ch',
              },
            }}>
            <MenuItem onClick={handleCloseHere}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseHere}>
              <Link to="/ringtone">All Ringtones</Link>
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem onClick={handleCloseHere}>
                <Link to="/account">Account</Link>
              </MenuItem>
            ) : null}
          </Menu>
          <Typography className={classes.title} variant="h6" noWrap>
            Ringtone World
          </Typography>
          {/* search bar
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
            </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionShoppingCart}>
            <IconButton aria-label="show shopping cart" color="inherit">
              <CartIcon />
              {/* <Link to="/cart">
                <Badge badgeContent={length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                </Link> */}
            </IconButton>
          </div>
          {isLoggedIn ? (
            <div className={classes.sectionAccount}>
              <IconButton aria-label="show account" color="inherit">
                {/* <Link to="/account"> */}
                {/* <Badge badgeContent={0} color="secondary"> */}
                <PopupState variant="popover">
                  {(popupState) => (
                    <div>
                      <AccountCircleIcon {...bindTrigger(popupState)} />
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}>
                        <Box p={4} justifyContent="center">
                          <div>
                            <h3>
                              {user.firstName} {user.lastName}
                            </h3>
                            <h4>{user.email}</h4>
                            <ButtonGroup
                              variant="contained"
                              color="primary"
                              aria-label="contained primary button group">
                              {/* <Link to={`/account/${user.id}`}> */}
                              <Button
                                onClick={() => {
                                  history.push(`/account/${user.id}`);
                                }}>
                                Order History
                              </Button>
                              {/* </Link> */}
                              {/* <Link to={`/account/${user.id}/edit`}> */}
                              <Button
                                onClick={() => {
                                  history.push(`/account/${user.id}/edit`);
                                }}>
                                Edit Account
                              </Button>
                              {/* </Link> */}
                            </ButtonGroup>
                          </div>
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
                {/* </Badge> */}
                {/* </Link> */}
              </IconButton>
              <IconButton>
                <p>Welcome {firstName}!</p>
              </IconButton>
              <IconButton
                aria-label="log out"
                aria-haspopup="true"
                color="inherit">
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </IconButton>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="log in"
                aria-haspopup="true"
                color="inherit">
                <Link to="/login">Login</Link>
              </IconButton>
              <IconButton
                aria-label="sign up"
                aria-haspopup="true"
                color="inherit">
                <Link to="/signup">Sign Up</Link>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
    userId: state.auth.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getStorage: (id) => dispatch(storageThunk(id)),
    getUser: (id) => dispatch(getUserInfoThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
