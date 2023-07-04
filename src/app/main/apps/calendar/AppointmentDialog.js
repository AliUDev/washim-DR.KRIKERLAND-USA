
import { yupResolver } from "@hookform/resolvers/yup";
import formatISO from "date-fns/formatISO";
import { Controller, useForm } from "react-hook-form";
import FuseUtils from "@fuse/utils/FuseUtils";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/lab";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import InputMask from "react-input-mask";
import InputAdornment from "@mui/material/InputAdornment";
import { React, useState } from "react";
import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";

import * as m from "moment";

import EventDialog from "./EventDialog";

import {
  removeEvent,
  closeNewEventDialog,
  closeEditEventDialog,
  updateEvent,
  addEvent,
  removeAppointment,
  closeNewAppointmentDialog,
  closeEditAppointmentDialog,
  updateAppointment,
  addAppointment,
} from "./store/eventsSlice";
import { openNewEventDialog } from "./store/eventsSlice";
import { Tab, Tabs } from "@mui/material";
const rows = [
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "medicalInsuraceType",
    align: "left",
    disablePadding: false,
    label: "Medical Insurance Type",
    sort: true,
  },
  {
    id: "email",
    align: "right",
    disablePadding: false,
    label: "Email",
    sort: true,
  },
  {
    id: "gender",
    align: "right",
    disablePadding: false,
    label: "   Gender",
    sort: true,
  },
  {
    id: "active",
    align: "right",
    disablePadding: false,
    label: "Active Status",
    sort: true,
  },
];
const defaultValues = {
  id: FuseUtils.generateGUID(),
  title: "",
  name: "",
  allDay: true,
  start: formatISO(new Date()),
  end: formatISO(new Date()),
  date_of_birth: "",
  ssn: "",
  phone: "",
  address: "",
  extendedProps: { desc: "" },
  doctorId: 123,
  reasonOfVisit: "",
};
console.log("name is", name);
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter a title"),
  name: yup.string().required("You must enter a Name"),
  date_of_birth: yup.string().required(" Please select date of birth"),
});

