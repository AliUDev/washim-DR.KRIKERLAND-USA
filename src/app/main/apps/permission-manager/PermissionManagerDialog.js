import React, { useState } from "react";
import FuseUtils from "@fuse/utils/FuseUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "@lodash";
import * as yup from "yup";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";

import {
    removeContact,
    updateContact,
    addContact,
    closeNewContactDialog,
    closeEditContactDialog,
} from "./store/contactsSlice";

const defaultValues = {
    id: "",
    name: "",
    doctor_create: true,
    doctor_read: true,
    doctor_update: true,
    doctor_delete: true,
    patient_create: true,
    patient_read: true,
    patient_update: true,
    patient_delete: true,
    userManagement_create: true,
    userManagement_read: true,
    userManagement_update: true,
    userManagement_delete: true,
    roleManager_create: true,
    roleManager_read: true,
    roleManager_update: true,
    roleManager_delete: true,
    permissionManager_create: true,
    permissionManager_read: true,
    permissionManager_update: true,
    permissionManager_delete: true,
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function PermissionManagerDialog(props) {
    const dispatch = useDispatch();
    const contactDialog = useSelector(
        ({ contactsApp }) => contactsApp.contacts.contactDialog
    );

    const { control, watch, reset, handleSubmit, formState, getValues } =
        useForm({
            mode: "onChange",
            defaultValues,
            resolver: yupResolver(schema),
        });

    const { isValid, dirtyFields, errors } = formState;

    const id = watch("id");
    const name = watch("name");

    /**
     * Initialize Dialog with Data
     */
    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (contactDialog.type === "edit" && contactDialog.data) {
            reset({ ...contactDialog.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (contactDialog.type === "new") {
            reset({
                ...defaultValues,
                ...contactDialog.data,
                id: FuseUtils.generateGUID(),
            });
        }
    }, [contactDialog.data, contactDialog.type, reset]);

    /**
     * On Dialog Open
     */
    useEffect(() => {
        if (contactDialog.props.open) {
            initDialog();
        }
    }, [contactDialog.props.open, initDialog]);

    /**
     * Close Dialog
     */
    function closeComposeDialog() {
        return contactDialog.type === "edit"
            ? dispatch(closeEditContactDialog())
            : dispatch(closeNewContactDialog());
    }

    /**
     * Form Submit
     */
    function onSubmit(data) {
        if (contactDialog.type === "new") {
            dispatch(addContact(data));
        } else {
            dispatch(updateContact({ ...contactDialog.data, ...data }));
        }
        closeComposeDialog();
    }

    /**
     * Remove Event
     */
    function handleRemove() {
        dispatch(removeContact(id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24",
            }}
            {...contactDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="sm"
        >
            <AppBar position="static" elevation={0}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {contactDialog.type === "new"
                            ? "New Permission"
                            : "Edit Permission"}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {contactDialog.type === "edit" && (
                        <Typography
                            variant="h6"
                            color="inherit"
                            className="pt-8"
                        >
                            {name}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:overflow-hidden"
            >
                <DialogContent classes={{ root: "p-24" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Name"
                                    id="name"
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    variant="outlined"
                                    required
                                    disabled
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Doctor</FormLabel>
                        <FormGroup aria-label="position" row>
                            <Controller
                                name="doctor_read"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="doctor_read"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Read"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="doctor_create"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="doctor_create"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Create"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="doctor_update"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="doctor_update"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Update"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="doctor_delete"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="doctor_delete"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Delete"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Patient</FormLabel>
                        <FormGroup aria-label="position" row>
                            <Controller
                                name="patient_read"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="patient_read"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Read"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="patient_create"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="patient_create"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Create"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="patient_update"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="patient_update"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Update"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="patient_delete"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="patient_delete"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Delete"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">
                            User Management
                        </FormLabel>
                        <FormGroup aria-label="position" row>
                            <Controller
                                name="userManagement_read"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="userManagement_read"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Read"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="userManagement_create"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="userManagement_create"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Create"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="userManagement_update"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="userManagement_update"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Update"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="userManagement_delete"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="userManagement_delete"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Delete"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Role Manager</FormLabel>
                        <FormGroup aria-label="position" row>
                            <Controller
                                name="roleManager_read"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="roleManager_read"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Read"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="roleManager_create"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="roleManager_create"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Create"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="roleManager_update"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="roleManager_update"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Update"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="roleManager_delete"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="roleManager_delete"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Delete"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">
                            Permission Manager
                        </FormLabel>
                        <FormGroup aria-label="position" row>
                            <Controller
                                name="permissionManager_read"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="permissionManager_read"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Read"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="permissionManager_create"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="permissionManager_create"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Create"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="permissionManager_update"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="permissionManager_update"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Update"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name="permissionManager_delete"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            id="permissionManager_delete"
                                            control={
                                                <Switch checked={field.value} />
                                            }
                                            label="Delete"
                                            labelPlacement="start"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                    </FormControl>
                </DialogContent>

                {contactDialog.type === "new" ? (
                    <DialogActions className="justify-between p-4 pb-16">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between p-4 pb-16">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                            >
                                Save
                            </Button>
                        </div>
                    </DialogActions>
                )}
            </form>
        </Dialog>
    );
}

export default PermissionManagerDialog;
