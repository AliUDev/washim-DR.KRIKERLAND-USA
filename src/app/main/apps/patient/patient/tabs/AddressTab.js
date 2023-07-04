import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import AddBox from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
function AddressTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [phoneData, setPhoneData] = useState({
    showPhone1: true,
    showPhone2: false,
    showPhone3: false,
    showPhone4: false,
    showPhone5: false,
  });

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

  const removePhone = (phone) => {    
   setPhoneData({ ...phoneData, [phone]: false });
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
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
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
            style={{ width: "60%" }}
          />
        )}
      />

      <Controller
        name="phone_1"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask={maskedValue}
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
                  style={{ width: "60%" }}
                  error={!!errors.phone_1}
                  required
                  helperText={errors?.phone_1?.message}
                />
              )}
            </InputMask>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="mt-8 mb-16"
              style={{ width: "6%" }}
              onClick={() => handlePhone("phone1")}
            >
              {phoneData.showPhone1 && <AddBox />}
            </IconButton>
          </>
        )}
      />

      <Controller
        name="phone_2"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask={maskedValue}
              disabled={false}
              maskChar=""
              id="phone_2"
            >
              {() => (
                <TextField
                  {...field}
                  style={{
                    display: phoneData.showPhone2 ? "" : "none",
                    width: "60%",
                  }}
                  className="mt-8 mb-16"
                  label="Phone 2"
                  id="phone_2"
                  variant="outlined"
                />
              )}
            </InputMask>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="mt-8 mb-16"
              style={{
                width: "6%",
                display: phoneData.showPhone2 ? "" : "none",
              }}
            >
              <AddBox onClick={() => handlePhone("phone2")} />
              <CancelIcon onClick={() => removePhone("showPhone2")}  />
            </IconButton>
          </>
        )}
      />
      <Controller
        name="phone_3"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask={maskedValue}
              disabled={false}
              maskChar=""
              id="phone_3"
            >
              {() => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Phone 3"
                  style={{
                    display: phoneData.showPhone3 ? "" : "none",
                    width: "60%",
                  }}
                  id="phone_3"
                  variant="outlined"
                />
              )}
            </InputMask>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="mt-8 mb-16"
              style={{
                width: "6%",
                display: phoneData.showPhone3 ? "" : "none",
              }}
            >
              <AddBox onClick={() => handlePhone("phone3")} />
              <CancelIcon onClick={() => removePhone("showPhone3")} />
            </IconButton>
          </>
        )}
      />
      <Controller
        name="phone_4"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask={maskedValue}
              disabled={false}
              maskChar=""
              id="phone_4"
            >
              {() => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Phone 4"
                  style={{
                    display: phoneData.showPhone4 ? "" : "none",
                    width: "60%",
                  }}
                  id="phone_4"
                  variant="outlined"
                />
              )}
            </InputMask>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="mt-8 mb-16"
              style={{
                width: "6%",
                display: phoneData.showPhone4 ? "" : "none",
              }}
            >
              <AddBox onClick={() => handlePhone("phone4")} />
              <CancelIcon onClick={() => removePhone("showPhone4")} />
            </IconButton>
          </>
        )}
      />
      <Controller
        name="phone_5"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask={maskedValue}
              disabled={false}
              maskChar=""
              id="phone_5"
            >
              {() => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Phone 5"
                  style={{
                    display: phoneData.showPhone5 ? "" : "none",
                    width: "60%",
                  }}
                  id="phone_5"
                  variant="outlined"
                />
                
              )}
              
            </InputMask>
          </>
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
                style={{ width: "60%" }}
              />
            )}
          </InputMask>
        )}
      />
    </div>
  );
}

export default AddressTab;