import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import _ from "@lodash";
import { saveProduct, removeProduct } from "../store/doctorSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { useSelector } from "react-redux";

function DoctorHeader(props) {
    const user = useSelector(({ auth }) => auth.user);
    console.log(user);

    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const first_name = watch("first_name");
    const middle_name = watch("middle_name");
    const last_name = watch("last_name");
    const theme = useTheme();
    const history = useHistory();

    function handleSaveProduct() {
        dispatch(saveProduct(getValues())).then(() => {
            dispatch(
                showMessage({
                    message: "Doctor Added successfully", //text or html
                    autoHideDuration: 3000, //ms
                    anchorOrigin: {
                        vertical: "top", //top bottom
                        horizontal: "right", //left center right
                    },
                    variant: null, //success error info warning null
                })
            );
            history.push("/apps/doctor");
        });
    }

    function handleRemoveProduct() {
        dispatch(removeProduct()).then(() => {
            dispatch(
                showMessage({
                    message: "Doctor Deleted successfully", //text or html
                    autoHideDuration: 6000, //ms
                    anchorOrigin: {
                        vertical: "top", //top bottom
                        horizontal: "right", //left center right
                    },
                    variant: null, //success error info warning null
                })
            );
            history.push("/apps/doctor");
        });
    }

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/doctor"
                        color="inherit"
                    >
                        <Icon className="text-20">
                            {theme.direction === "ltr"
                                ? "arrow_back"
                                : "arrow_forward"}
                        </Icon>
                        <span className="hidden sm:flex mx-4 font-medium">
                            Doctors
                        </span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                        <img
                            className="w-32 sm:w-48 rounded"
                            src="assets/images/ecommerce/product-image-placeholder.png"
                            alt={first_name}
                        />
                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {first_name +
                                    " " +
                                    middle_name +
                                    " " +
                                    last_name || "New Doctor"}
                            </Typography>
                            <Typography
                                variant="caption"
                                className="font-medium"
                            >
                                Doctor Detail
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveProduct}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                >
                    Remove
                </Button>
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveProduct}
                >
                    Save
                </Button>
            </motion.div>
        </div>
    );
}

export default DoctorHeader;
