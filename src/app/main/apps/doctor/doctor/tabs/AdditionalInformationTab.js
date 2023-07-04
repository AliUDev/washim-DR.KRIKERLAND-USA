import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function AdditionalInformationTab(props) {
    const methods = useFormContext();
    const { control, formState, watch, getValues } = methods;
    const { errors } = formState;
    const covid_vaccinated = watch("covid_vaccinated");
    let disp = false;
    if (covid_vaccinated == "yes") {
        disp = true;
    } else {
        disp = false;
    }

    return (
        <div>


            
            <Controller
                name="shift"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Shift"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="shift"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="timing"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Timing"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="timing"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="clinic-name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Clinic Name"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="clinic-name"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Address"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="address"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Phone"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="phone"
                        variant="outlined"
                        style={{width:"60%"}}
                        type="number"

                    />
                )}
            />




            <Controller
                name="covid_vaccinated"
                control={control}
                render={({ field }) => (
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">
                            Covid Vaccinated
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="covid_vaccinated"
                            name="covid_vaccinated"
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

            {disp && (
                <Controller
                    name="covid_vaccinated_booster_shot"
                    control={control}
                    render={({ field }) => (
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">
                                Covid - 19 Booster Shot
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label="covid_vaccinated_booster_shot"
                                name="covid_vaccinated_booster_shot"
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
            )}

            {/* <Controller
                name="doctor_active"
                control={control}
                render={({ field }) => {
                    let checked = true;
                    if (field.value == "true") {
                        checked = true;
                    } else {
                        checked = false;
                    }
                    return (
                        <FormControlLabel
                            {...field}
                            id="doctor_active"
                            control={<Switch checked={checked} />}
                            label="Active Status"
                        />
                    );
                }}
            /> */}
            <Controller
                name="doctor_active"
                control={control}
                render={({ field }) => (
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Active Status</FormLabel>
                        <RadioGroup
                            row
                            aria-label="doctor_active"
                            name="doctor_active"
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
    );
}

export default AdditionalInformationTab;
