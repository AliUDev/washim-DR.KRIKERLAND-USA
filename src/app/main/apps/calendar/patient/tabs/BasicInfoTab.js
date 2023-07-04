import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import { React, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Link, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
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
    const [showSsn, setShowSsn] = useState(false);
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });
    let emailDisabled = false;
    let maskedValue = "999-99-9999";
    if (routeParams.productHandle == "update") {
        emailDisabled = true;
        maskedValue = "###-##-9999";
    }
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Controller
                name="first_name"
                control={control}
                type="text"
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
                        style={{width:"40%",marginLeft:"10px"}}
                       
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
                        style={{width:"40%",marginLeft:"10px"}}

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
                        style={{width:"40%",marginLeft:"10px"}}

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
                        InputLabelProps={{ shrink: true }}
                        label="Date of birth"
                        id="date_of_birth"
                        variant="outlined"
                        style={{width:"40%",marginLeft:"10px"}}

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
                        style={{width:"40%",marginLeft:"10px"}}

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
                                style={{width:"40%",marginLeft:"10px"}}
                                InputProps={{
                                    className: 'pr-2',
                                    type: showPassword ? 'text' : 'password',
                                    endAdornment: (
                                     <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                                          <Icon className="text-20" color="action">
                                            {showPassword ? 'visibility' : 'visibility_off' }
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
                        style={{width:"40%",marginLeft:"10px"}}

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
        </div>
    );
}

export default BasicInfoTab;
