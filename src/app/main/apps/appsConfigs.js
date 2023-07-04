import AcademyAppConfig from "./academy/AcademyAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import AnalyticsDashboardAppConfig from "./dashboards/analytics/AnalyticsDashboardAppConfig";
import ProjectDashboardAppConfig from "./dashboards/project/ProjectDashboardAppConfig";
import ECommerceAppConfig from "./e-commerce/ECommerceAppConfig";
import DoctorAppConfig from "./doctor/DoctorAppConfig";
import RoleManagerAppConfig from "./role-manager/RoleManagerAppConfig";
import PermissionManagerAppConfig from "./permission-manager/PermissionManagerAppConfig";
import PatientAppConfig from "./patient/PatientAppConfig";
import FileManagerAppConfig from "./file-manager/FileManagerAppConfig";
import MailAppConfig from "./mail/MailAppConfig";
import NotesAppConfig from "./notes/NotesAppConfig";
import ScrumboardAppConfig from "./scrumboard/ScrumboardAppConfig";
import TodoAppConfig from "./todo/TodoAppConfig";
import ICD10AppConfig from "./icd10/ICD10AppConfig";
import ChartingAppConfig from "./charting/ChartingAppConfig";
import MediciensAppConfig from "./Mediciens/MediciensAppConfig";

const appsConfigs = [
    DoctorAppConfig,
    PatientAppConfig,
    RoleManagerAppConfig,
    PermissionManagerAppConfig,
    AnalyticsDashboardAppConfig,
    ProjectDashboardAppConfig,
    MailAppConfig,
    TodoAppConfig,
    FileManagerAppConfig,
    ContactsAppConfig,
    CalendarAppConfig,
    ChatAppConfig,
    ECommerceAppConfig,
    ScrumboardAppConfig,
    AcademyAppConfig,
    NotesAppConfig,
    ICD10AppConfig,
    ChartingAppConfig,
    MediciensAppConfig,
];

export default appsConfigs;
