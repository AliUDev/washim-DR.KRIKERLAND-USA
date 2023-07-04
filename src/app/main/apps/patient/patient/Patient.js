import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import { resetProduct, newProduct, getProduct } from "../store/patientSlice";
import reducer from "../store";
import PatientHeader from "./PatientHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import MedicalInformationTab from "./tabs/MedicalInformationTab";
import AddressTab from "./tabs/AddressTab";
import AdditionalInformationTab from "./tabs/AdditionalInformationTab";
import axios from "axios";
import PatientContactPerson from "./tabs/PatientContactPerson";

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
}));

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
    first_name: yup
        .string()
        .required("You must enter a patient first name")
        .min(3, "The patient first name must be at least 3 characters")
        .max(30, "The patient first name must be at least 30 characters")
        .matches( /^[a-zA-Z'-]+$/ , 'Only Alphabets and Special character dash and upper comma are Allowed'),
    last_name: yup
        .string()
        .required("You must enter a patient last name")
        .min(3, "The patient last name must be at least 3 characters")
        .max(30, "The patient last name must be at least 30 characters")
        .matches( /^[a-zA-Z'-]+$/ , 'Only Alphabets and Special character dash and upper comma are Allowed'),

    middle_name: yup
        .string()
        .max(30, "The patient middle name must be at least 30 characters"),
    ssn: yup
        .string()
        .required("You must enter a patient ssn")
        .min(11, "The patient ssn must be at 9 characters")
        .max(11, "The patient ssn must be at 9 characters"),
    email: yup
        .string()
        .email("Enter a valid email")
         .required("You must enter a patient email")
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email"),
        // .min(10, "The patient email must be at least 10 characters")
        // .max(49, "The patient email must be at least 50 characters"),
    date_of_birth: yup
        .string()
        .required("You must enter a patient Date of birth"),
    street_1: yup
        .string()
        .required("You must enter a patient street 1")
        .min(10, "The patient street 1 must be at least 10 characters")
        .max(75, "The patient street 1 must be at least 75 characters")
        .matches(/^[#.0-9a-zA-Z\s-'#/,$]+$/ ,"Only dash, space, upper comma, hash symbol, forward slash and comma are Allowed"),
    street_2: yup
    .string()
    .required("You must enter a patient street 2")
    .min(10, "The patient street 1 must be at least 10 characters")       
    .max(75, "The patient street 1 must be at least 75 characters")
    .matches(/^[#.0-9a-zA-Z\s-'#/,$]+$/ ,"Only dash, space, upper comma, hash symbol, forward slash and comma are Allowed"),
    fax: yup.string().max(49, "The patient fax must be at least 50 characters"),
    city: yup
        .string()
        .required("You must enter a patient city")
        .min(5, "The patient city must be at least 5 characters")
        .max(49, "The patient city must be at least 50 characters"),
    state: yup
        .string()
        .required("You must enter a patient state")
        .min(5, "The patient state must be at least 5 characters")
        .max(49, "The patient state must be at least 50 characters")
        .matches(/^[#.0-9a-zA-Z\s'-]+$/ ,"Dashes spaces and uper comma are  Allowed"),    fax: yup.string().max(49, "The patient fax must be at least 50 characters"),

    zip: yup
        .string()
        .required("You must enter a patient zip")
        .min(4, "The patient zip must be at least 4 characters")
        .max(8, "The patient zip must be at least 8 characters"),
    health_plan_number: yup
        .string()
        .required("You must enter a patient health plan number")

        .max(
            49,
            "The patient health plan number must be at least 50 characters"
        ),
    group_number: yup
        .string()
        .required("You must enter a patient group number")

        .max(49, "The patient group number must be at least 50 characters"),
    member_id: yup
        .string()
        .required("You must enter a patient Member Id")

        .max(49, "The patient member id must be at least 50 characters"),
    mmis_number: yup
        .string()
        .required("You must enter a patient MMIS number")

        .max(49, "The patient MMIS number must be at least 50 characters"),
    primary_care_name: yup
        .string()
        .required("You must enter a patient Primary Care Number")

        .max(
            49,
            "The patient primary care name must be at least 50 characters"
        ),
    primary_care_clinic: yup
        .string()
        .max(
            49,
            "The patient primary clinic name must be at least 50 characters"
        ),
    primary_care_number: yup
        .string()
        .max(
            49,
            "The patient primary clinic number must be at least 50 characters"
        ),
    payer_id: yup
        .string()
        .max(49, "The patient  payer id must be at least 50 characters"),
    rx_grp: yup
        .string()
        .max(49, "The patient RX Grp must be at least 50 characters"),
    rx_bin: yup
        .string()
        .max(49, "The patient RX Bin must be at least 50 characters"),
    rx_pcn: yup
        .string()
        .max(49, "The patient RX Pcn must be at least 50 characters"),
    phone_1: yup
    .string()
    .required("You must enter a patient phone number"),
    // .min(11, "The patient phone number must be at 11 characters")
    // .max(11, "The patient phone number be at 11 characters"),
    phone_2: yup
        .string()
        .max(49, "The patient phone 2 must be at least 50 characters"),
    phone_3: yup
        .string()
        .max(49, "The patient phone 3 must be at least 50 characters"),
    phone_4: yup
        .string()
        .max(49, "The patient phone 4 must be at least 50 characters"),
    phone_5: yup
        .string()
        .max(49, "The patient phone 5 must be at least 50 characters"),
});

const schema2 = yup.object().shape({
    first_name: yup
        .string()
        .required("You must enter a patient first name")
        .min(3, "The patient first name must be at least 3 characters")
        .max(49, "The patient first name must be at least 50 characters"),
    last_name: yup
        .string()
        .required("You must enter a patient last name")
        .min(3, "The patient last name must be at least 3 characters")
        .max(49, "The patient last name must be at least 50 characters"),
    middle_name: yup
        .string()
        .max(49, "The patient middle name must be at least 50 characters"),
    ssn: yup
        .string()
        .required("You must enter a patient ssn")
        .min(11, "The patient ssn must be at 9 characters")
        .max(11, "The patient ssn must be at 9 characters"),

    date_of_birth: yup
        .string()
        .required("You must enter a patient Date of birth"),
    street_1: yup
        .string()
        .required("You must enter a patient street 1")
        .min(10, "The patient street 1 must be at least 10 characters")
        .max(200, "The patient street 1 must be at least 200 characters"),
    street_2: yup
        .string()
        .max(200, "The patient street 2 must be at least 200 characters"),
    fax: yup.string()
    .required("You must enter a patient phone number")
    .min(11, "The patient fax number must be at 11 characters")
    .max(11, "The patient fax number be at 11 characters"),   
     city: yup
        .string()
        .required("You must enter a patient city")
        .min(5, "The patient city must be at least 5 characters")
        .max(49, "The patient city must be at least 50 characters"),
    state: yup
        .string()
        .required("You must enter a patient state")
        .min(5, "The patient state must be at least 5 characters")
        .max(49, "The patient state must be at least 50 characters"),
    zip: yup
        .string()
        .required("You must enter a patient zip")
        .min(4, "The patient zip must be at least 4 characters")
        .max(49, "The patient zip must be at least 50 characters"),
    health_plan_number: yup
        .string()
        .max(
            49,
            "The patient health plan number must be at least 50 characters"
        ),
    group_number: yup
        .string()
        .max(49, "The patient group number must be at least 50 characters"),
    member_id: yup
        .string()
        .max(49, "The patient member id must be at least 50 characters"),
    mmis_number: yup
        .string()
        .max(49, "The patient MMIS number must be at least 50 characters"),
    primary_care_name: yup
        .string()
        .max(
            49,
            "The patient primary care name must be at least 50 characters"
        ),
    primary_care_clinic: yup
        .string()
        .max(
            49,
            "The patient primary clinic name must be at least 50 characters"
        ),
    primary_care_number: yup
        .string()
        .max(
            49,
            "The patient primary clinic number must be at least 50 characters"
        ),
    payer_id: yup
        .string()
        .max(49, "The patient  payer id must be at least 50 characters"),
    rx_grp: yup
        .string()
        .max(49, "The patient RX Grp must be at least 50 characters"),
    rx_bin: yup
        .string()
        .max(49, "The patient RX Bin must be at least 50 characters"),
    rx_pcn: yup
        .string()
        .max(49, "The patient RX Pcn must be at least 50 characters"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("You must enter a patient email")
        .min(10, "The patient email must be at least 10 characters")
        .max(49, "The patient email must be at least 50 characters"),
    phone_1: yup
        .string()
        .max(11, "The patient phone 1 must be at least 11 characters"),
    phone_2: yup
        .string()
        .max(49, "The patient phone 2 must be at least 50 characters"),
    phone_3: yup
        .string()
        .max(49, "The patient phone 3 must be at least 50 characters"),
    phone_4: yup
        .string()
        .max(49, "The patient phone 4 must be at least 50 characters"),
    phone_5: yup
        .string()
        .max(49, "The patient phone 5 must be at least 50 characters"),
});

function Patient(props) {
    const dispatch = useDispatch();
    const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

    const routeParams = useParams();
    const [tabValue, setTabValue] = useState(0);
    const [noProduct, setNoProduct] = useState(false);
    let methods = {};
    if (routeParams.productHandle == "update") {
        methods = useForm({
            mode: "onChange",
            defaultValues: {},
            resolver: yupResolver(schema2),
        });
    } else {
        methods = useForm({
            mode: "onChange",
            defaultValues: {},
            resolver: yupResolver(schema),
        });
    }
    const { reset, watch, control, onChange, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateProductState() {
            const { patientId } = routeParams;

            if (patientId === "new") {
                /**
                 * Create New Product data
                 */
                dispatch(newProduct());
            } else {
                /**
                 * Get Product data
                 */
                dispatch(getProduct(routeParams)).then((action) => {
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoProduct(true);
                    }
                });
            }
        }

        updateProductState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        if (!product) {
            return;
        }
        /**
         * Reset the form on product state changes
         */
        reset(product);
    }, [product, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Product on component unload
             */
            dispatch(resetProduct());
            setNoProduct(false);
        };
    }, [dispatch]);

    /**
     * Tab Change
     */
    function handleTabChange(event, value) {
        setTabValue(value);
    }

    /**
     * Show Message if the requested products is not exists
     */
    if (noProduct) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such patient!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/patient"
                    color="inherit"
                >
                    Go to Patients Page
                </Button>
            </motion.div>
        );
    }

    /**
     * Wait while product data is loading and form is setted
     */
    if (
        _.isEmpty(form) ||
        (product &&
            routeParams.patientId !== product.uuid &&
            routeParams.patientId !== "new")
    ) {
        return <FuseLoading />;
    }

    return (
        <FormProvider {...methods}>
            <Root
                header={<PatientHeader />}
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64" label="Basic Info" />
                        <Tab className="h-64" label="Contact Information" />
                        <Tab className="h-64" label="Medical Information" />
                        <Tab className="h-64" label="Additinal Information" />
                        <Tab className="h-64" label="Patient Contact Person" />
                        {/* <Tab className="h-64" label="Shipping" /> */}
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-2xl" >
                        <div className={tabValue !== 0 ? "hidden" : ""}>
                            <BasicInfoTab />
                        </div>

                        <div className={tabValue !== 1 ? "hidden" : ""}>
                            <AddressTab />
                        </div>

                        <div className={tabValue !== 2 ? "hidden" : ""}>
                            <MedicalInformationTab />
                        </div>

                        <div className={tabValue !== 3 ? "hidden" : ""}>
                            <AdditionalInformationTab />
                        </div>
                        <div className={tabValue !== 4 ? "hidden" : ""}>
                            <PatientContactPerson />
                        </div>
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
}

export default withReducer("eCommerceApp", reducer)(Patient);
