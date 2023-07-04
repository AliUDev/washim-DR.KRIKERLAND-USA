import { React, useState } from "react";
import { styled } from "@mui/material/styles";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setOrdersSearchText } from "../../apps/calendar/store/eventsSlice";
import TableCell from "@mui/material/TableCell";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Link, useHistory } from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import { setProductsSearchText } from '../calendar/store/eventsSlice';

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
const rows = [
  {
    id: "patient-name",
    align: "left",
    disablePadding: false,
    label: "Patient Name",
    sort: true,
  },
  {
    id: " doctor-name",
    align: "left",
    disablePadding: false,
    label: " Doctor Name",
    sort: true,
  },
  {
    id: "appointment-type",
    align: "right",
    disablePadding: false,
    label: "Appointment Type",
    sort: true,
  },
//   {
//     id: "gender",
//     align: "right",
//     disablePadding: false,
//     label: "Gender",
//     sort: true,
//   },
//   {
//     id: "active",
//     align: "right",
//     disablePadding: false,
//     label: "Active Status",
//     sort: true,
//   },
];
function ViewList(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { selectedProductIds } = props;

  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const history = useHistory();
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }
  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/apps/e-commerce/orders/${item.id}`);
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
  return (
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
              list
            </Icon>
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="text-16 md:text-24 mx-12 font-semibold"
            >
              View List
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
            //   onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>
        </div>
      }
      content={
        <div className="w-full flex flex-col">
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <Table
              stickyHeader
              className="min-w-xl"
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow className="h-48 sm:h-64">
                  <TableCell
                    padding="none"
                    className="w-40 md:w-64 text-center z-99"
                  >
                      <Checkbox
                    
                    />
                    {/* <Box
                      className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
                      sx={{
                        background: (theme) => theme.palette.background.paper,
                      }}
                    >
                      <IconButton
                        aria-owns={
                          selectedProductsMenu ? "selectedProductsMenu" : null
                        }
                        aria-haspopup="true"
                        onClick={openSelectedProductsMenu}
                        size="large"
                      >
                        <Icon>more_horiz</Icon>
                      </IconButton>
                      <Menu
                        id="selectedProductsMenu"
                        anchorEl={selectedProductsMenu}
                        open={Boolean(selectedProductsMenu)}
                        onClose={closeSelectedProductsMenu}
                      >
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              dispatch(removeProducts(selectedProductIds)).then(
                                () => {
                                  dispatch(
                                    showMessage({
                                      message: "Patient Deleted successfully", //text or html
                                      autoHideDuration: 6000, //ms
                                      anchorOrigin: {
                                        vertical: "top", //top bottom
                                        horizontal: "right", //left center right
                                      },
                                      variant: null, //success error info warning null
                                    })
                                  );
                                  history.push("/apps/patient/new");
                                }
                              );
                              props.onMenuItemClick();
                              closeSelectedProductsMenu();
                            }}
                          >
                            <ListItemIcon className="min-w-40">
                              <Icon>delete</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Remove" />
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box> */}
                  </TableCell>
                  {rows.map((row) => {
                    return <TableCell>{row.label} </TableCell>;
                  }, this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {
                      
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          return ( */}
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                                <Checkbox
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={(event) => handleCheck(event)}
                                />
                              </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    Ayesha
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                   Dr.Saba
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                      Yearly Checkup
                  </TableCell>
               
                </TableRow>
                <TableRow
                className="h-72 cursor-pointer"
                hover
                role="checkbox"
                tabIndex={-1}
                onClick={(event) => handleClick(n)}
                
                >
                          <TableCell className="w-40 md:w-64 text-center" padding="none">
                                <Checkbox
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={(event) => handleCheck(event)}
                                />
                              </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                    John
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                   Dr.William
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                      Weekly Checkup
                  </TableCell>
                </TableRow>
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                                <Checkbox
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={(event) => handleCheck(event)}
                                />
                              </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    Arjun
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                   Dr.Roha
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                     Normal heckup
                  </TableCell>
               
                </TableRow>
                <TableRow
                className="h-72 cursor-pointer"
                hover
                role="checkbox"
                tabIndex={-1}
                onClick={(event) => handleClick(n)}
                
                >
                          <TableCell className="w-40 md:w-64 text-center" padding="none">
                                <Checkbox
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={(event) => handleCheck(event)}
                                />
                              </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                John Doe
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                   Dr.Saad
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                    Emergency Illness
                  </TableCell>
                </TableRow>

                {/* ));
                        } */}
              </TableBody>
            </Table>
          </FuseScrollbars>

          <TablePagination
            className="flex-shrink-0 border-t-1"
            component="div"
            count={5}
            rowsPerPage={5}
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
      }
      innerScroll
    />
  );
}

export default ViewList;
