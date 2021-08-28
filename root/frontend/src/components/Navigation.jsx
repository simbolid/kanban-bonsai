import React, { useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditableTitle from './board/EditableTitle';
import BoardList from './BoardList';
import mainListItems from './navigationItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: '1px gainsboro solid',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    border: '1px gainsboro solid',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey[400], 0.20),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[500], 0.20),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey[700],
  },
  notification: {
    marginLeft: 'auto',
  },
}));

const NavigationInterface = ({
  title,
  filter,
  handleFilterChange,
  handleTitleChange,
  boardFeatures,
  urlID,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const staticTitle = () => (
    <Typography component="h1" variant="h6" color="inherit" noWrap>
      {title}
    </Typography>
  );

  /* The key prop is necessary so that the component updates when the title prop changes.
   * See https://stackoverflow.com/questions/38892672 */
  const dynamicTitle = () => (
    <EditableTitle
      initialTitle={title}
      key={title}
      TypographyProps={{
        component: 'h1',
        variant: 'h6',
        nowrap: 'true',
      }}
      onSubmit={handleTitleChange}
    />
  );

  const search = () => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Filter cards"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        elevation={0}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          {/* board titles should be editable */}
          {boardFeatures ? dynamicTitle() : staticTitle()}
          {/* the board page requires a search field for filtering tasks */}
          {boardFeatures ? search() : null}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        {/* the board page requires a link to the board settings page */}
        {urlID ? (
          <>
            <Divider />
            <BoardList urlID={urlID} />
          </>
        ) : null}
      </Drawer>
    </>
  );
};

NavigationInterface.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
  handleTitleChange: PropTypes.func,
  boardFeatures: PropTypes.bool,
  urlID: PropTypes.string,
};

NavigationInterface.defaultProps = {
  filter: undefined,
  handleFilterChange: () => {},
  handleTitleChange: () => {},
  boardFeatures: false,
  urlID: undefined,
};

export default NavigationInterface;
