import React from 'react'
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setProductsSearchText } from "../store/diseasesSlice";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FusePageCarded from "@fuse/core/FusePageCarded";
const Root = styled(FusePageCarded)(({ theme }) => ({
    "& .FusePageCarded-header": {
      minHeight: 72,
      height: 72,
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        minHeight: 136,
        height: 136,
      },
    },
    "& .FusePageCarded-content": {
      display: "flex",
    },
    "& .FusePageCarded-contentCard": {
      overflow: "hidden",
    },
  }));

function DiseasesHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(
        ({ eCommerceApp }) => eCommerceApp.products.searchText
    );
    const mainTheme = useSelector(selectMainTheme);
  return (
    <div>
         <Root
      header={
        <div className="flex flex-1 w-full items-center justify-between">
        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
             shopping_basket
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-16 md:text-24 mx-12 font-semibold"
          >
            Diseases
          </Typography>
        </div>

        {/* <div className="flex flex-1 items-center justify-center px-12">
          <ThemeProvider theme={mainTheme}></ThemeProvider>
        </div> */}
         <div className="flex flex-1 items-center justify-center px-12">
      <ThemeProvider theme={mainTheme}>
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
        >
          <Icon color="action">search</Icon>

          <Input
            placeholder="Search"
            className="flex flex-1 mx-8"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
             onChange={(ev) =>  dispatch(setProductsSearchText(ev))}
          />
        </Paper>
      </ThemeProvider>
    </div>
    <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
                <Button
                    component={Link}
                    to="/apps/diseases/new"
                    className="whitespace-nowrap"
                    variant="contained"
                    color="secondary"
                >
                    <span className="hidden sm:flex">Add New Diseases</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </motion.div>
      </div>
            }
          />
    </div>
  )
}

export default DiseasesHeader