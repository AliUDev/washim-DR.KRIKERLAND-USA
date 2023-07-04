import FuseUtils from "@fuse/utils/FuseUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "@lodash";
import * as yup from "yup";
import axios from "axios";

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
    active: "yes",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup
        .string()
        .required("You must enter a name")
        .min(4, "The name must be at least 4 characters")
        .max(49, "The name must be at least 50 characters")
        .test(
            "checkRoleUnique",
            "This role is already registered.",
            async (value) => {
                if (value.length >= 3) {
                    const response = await axios.post(
                        `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/checkRole`,
                        {
                            role: value,
                        }
                    );
                    const data = await response.data;
                    return !data.data;
                }
            }
        ),
});

function RoleManagerDialog(props) {
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
            maxWidth="xs"
        >
            <AppBar position="static" elevation={0}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {contactDialog.type === "new"
                            ? "New Role"
                            : "Edit Role"}
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
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20" />

                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend">
                                        Active Status
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="active"
                                        name="active"
                                        {...field}
                                    >
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>
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
                        <IconButton onClick={handleRemove} size="large">
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </form>
        </Dialog>
    );
}

export default RoleManagerDialog;
