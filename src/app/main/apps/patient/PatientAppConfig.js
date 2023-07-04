import { lazy } from "react";
import { Redirect } from "react-router-dom";

const PatientAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/patient/:patientId/:productHandle?",
            component: lazy(() => import("./patient/Patient")),
        },
        {
            path: "/apps/patient",
            component: lazy(() => import("./patients/Patients")),
        },
        {
            path: "/apps/patient",
            component: () => <Redirect to="/apps/patient" />,
        },
    ],
};

export default PatientAppConfig;
