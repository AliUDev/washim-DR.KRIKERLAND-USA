import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
function AddressTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const routeParams = useParams();
    let emailDisabled = false;
    let maskedValue = "(999)-999-99999";
    if (routeParams.productHandle == "update") {
        emailDisabled = true;
        maskedValue = "(###)-###-99999";
    }
    const handlePhone = (phone) => {
        if (phone == "phone1") {
            setPhoneData({ ...phoneData, showPhone2: true });
        } else if (phone == "phone2") {
            setPhoneData({ ...phoneData, showPhone3: true });
        } else if (phone == "phone3") {
            setPhoneData({ ...phoneData, showPhone4: true });
        } else if (phone == "phone4") {
            setPhoneData({ ...phoneData, showPhone5: true });
        }
    };

      
    return (
        <div>
            <Controller
                name="street_1"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="street_1"
                        label="Street 1"
                        type="text"
                        error={!!errors.street_1}
                        required
                        helperText={errors?.street_1?.message}
                        multiline
                        rows={5}
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />
            <Controller
                name="street_2"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="street_2"
                        label="Street 2"
                        type="text"
                        error={!!errors.street_2}
                        helperText={errors?.street_2?.message}
                        multiline
                        rows={5}
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="city"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="City"
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        id="city"
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="state"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="State"
                        id="state"
                        error={!!errors.state}
                        helperText={errors?.state?.message}
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Zip"
                        id="zip"
                        error={!!errors.zip}
                        helperText={errors?.zip?.message}
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                )}
            />

            <Controller
                name="phone_1"
                control={control}
                render={({ field }) => (
                    <InputMask
                    {...field}
                    // mask={maskedValue}
                    disabled={false}
                    maskChar=""
                    id="phone_1"
                >
                    {() => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Phone 1"
                        variant="outlined"
                        type="number"
                        style={{width:"60%"}}
                        error={!!errors.phone_1}
                        required
                        helperText={errors?.phone_1?.message}

                    />
                    )}
                    </InputMask>
                )}
            />

            <Controller
                name="phone_2"
                control={control}
                render={({ field }) => (
                    <InputMask
                    {...field}
                    // mask={maskedValue}
                    disabled={false}
                    maskChar=""
                    id="phone_2"
                >
                    {() => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Phone 2"
                        variant="outlined"
                        type="number"
                        style={{width:"60%"}}
                        error={!!errors.phone_2}
                        required
                        helperText={errors?.phone_2?.message}

                    />
                    )}
                    </InputMask>
                )}
            />

            <Controller
                name="fax"
                control={control}
                render={({ field }) => (
                    <InputMask
                    {...field}
                    mask={maskedValue}
                    disabled={false}
                    maskChar=""
                    id="fax"
                >
                    {() => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Fax"
                        error={!!errors.fax}
                        helperText={errors?.fax?.message}
                        variant="outlined"
                        style={{width:"60%"}}

                    />
                    )}
                    </InputMask>
                )}
            />
        </div>
    );
}

export default AddressTab;
