import React from 'react';
import { lazy } from "react";
import { Redirect } from "react-router-dom";

const MediciensAppConfig =  {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/mediciens",
            component: lazy(() => import("./medicienstable/Mediciens")),
        },
        {
            path: "/apps/add-mediciens",
            component: lazy(() => import("./mediciens-form/MediciensForm")),
        },
        {
            path: "/apps/add-mediciens",
            component: () => <Redirect to="/apps/add-mediciens" />,
        },
    ],
}

export default MediciensAppConfig;
