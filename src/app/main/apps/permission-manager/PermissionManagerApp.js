import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import PermissionManagerDialog from "./PermissionManagerDialog";
import PermissionManagerHeader from "./PermissionManagerHeader";
import PermissionManagerList from "./PermissionManagerList";
import RoleManagerSidebarContent from "./RoleManagerSidebarContent";
import reducer from "./store";
import { getContacts } from "./store/contactsSlice";
import { getUserData } from "./store/userSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
        minHeight: 72,
        height: 72,
        [theme.breakpoints.up("lg")]: {
            minHeight: 136,
            height: 136,
        },
    },
    "& .FusePageSimple-wrapper": {
        minHeight: 0,
    },
    "& .FusePageSimple-contentWrapper": {
        padding: 0,
        [theme.breakpoints.up("sm")]: {
            padding: 24,
            height: "100%",
        },
    },
    "& .FusePageSimple-content": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    "& .FusePageSimple-sidebar": {
        width: 256,
        border: 0,
    },
}));

function PermissionManagerApp(props) {
    const dispatch = useDispatch();

    const pageLayout = useRef(null);
    const routeParams = useParams();

    useDeepCompareEffect(() => {
        dispatch(getContacts(routeParams));
        dispatch(getUserData());
    }, [dispatch, routeParams]);

    return (
        <>
            <Root
                header={<PermissionManagerHeader pageLayout={pageLayout} />}
                content={<PermissionManagerList />}
                // leftSidebarContent={<RoleManagerSidebarContent />}
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            <PermissionManagerDialog />
        </>
    );
}

export default withReducer("contactsApp", reducer)(PermissionManagerApp);
