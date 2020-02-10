import React from 'react'

import { Link as ScrollLink } from "react-scroll"
import { animateScroll as scroll } from "react-scroll"
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TheatersIcon from '@material-ui/icons/Theaters'
import styles from './Drawer.module.css'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: '#f5f3f3',
    cursor: 'pointer'
  },
  background: {
    backgroundColor: '#8f9292'
  },
  textColor: {
    color: '#f5f3f3'
  },
  appBar: {
    backgroundColor: '#8f9292',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen      
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const year = new Date().getFullYear() - 1

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root} id='Home'>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6"
            onClick={() => scroll.scrollToTop()} 
            className={classes.title}>
            Flikz
          </Typography>
          <div className={styles.Navlinks}>          
            <ScrollLink
              to='Showing'
              smooth
              duration={1200}>
              <Button className={classes.textColor}>Showing</Button>            
            </ScrollLink>
            <ScrollLink
              to='Best'
              smooth
              duration={1200}>
              <Button className={classes.textColor}>{`Best of ${year}`}</Button>            
            </ScrollLink>
            <ScrollLink
              to='Upcoming'
              smooth
              duration={1200}>
              <Button className={classes.textColor}>Upcoming</Button>            
            </ScrollLink>
          </div>         
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ScrollLink
            to='Showing'
            smooth
            duration={1200}>
            <ListItem button>
              <ListItemIcon>
                <TheatersIcon />
              </ListItemIcon>             
              <ListItemText primary='Showing' />
            </ListItem>
          </ScrollLink>
          <ScrollLink
            to='Best'
            smooth
            duration={1200}>
            <ListItem button>
              <ListItemIcon>
                <TheatersIcon />
              </ListItemIcon>             
              <ListItemText primary={`Best of ${year}`} />
            </ListItem>
          </ScrollLink>
          <ScrollLink
            to='Upcoming'
            smooth
            duration={1200}>
            <ListItem button>
              <ListItemIcon>
                <TheatersIcon />
              </ListItemIcon>             
              <ListItemText primary='Upcoming' />
            </ListItem>
          </ScrollLink>
        </List>
        <Divider />
      </Drawer>
    </div>
  )
}
