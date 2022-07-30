import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { removeFromStorage, getFromStorage } from "../../utils/helpers";

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export default function Navbar() {
  const [statusAuth, setStatusAuth] = useState(false);

  let navigate = useNavigate();

  function redirectToLoginPage() {
    navigate(`/login`);
  }

  function redirectToMainPage() {
    navigate("/");
  }

  const outLogin = () => {
    removeFromStorage("isAuth");
    navigate(`/login`);
  };

  const takeInfoUser = getFromStorage("isRegister");

  if (takeInfoUser) {
    var { name: UserName } = JSON.parse(takeInfoUser);
  }

  const takeInfoAboutAuth = () => {
    const statusAuth = getFromStorage("isAuth");
    statusAuth ? setStatusAuth(true) : setStatusAuth(false);
  };

  useEffect(() => {
    takeInfoAboutAuth();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "fixed", top: "0" }}>
        <Toolbar sx={styles.toolbar}>
          {statusAuth && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginRight: "40px",
              }}
              onClick={redirectToMainPage}
            >
              Hello, {UserName}
            </Typography>
          )}

          {!statusAuth && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginRight: "40px",
              }}
              onClick={redirectToLoginPage}
            >
              Please, do LogIn
            </Typography>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              marginRight: "40px",
            }}
            onClick={outLogin}
          >
            Do you want Out?
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
