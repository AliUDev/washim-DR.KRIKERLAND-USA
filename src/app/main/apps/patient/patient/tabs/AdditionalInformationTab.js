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

            <Controller
                name="patient_active"
                control={control}
                render={({ field }) => (
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Active Status</FormLabel>
                        <RadioGroup
                            row
                            aria-label="patient_active"
                            name="patient_active"
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
