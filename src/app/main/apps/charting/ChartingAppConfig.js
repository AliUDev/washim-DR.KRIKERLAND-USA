import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ChartingAppConfig = {
    settings: {
        layout: {},
    },
    routes:[
        {
            path: "/apps/charting",
            component: lazy(() => import("./charting-main/Charting")),
        },
        {
            path: "/apps/charting",
            component: () => <Redirect to="/apps/Charting" />,
        },
    ], 
};


export default ChartingAppConfig;