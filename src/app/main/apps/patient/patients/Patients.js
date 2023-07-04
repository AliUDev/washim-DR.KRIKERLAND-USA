import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { styled } from "@mui/material/styles";
import reducer from "../store";
import PatientsHeader from "./PatientsHeader";
import PatientsTable from "./PatientsTable";

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
    "& .FusePageCarded-content": {
        display: "flex",
    },
    "& .FusePageCarded-contentCard": {
        overflow: "hidden",
    },
}));

function Patients() {
    return (
        // <Root
        //     header={<PatientsHeader />}
        //     content={<PatientsTable />}
        //     innerScroll
        // />
        <div>
            {/* <PatientsHeader />
            <PatientsTable /> */}
            <Root header={<PatientsHeader />} content={<PatientsTable />} innerScroll />

        </div>
    );
}

export default withReducer("eCommerceApp", reducer)(Patients);
