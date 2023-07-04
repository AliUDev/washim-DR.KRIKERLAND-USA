import { lazy } from "react";
import { Redirect } from "react-router-dom";

const RoleManagerAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: "/apps/role-manager/:id",
            component: lazy(() => import("./RollManagerApp")),
        },
        {
            path: "/apps/role-manager",
            component: () => <Redirect to="/apps/role-manager/all" />,
        },
    ],
};

export default RoleManagerAppConfig;
