import React, { useState,  useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

const medicalInsuranceType = [
    {
        value: "Medicaid",
        label: "Medicaid",
    },
    {
        value: "Medicare",
        label: "Medicare",
    },
    {
        value: "Private Insurance",
        label: "Private Insurance",
    },
    {
        value: "Billing",
        label: "Billing",
    },
];

function MedicalInformationTab(props) {
    const methods = useFormContext();
    const [billing, setBilling] = useState(false);
    const { formState, watch, getValues, control } = methods;
    const { errors } = formState;
    const medical_insurance_type = watch("medical_insurance_type");

    useEffect(() => {
        if (medical_insurance_type === "Billing") {
            setBilling(true);
        }
    }, []);

    return (
        <div>
            <Controller
                name="medical_insurance_type"
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <TextField
                            id="medical_insurance_type"
                            select
                            label="Select Medical Insurance Type"
                            value={value}
                            variant="outlined"
                            style={{width:"60%"}}

                            onChange={(event, newValue) => {
                                onChange(newValue.props.value);
                                if (newValue.props.value == "Billing") {
                                    setBilling(true);
                                } else {
                                    setBilling(false);
                                }
                            }}
                            helperText="Please select your medical insurace type"
                        >
                            {medicalInsuranceType.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    );
                }}
            />

            <Controller
                name="health_plan_number"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.health_plan_number}
                        helperText={errors?.health_plan_number?.message}
                        label="Health Plan Number"
                        id="health_plan_number"
                        variant="outlined"
                        // type="number"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="group_number"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.group_number}
                        helperText={errors?.group_number?.message}
                        label="Group Number"
                        id="group_number"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="member_id"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.member_id}
                        helperText={errors?.member_id?.message}
                        label="Member ID"
                        id="member_id"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="mmis_number"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.mmis_number}
                        helperText={errors?.mmis_number?.message}
                        label="MMIS Number"
                        id="mmis_number"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="primary_care_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.primary_care_name}
                        helperText={errors?.primary_care_name?.message}
                        label="Primary Care Name"
                        id="primary_care_name"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="primary_care_clinic"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.primary_care_clinic}
                        helperText={errors?.primary_care_clinic?.message}
                        label="Primary Care Clinic"
                        id="primary_care_clinic"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="primary_care_number"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.primary_care_number}
                        helperText={errors?.primary_care_number?.message}
                        label="Primary Care Number"
                        id="primary_care_number"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="payer_id"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.payer_id}
                        helperText={errors?.payer_id?.message}
                        label="Payer ID"
                        id="payer_id"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="rx_grp"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.rx_grp}
                        helperText={errors?.rx_grp?.message}
                        label="Rx Grp"
                        id="rx_grp"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="rx_bin"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.rx_bin}
                        helperText={errors?.rx_bin?.message}
                        label="Rx Bin"
                        id="rx_bin"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="rx_pcn"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.rx_pcn}
                        helperText={errors?.rx_pcn?.message}
                        label="Rx Pcn"
                        id="rx_pcn"
                        variant="outlined"
                        disabled={billing ? true : false}
                        style={{width:"60%"}}

                    />
                )}
            />
        </div>
    );
}

export default MedicalInformationTab;
