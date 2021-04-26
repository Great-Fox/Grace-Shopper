import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

}));

const Navbar = ({ handleClick, isLoggedIn, firstName }) => {
  const classes = useStyles();

  // menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickHere = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHere = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
      <Toolbar>
        <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleClickHere}
            >
            <MenuIcon />
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
          }}
          >
          <MenuItem onClick={handleCloseHere}>    
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseHere}>           
            <Link to="/ringtone">All Ringtones</Link>
          </MenuItem>          
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
                {/* the badgeContent need to be the length of ringtones in cart 
                it may have merge conflict
                becasue i rememberd i fixed this before with different branch--- shiyang */}
                <Badge badgeContent={1} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                
                <Link to="/ringtone">See All Our Ringtones!</Link> */}
                <IconButton>
                  <p>Welcome {firstName}!</p>
                </IconButton>
                <IconButton
                  aria-label="log out"
                  // aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  // onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                </IconButton>
              </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <IconButton
                    aria-label="log out"
                    // aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    // onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <Link to="/login">Login</Link>
                  </IconButton>
                  <IconButton
                    aria-label="log out"
                    // aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    // onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <Link to="/signup">Sign Up</Link>
                  </IconButton>
                  <IconButton
                    aria-label="log out"
                    // aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    // onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                  </IconButton>
                </div>
              )}
            {/* </IconButton> */}
          {/* </div> */}
    {/* <nav>
      {isLoggedIn ? (
        <div>
          The navbar will show these links after you log in
          <Link to="/home">Home</Link>
          <Link to="/ringtone">See All Our Ringtones!</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <p>Welcome {firstName}!</p>
        </div>
      ) : (
        <div>
          The navbar will show these links before you log in
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/ringtone">See All Our Ringtones!</Link>
        </div>
      )}
      <Badge badgeContent={1} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </nav> */}
    </Toolbar>
    </AppBar>
  </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
