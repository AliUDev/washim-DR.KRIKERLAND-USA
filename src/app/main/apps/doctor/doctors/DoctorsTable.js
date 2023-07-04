import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
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
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import { getProducts, selectProducts } from "../store/doctorsSlice";
import DoctorsTableHead from "./DoctorsTableHead";

function DoctorsTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.products.searchText
  );
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    dispatch(getProducts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) =>
          item.first_name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(products);
    }
  }, [products, searchText]);

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

  function handleClick(item) {
    props.history.push(`/apps/doctor/${item.uuid}/update`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  // if (loading) {
  //     return <FuseLoading />;
  // }

  // if (data.length === 0) {
  // return (
  //     <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //         className="flex flex-1 items-center justify-center h-full"
  //     >
  //         <Typography color="textSecondary" variant="h5">
  //             There are no doctors!
  //         </Typography>
  //     </motion.div>
  // );
  // }

  return (
    
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <DoctorsTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            <TableRow
              className="h-72 cursor-pointer"
              hover
              role="checkbox"
              tabIndex={-1}
            //   onClick={(event) => handleClick(n)}
            >
              <TableCell className="w-40 md:w-64 text-center" padding="none">
                <Checkbox
                  onClick={(event) => event.stopPropagation()}
                />
              </TableCell>

              <TableCell className="p-4 md:p-16" component="th" scope="row">
                {/* {n.first_name} {n.middle_name} {n.last_name} */}
                John
              </TableCell>

              <TableCell
                className="p-4 md:p-16 truncate"
                component="th"
                scope="row"
              >
                {/* {JSON.parse(n.doctor_types).join(", ")} */}
                Cardiologist
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
                {/* {n.email} */}
                john@gmail.com
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
                {/* {n.gender} */}
                Male
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
                {/* {n.doctor_active == "yes" ? (
                  <Icon className="text-green text-20">check_circle</Icon>
                ) : (
                  <Icon className="text-red text-20">remove_circle</Icon>
                )} */}
                                 <Icon className="text-red text-20">remove_circle</Icon>

                
              </TableCell>
            </TableRow>
            <TableRow
              className="h-72 cursor-pointer"
              hover
              role="checkbox"
              tabIndex={-1}
            //   onClick={(event) => handleClick(n)}
            >
              <TableCell className="w-40 md:w-64 text-center" padding="none">
                <Checkbox
                  onClick={(event) => event.stopPropagation()}
                />
              </TableCell>

              <TableCell className="p-4 md:p-16" component="th" scope="row">
                {/* {n.first_name} {n.middle_name} {n.last_name} */}
                William
              </TableCell>

              <TableCell
                className="p-4 md:p-16 truncate"
                component="th"
                scope="row"
              >
                {/* {JSON.parse(n.doctor_types).join(", ")} */}
               Skin Specialist
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
                {/* {n.email} */}
                william@gmail.com
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
                {/* {n.gender} */}
                Female
              </TableCell>

              <TableCell
                className="p-4 md:p-16"
                component="th"
                scope="row"
                align="right"
              >
               
                  <Icon className="text-green text-20">check_circle</Icon>
              
             

                
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}


export default withRouter(DoctorsTable);