function AppointmentDialog(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const eventDialog = useSelector(
    ({ calendarApp }) => calendarApp.events.eventDialog
  );

  let emailDisabled = false;
  let maskedValue = "999-99-9999";
  if (routeParams.productHandle == "update") {
    emailDisabled = true;
    maskedValue = "###-##-9999";
  }

  let phoneValue = "(999)-999-99999";
  if (routeParams.productHandle == "update") {
    emailDisabled = true;
    phoneValue = "(###)-###-99999";
  }

  const [showPassword, setShowPassword] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dateRef = useRef(null);

  const { reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  const { isValid, dirtyFields, errors } = formState;

  const start = watch("start");
  const end = watch("end");
  const id = watch("id");

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (eventDialog.type === "edit" && eventDialog.data) {
      reset({ ...eventDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === "new") {
      reset({
        ...defaultValues,
        ...eventDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [eventDialog.data, eventDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */

  function closeComposeDialog() {
    return eventDialog.type === "edit"
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
  }

  function closeComposDialog() {
    return eventDialog.type === "edit"
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
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

  const handleSelect = (e) => {
    console.dir(e.target);
  };

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = getValues();

    console.log(data);

    if (eventDialog.type === "new") {
      dispatch(addEvent(data));
    } else {
      dispatch(updateEvent({ ...eventDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  function onSubmitAppointment(ev) {
    ev.preventDefault();

    const data = getValues();

    if (eventDialog.type === "new") {
      dispatch(addEvent(data));
    } else {
      dispatch(updateEvent({ ...eventDialog.data, ...data }));
    }

    closeComposDialog();

    // dispatch(
    //   openNewEventDialog({
    //     start: new Date(),
    //     end: new Date(),
    //   })
    // );
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeEvent(id));
    closeComposeDialog();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [tabValue, setTabValue] = useState(0);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const handleDateSelect = (value) => {
    setStartDate(value);
  };

  useEffect(() => {
    let initialDate = new Date(startDate);
    console.log(initialDate);

    var newDateObj = m(initialDate).add(30, "m").toDate();

    console.log(newDateObj);

    setEndDate(newDateObj);
  }, [startDate]);

  return (
    <div>
      <Dialog
        {...eventDialog.props}
        onClose={closeComposDialog}
        fullWidth
        maxWidth="sm"
        component="form"
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {eventDialog.type === "new"
                ? "New Appointments"
                : "Edit Appointments"}
            </Typography>
          </Toolbar>
        </AppBar>

        <form noValidate>
          <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64" }}
            >
              <Tab className="h-64" label="Select Patient" />
              <Tab className="h-64" label="Select Doctor" />
              <Tab className="h-64" label="Reason of Visit" />
              <Tab className="h-64" label="Appointment" />
              {/* <Tab className="h-64" label="Shipping" /> */}
            </Tabs>
            <div className="p-16 sm:p-24 max-w-2xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                  <TextField
                    label="Search "
                    placeholder="Enter a keyword..."
                    className="flex w-full"
                    value={searchText}
                    inputProps={{
                      "aria-label": "Search",
                    }}
                    onChange={handleSearchText}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="Name"
                      label="Name"
                      className="mt-8 mb-16"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      autoFocus
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputMask
                        {...field}
                        mask={phoneValue}
                        disabled={false}
                        maskChar=""
                        id="phone"
                      >
                        {() => (
                          <TextField
                            {...field}
                            className="mt-8 mb-16"
                            label="Phone "
                            error={!!errors.phone}
                            variant="outlined"
                            autoFocus
                            required
                            fullWidth
                            helperText={errors?.phone?.message}
                          />
                        )}
                      </InputMask>
                    </>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="address"
                      label="address"
                      className="mt-8 mb-16"
                      error={!!errors.address}
                      helperText={errors?.address?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      autoFocus
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="ssn"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask={maskedValue}
                      disabled={false}
                      maskChar=""
                      id="ssn"
                    >
                      {() => (
                        <TextField
                          className="mt-8 mb-16"
                          error={!!errors.ssn}
                          required
                          helperText={errors?.ssn?.message}
                          label="SSN"
                          variant="outlined"
                          autoFocus
                          fullWidth
                          InputProps={{
                            className: "pr-2",
                            type: showPassword ? "text" : "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  size="large"
                                >
                                  <Icon className="text-20" color="action">
                                    {showPassword
                                      ? "visibility"
                                      : "visibility_off"}
                                  </Icon>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </InputMask>
                  )}
                />
              </div>
              <div className={tabValue !== 1 ? "hidden" : ""}>
                <TableHead>
                  <TableRow className="h-100">
                    <TableCell className="w-100  text-center" padding="none">
                      <Checkbox
                        value="132"
                        name="doctorId"
                        onClick={(event) => handleSelect(event)}
                      />
                    </TableCell>
                    {rows.map((row) => {
                      return (
                        <TableCell
                          padding={row.disablePadding ? "none" : "normal"}
                        >
                          {row.sort && (
                            <Tooltip
                              title="Sort"
                              placement={
                                row.align === "right"
                                  ? "bottom-end"
                                  : "bottom-start"
                              }
                              enterDelay={300}
                            >
                              <TableSortLabel className="font-semibold">
                                {row.label}
                              </TableSortLabel>
                            </Tooltip>
                          )}
                        </TableCell>
                      );
                    }, this)}
                  </TableRow>
                </TableHead>
                <Table>
                  <TableBody>
                    <TableRow
                      className="h-100 cursor-pointer"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      //   onClick={(event) => handleClick(n)}
                    >
                      <TableCell className="w-100  text-center" padding="none">
                        <Checkbox
                          value="102"
                          name="doctorId"
                          onClick={(event) => handleSelect(event)}
                        />
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
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
                      <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox onClick={(event) => handleSelect(event)} />
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
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
                    <TableRow
                      className="h-72 cursor-pointer"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      //   onClick={(event) => handleClick(n)}
                    >
                      <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox onClick={(event) => handleSelect(event)} />
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {/* {n.first_name} {n.middle_name} {n.last_name} */}
                        Abbott Keitch
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
                        abbott@gmail.com
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
                    <TableRow
                      className="h-72 cursor-pointer"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      //   onClick={(event) => handleClick(n)}
                    >
                      <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox onClick={(event) => handleSelect(event)} />
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {/* {n.first_name} {n.middle_name} {n.last_name} */}
                        Aizk
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
                        arzk@gmail.com
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
                        <Icon className="text-green text-20">check_circle</Icon>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className={tabValue !== 2 ? "hidden" : ""}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">
                    Select Reason of Visit
                  </InputLabel>
                  <Controller
                    name="reasonOfVisit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        label="Grouping"
                      >
                        <option aria-label="None" value="" />
                        <optgroup label="Skin Disorders">
                          <option value={"Skin Disorders"}>Skin Disorders</option>
                          <option value={ "Joint Pain and Osteoarthritis"}>
                            Joint Pain and Osteoarthritis
                          </option>
                          <option value={"Back Problems"}>Back Problems</option>
                          <option value={"Cholesterol Problems"}>Cholesterol Problems</option>
                          <option value={"High Blood Pressure"}>High Blood Pressure</option>
                        </optgroup>
                      </Select>
                    )}
                  />
                </FormControl>
                {/* {eventDialog.type === "new" ? (
                  <DialogActions className="justify-between px-8 sm:px-16 pb-16">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmitAppointment}
                      // disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                      submit
                    </Button>
                  </DialogActions>
                ) : (
                  <DialogActions className="justify-between px-8 sm:px-16 pb-16">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmit}
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                      Save
                    </Button>
                    <IconButton onClick={handleRemove} size="large">
                      <Icon>delete</Icon>
                    </IconButton>
                  </DialogActions>
                )} */}
              </div>
              <div className={tabValue !== 3 ? "hidden" : ""}>
                <div>
                  <form noValidate>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="title"
                          label="Title"
                          className="mt-8 mb-16"
                          error={!!errors.title}
                          helperText={errors?.title?.message}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                        />
                      )}
                    />

                    {/* <Controller
            name="allDay"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                className="mt-8 mb-16"
                label="All Day"
                control={
                  <Switch
                    onChange={(ev) => {
                      onChange(ev.target.checked);
                    }}
                    checked={value}
                    name="allDay"
                  />
                }
              />
            )}
          /> */}

                    <Controller
                      name="start"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <DateTimePicker
                          value={startDate || value}
                          onChange={(newValue) => {
                            handleDateSelect(newValue);
                          }}
                          renderInput={(_props) => (
                            <TextField
                              label="Start"
                              className="mt-8 mb-16 w-full"
                              {..._props}
                            />
                          )}
                          className="mt-8 mb-16 w-full"
                          maxDate={end}
                        />
                      )}
                    />

                    <Controller
                      name="end"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <DateTimePicker
                          ref={dateRef}
                          value={endDate || value}
                          onChange={onChange}
                          renderInput={(_props) => (
                            <TextField
                              label="End"
                              className="mt-8 mb-16 w-full"
                              {..._props}
                            />
                          )}
                          minDate={start}
                        />
                      )}
                    />

                    <Controller
                      name="extendedProps.desc"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mt-8 mb-16"
                          id="desc"
                          label="Description"
                          type="text"
                          multiline
                          rows={5}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                    {eventDialog.type === "new" ? (
                      <DialogActions className="justify-between px-8 sm:px-16 pb-16">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={onSubmit}
                          // disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                          Add
                        </Button>
                      </DialogActions>
                    ) : (
                      <DialogActions className="justify-between px-8 sm:px-16 pb-16">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={onSubmit}
                          // disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                          Save
                        </Button>
                        <IconButton onClick={handleRemove} size="large">
                          <Icon>delete</Icon>
                        </IconButton>
                      </DialogActions>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
export default AppointmentDialog;


