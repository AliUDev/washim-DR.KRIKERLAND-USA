// import { yupResolver } from "@hookform/resolvers/yup";
// import formatISO from "date-fns/formatISO";
// import { Controller, useForm } from "react-hook-form";
// import FuseUtils from "@fuse/utils/FuseUtils";
// import AppBar from "@mui/material/AppBar";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Icon from "@mui/material/Icon";
// import IconButton from "@mui/material/IconButton";
// import Switch from "@mui/material/Switch";
// import TextField from "@mui/material/TextField";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { DateTimePicker } from "@mui/lab";
// import { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import { Link, useParams } from "react-router-dom";
// import InputMask from "react-input-mask";
// import InputAdornment from "@mui/material/InputAdornment";
// import { React, useState } from "react";
// import _ from "@lodash";
// import {
//   removeEvent,
//   closeNewEventDialog,
//   closeEditEventDialog,
//   updateEvent,
//   addEvent,
//   removeAppointment,
//   closeNewAppointmentDialog,
//   closeEditAppointmentDialog,
//   updateAppointment,
//   addAppointment,
// } from "./store/eventsSlice";

// const defaultValues = {
//   id: FuseUtils.generateGUID(),
//   title: "",
//   name: "",
//   allDay: true,
//   start: formatISO(new Date()),
//   end: formatISO(new Date()),
//   date_of_birth: "",
//   ssn: "",
//   phone: "",
//   address: "",
//   extendedProps: { desc: "" },
// };
// console.log("name is", name);
// /**
//  * Form Validation Schema
//  */
// const schema = yup.object().shape({
//   title: yup.string().required("You must enter a title"),
//   name: yup.string().required("You must enter a Name"),
//   date_of_birth: yup.string().required(" Please select date of birth"),
// });

// function EventDialog(props) {
//   const dispatch = useDispatch();
//   const routeParams = useParams();
//   const eventDialog = useSelector(
//     ({ calendarApp }) => calendarApp.events.eventDialog
//   );
//   let emailDisabled = false;
//   let maskedValue = "999-99-9999";
//   if (routeParams.productHandle == "update") {
//     emailDisabled = true;
//     maskedValue = "###-##-9999";
//   }
//   let phoneValue = "(999)-999-99999";
//   if (routeParams.productHandle == "update") {
//     emailDisabled = true;
//     phoneValue = "(###)-###-99999";
//   }

//   const [showPassword, setShowPassword] = useState(false);

//   const { reset, formState, watch, control, getValues } = useForm({
//     defaultValues,
//     mode: "onChange",
//     resolver: yupResolver(schema),
//   });

//   const { isValid, dirtyFields, errors } = formState;

//   const start = watch("start");
//   const end = watch("end");
//   const id = watch("id");

//   /**
//    * Initialize Dialog with Data
//    */
//   const initDialog = useCallback(() => {
//     /**
//      * Dialog type: 'edit'
//      */
//     if (eventDialog.type === "edit" && eventDialog.data) {
//       reset({ ...eventDialog.data });
//     }

//     /**
//      * Dialog type: 'new'
//      */
//     if (eventDialog.type === "new") {
//       reset({
//         ...defaultValues,
//         ...eventDialog.data,
//         id: FuseUtils.generateGUID(),
//       });
//     }
//   }, [eventDialog.data, eventDialog.type, reset]);

//   /**
//    * On Dialog Open
//    */
//   useEffect(() => {
//     if (eventDialog.props.open) {
//       initDialog();
//     }
//   }, [eventDialog.props.open, initDialog]);

//   /**
//    * Close Dialog
//    */
//   function closeComposeDialog() {
//     return eventDialog.type === "edit"
//       ? dispatch(closeEditEventDialog())
//       : dispatch(closeNewEventDialog());
//   }
//   function closeComposDialog() {
//     return eventDialog.type === "edit"
//       ? dispatch(closeEditEventDialog())
//       : dispatch(closeNewEventDialog());
//   }

//   /**
//    * Form Submit
//    */
//   function onSubmit(ev) {
//     ev.preventDefault();
//     const data = getValues();
//     if (eventDialog.type === "new") {

//       dispatch(addEvent(data));

//     } else {

//       dispatch(updateEvent({ ...eventDialog.data, ...data }));

//     }

//     closeComposeDialog();
//   }

//   function onSubmitAppointment(ev) {
//     ev.preventDefault();
//     const data = getValues();
//     if (eventDialog.type === "new") {
//       dispatch(addEvent(data));
//     } else {
//       dispatch(updateEvent({ ...eventDialog.data, ...data }));
//     }
//     closeComposDialog();
//   }

//   /**
//    * Remove Event
//    */
//   function handleRemove() {
//     dispatch(removeEvent(id));
//     closeComposeDialog();
//   }

//   return (

//   );
// }

// export default EventDialog;

