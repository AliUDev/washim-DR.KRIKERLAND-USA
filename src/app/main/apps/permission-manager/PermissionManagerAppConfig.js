import { lazy } from "react";
import { Redirect } from "react-router-dom";

const PermissionManagerAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: "/apps/permission-manager/:id",
            component: lazy(() => import("./PermissionManagerApp")),
        },
        {
            path: "/apps/permission-manager",
            component: () => <Redirect to="/apps/permission-manager/all" />,
        },
    ],
};

export default PermissionManagerAppConfig;
