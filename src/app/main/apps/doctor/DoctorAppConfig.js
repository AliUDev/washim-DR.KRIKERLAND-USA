import { lazy } from "react";
import { Redirect } from "react-router-dom";

const DoctorAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/doctor/:doctorId/:productHandle?",
            component: lazy(() => import("./doctor/Doctor")),
        },
        {
            path: "/apps/doctor",
            component: lazy(() => import("./doctors/Doctors")),
        },
        {
            path: "/apps/doctor",
            component: () => <Redirect to="/apps/doctor" />,
        },
    ],
};

export default DoctorAppConfig;
