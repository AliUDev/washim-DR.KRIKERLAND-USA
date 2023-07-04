import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ICD10AppConfig = {
    settings: {
        layout: {},
    },
    routes:[
        {
            path:"/apps/icd10-diseases-table",
            component: lazy(() => import("./diseases-table/DiseasesTable")),
        },
        {
            path:"/apps/icd10-add-diseases",
            component: lazy(()=> import("./add-diseases/DiseasesForm") ),
        },
        {
            path:"/apps/icd10-diseases-table",
            component: () => <Redirect to="/apps/icd10-diseases-table"/>,
        },
    ],
};


export default ICD10AppConfig;