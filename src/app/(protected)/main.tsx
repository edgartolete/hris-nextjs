"use client"

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MuiDrawer from "@mui/material/Drawer"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuIcon from "@mui/icons-material/Menu"
import CssBaseline from "@mui/material/CssBaseline"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useState } from "react"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useLogout } from "@/feat/auth/hooks"
import Link from "next/link"
import { staticConfig } from "@/app/config"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Badge from "@mui/material/Badge"
import { getSidebarIcon } from "@/components/icons"
import { Container } from "@mui/material"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleOpenState = (open: boolean) => setOpen(open)

  return (
    <div className="flex">
      <CssBaseline />
      <Header open={open} setOpen={handleOpenState} />
      <Minirawer open={open} setOpen={handleOpenState} />
      <div className="pt-24 px-5 flex grow">
        <Container maxWidth="lg" component="main">{children}</Container>
      </div>
    </div>
  )
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  },
  [theme.breakpoints.down("sm")]: {
    width: 0
  }
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open"
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
      }
    }
  ]
}))

function Header({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { trigger: logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={[
            {
              marginRight: 5
            },
            open && { display: "none" }
          ]}
          onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <div>
          {staticConfig.notification.enable && (
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

function Minirawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const theme = useTheme()

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {staticConfig.sidebarItems.map((item, index) => (
          <div key={index}>
            <Divider />
            <List>
              {item.map((item, index) => (
                <Link href={item.path} key={item.path}>
                  <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      onClick={handleDrawerClose}
                      sx={[
                        {
                          minHeight: 48,
                          px: 2.5
                        },
                        open
                          ? {
                              justifyContent: "initial"
                            }
                          : {
                              justifyContent: "center"
                            }
                      ]}>
                      <ListItemIcon
                        sx={[
                          {
                            minWidth: 0,
                            justifyContent: "center"
                          },
                          open
                            ? {
                                mr: 3
                              }
                            : {
                                mr: "auto"
                              }
                        ]}>
                        {getSidebarIcon({ key: item.key })}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={[
                          open
                            ? {
                                opacity: 1
                              }
                            : {
                                opacity: 0
                              }
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        ))}
      </Drawer>
    </>
  )
}
