import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLoginButtonClick = () => {
    router.push("/login");
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerItemClick = (path) => {
    setDrawerOpen(false);
    router.push(path);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">To-Do List</Typography>
          <div className="hidden md:flex md:justify-end md:flex-row md:items-center md:flex-grow">
            <Link
              className="hover:bg-blue-600 rounded p-2"
              href="/"
              style={{
                color: "white",
                marginRight: 15,
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              className="hover:bg-blue-600 rounded p-2"
              href="/about"
              style={{
                color: "white",
                marginRight: 15,
                textDecoration: "none",
              }}
            >
              About
            </Link>
            <Link
              className="hover:bg-blue-600 rounded p-2"
              href="/help"
              style={{
                color: "white",
                marginRight: 15,
                textDecoration: "none",
              }}
            >
              Help
            </Link>
            <Link
              className="hover:bg-blue-600 rounded p-2"
              href="/dashboard"
              style={{
                color: "white",
                marginRight: 15,
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
            {!session ? (
              <button
                className="btn-black h-11 bg-black items-center hover:bg-zinc-900 hover:text-zinc-200 px-8 rounded-md"
                onClick={handleLoginButtonClick}
              >
                Login
              </button>
            ) : (
              <button
                className="btn-black w-30 bg-red-700 hover:bg-red-600 items-center mt-2"
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  if (error) {
                    toast.error("Error logging out");
                  } else {
                    router.push("/");
                    toast.success("Logged out successfully!")
                  }
                }}
              >
                Logout
              </button>
            )}
          </div>

          <div
            style={{ marginLeft: "auto" }}
            className="flex md:hidden flex-row items-center"
          >
            {/* Show the menu icon only on mobile screens */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              className="lg:hidden"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => handleDrawerItemClick("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/about")}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/help")}>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {!session ? (
            <ListItem button onClick={handleLoginButtonClick}>
              <ListItemText primary="Login" />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  toast.error("Error logging out");
                } else {
                  router.push("/");
                }
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
