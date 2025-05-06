import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const PageContainer = styled("div")(({ theme }) => ({
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const HomeLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#90caf9" : "#1976D2",
  textDecoration: "none",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ErrorPage = () => {
  return (
    <PageContainer>
      <h2>Error Page</h2>
      <p>Oops! Something went wrong or this page doesn't exist. </p>
      <HomeLink to="/">Go back to Home</HomeLink>
    </PageContainer>
  );
};

export default ErrorPage;
