import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import { React, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Link, useParams } from "react-router-dom";
import InputMask from "react-input-mask";

const doctorTypes = [
    "Allergist",
    "Anaesthesiologist",
    "Andrologist",
    "Cardiologist",
    "Cardiac Electrophysiologist",
    "Dermatologist",
    "Dietitian/Dietician",
    "Emergency Room (ER) Doctor",
    "Endocrinologist",
    "Epidemiologist",
    "Family Medicine Physician",
    "Gastroenterologist",
    "Geriatrician",
    "Hyperbaric Physician",
    "Hematologist",
    "Hepatologist",
    "Immunologist",
    "Infectious Disease Specialist",
    "Intensivist",
    "Internal Medicine Specialist",
    "Maxillofacial Surgeon / Oral Surgeon",
    "Medical Examiner",
    "Medical Geneticist",
    "Neonatologist",
    "Nephrologist",
    "Neurologist",
    "Neurosurgeon",
    "Nuclear Medicine Specialist",
    "Obstetrician/Gynecologist (OB/GYN)",
    "Occupational Medicine Specialist",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedic Surgeon / Orthopedist",
    "Otolaryngologist (aka ENT Specialist)",
    "Osteopath",
    "Palliative Care Specialist",
    "Parasitologist",
    "Pathologist",
    "Perinatologist",
    "Periodontist",
    "Pediatrician",
    "Physiatrist",
    "Plastic Surgeon",
    "Psychiatrist",
    "Pulmonologist",
    "Radiologist",
    "Rheumatologist",
    "Sleep Doctor / Sleep Disorders Specialist",
    "Spinal Cord Injury Specialist",
    "Sports Medicine Specialist",
    "Surgeon",
    "Thoracic Surgeon",
    "Urologist",
    "Vascular Surgeon",
    "Veterinarian",
];

const genders = [
    {
        value: "Male",
        label: "Male",
    },
    {
        value: "Female",
        label: "Female",
    },
    {
        value: "Other",
        label: "Other",
    },
];

function BasicInfoTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const routeParams = useParams();
    let emailDisabled = false;
    let maskedValue = "999-99-9999";
    if (routeParams.productHandle == "update") {
        emailDisabled = true;
        maskedValue = "###-##-9999";
    }
    return (
        <div>
            <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.first_name}
                        required
                        helperText={errors?.first_name?.message}
                        label="First Name"
                        autoFocus
                        id="first_name"
                        variant="outlined"
                        style={{width:"60%"}}

                        
                    />
                )}
            />
            <Controller
                name="middle_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.middle_name}
                        required
                        helperText={errors?.middle_name?.message}
                        label="Middle Name"
                        id="middle_name"
                        variant="outlined"
                        style={{width:"60%"}}


                    />
                )}
            />
            <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.last_name}
                        required
                        helperText={errors?.last_name?.message}
                        label="Last Name"
                        id="last_name"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                    <TextField
                        type="date"
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.date_of_birth}
                        required
                        label="Date Of Birth"
                        InputLabelProps={{ shrink: true }}
                        // helperText="Date Of Birth"
                        id="date_of_birth"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.email}
                        required
                        disabled={emailDisabled}
                        helperText={errors?.email?.message}
                        label="Email"
                        id="email"
                        variant="outlined"
                        style={{width:"60%"}}

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
                                style={{width:"60%"}}

                            />
                        )}
                    </InputMask>
                )}
            />
            <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        id="gender"
                        select
                        label="Select Gender"
                        value={value}
                        variant="outlined"
                        style={{width:"60%"}}

                        onChange={(event, newValue) => {
                            onChange(newValue.props.value);
                        }}
                        helperText="Please select your gender"
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="doctor_types"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => {
                    return (
                        <Autocomplete
                            className="mt-8 mb-16"
                            multiple
                            freeSolo
                            options={doctorTypes}
                            value={
                                value.length == 0 ? value : JSON.parse(value)
                            }
                            onChange={(event, newValue) => {
                                onChange(JSON.stringify(newValue));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select multiple types"
                                    label="Doctor Types"
                                    variant="outlined"
                                    style={{width:"60%"}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                    );
                }}
            />
        </div>
    );
}

export default BasicInfoTab;
