import React from 'react'
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { styled } from "@mui/material/styles";
import reducer from "../store";
import DiseasesHeader from './DiseasesHeader';
import DiseasesTable from './DiseasesTable';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import { ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import FuseLoading from "@fuse/core/FuseLoading";
import { getProducts, selectProducts } from "../store/diseasesSlice";
import DiseasesTableHead from './DiseasesTableHead';
import { setProductsSearchText } from "../store/diseasesSlice";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { Link } from "react-router-dom";
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


function Diseases() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(products);
    const [page, setPage] = useState(0);
    const mainTheme = useSelector(selectMainTheme);
    const searchText = useSelector(
      ({ eCommerceApp }) => eCommerceApp.products.searchText
    );
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
      direction: "asc",
      id: null,
    });
  
    function handleChangePage(event, value) {
      setPage(value);
    }
  
    function handleChangeRowsPerPage(event) {
      setRowsPerPage(event.target.value);
    }
  
    function handleRequestSort(event, property) {
      const id = property;
      let direction = "desc";
      if (order.id === property && order.direction === "desc") {
        direction = "asc";
      }
  
      setOrder({
        direction,
        id,
      });
    }
  
    function handleSelectAllClick(event) {
      if (event.target.checked) {
        setSelected(data.map((n) => n.uuid));
        return;
      }
      setSelected([]);
    }
  
    function handleDeselect() {
      setSelected([]);
    }
  return (
    <div>
        <Root header={< DiseasesHeader/>} content={< DiseasesTable/>}  innerScroll />
    </div>
  )
}

export default Diseases