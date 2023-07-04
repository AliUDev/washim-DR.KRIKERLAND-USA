import React from 'react'
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import  diseases from "../store/diseases"
// import { getProducts, selectProducts } from "../store/diseasesSlice";
import DiseasesTableHead from "./DiseasesTableHead"
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

  
function TablePaginationActions(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const rows =   [
    


    // FamilyPracticeClinic===================================================================
    
    // Abdominal Pain (ICD-9-CM 789.00 to 789.09 range)
    {
        "code": "R10.0",
        "dis": "Acute abdomen",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.10",
        "dis": "Upper abdominal pain, unspecified",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.11",
        "dis": "Right upper quadrant pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.12",
        "dis": "Left upper quadrant pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.13",
        "dis": "Epigastric pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.2",
        "dis": "Pelvic and perineal pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.30",
        "dis": "Lower abdominal pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.31",
        "dis": "Right lower quadrant pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.32",
        "dis": "Left lower quadrant pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.33",
        "dis": "Periumbilical pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.84",
        "dis": "Generalized abdominal pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R10.9",
        "dis": "Unspecified abdominal pain",
        "type": "FamilyPracticeClinic"
    },
 
    // Acute Respiratory Infections (ICD-9-CM 462, 465.9, 466.0)
 
    {
        "code": "J02.8",
        "dis": "Acute pharyngitis due to other specified organisms",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J02.0",
        "dis": "Streptococcal pharyngitis",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J02.9",
        "dis": "Acute pharyngitis, unspecified",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J06.9*",
        "dis": "Acute upper respiratory infection, unspecified",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.0",
        "dis": "Acute bronchitis due to Mycoplasma pneumoniae",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.1",
        "dis": "Acute bronchitis due to Hemophilus influenzae",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.2",
        "dis": "Acute bronchitis due to streptococcus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.3",
        "dis": "Acute bronchitis due to coxsackievirus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.4",
        "dis": "Acute bronchitis due to parainfluenza virus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.5",
        "dis": "Acute bronchitis due to respiratory syncytial virus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.6",
        "dis": "Acute bronchitis due to rhinovirus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.7",
        "dis": "Acute bronchitis due to echovirus",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.8",
        "dis": "Acute bronchitis due to other specified organisms",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "J20.9*",
        "dis": "Acute bronchitis, unspecified",
        "type": "FamilyPracticeClinic"
    },
 
    // Back and Neck Pain (Selected) (ICD-9-CM 723.1, 724.1, 724.2, 724.5)
    {
        "code": "M54.2 ",
        "dis": "Cervicalgia",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M54.5",
        "dis": "Low back pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M54.6",
        "dis": "Pain in thoracic spine",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M54.89",
        "dis": "Other dorsalgia",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M54.9* ",
        "dis": "Dorsalgia, unspecified",
        "type": "FamilyPracticeClinic"
    },
 
    // Chest Pain (ICD-9-CM 786.50 to 786.59 range)
 
    {
        "code": "R07.1 ",
        "dis": "Chest pain on breathing",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R07.2",
        "dis": "Precordial pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R07.81 ",
        "dis": "Pleurodynia",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R07.82",
        "dis": "Intercostal pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R07.89",
        "dis": "Other chest pain",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "R07.9*",
        "dis": "Chest pain, unspecified",
        "type": "FamilyPracticeClinic"
    },
 
    // Diabetes Mellitus w/o Complications Type 2 (ICD-9-CM 250.00)
 
    {
        "code": "E11.9",
        "dis": "Type 2 diabetes mellitus without complications",
        "type": "FamilyPracticeClinic"
    },
 
    // General Medical Examination (ICD-9-CM V70.0)
 
    {
        "code":"Z00.00 ",
        "dis": "Encounter for general adult medical exam without abnormal findings",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"Z00.01",
        "dis": "Encounter for general adult medical exam with abnormal findings",
        "type": "FamilyPracticeClinic"
    },
 
    // Headache (ICD-9-CM 784.0)
    {
        "code":"R51",
        "dis": "Headache",
        "type": "FamilyPracticeClinic"
    },
 
    // Hypertension (ICD-9-CM 401.9)
    {
        "code":"I10",
        "dis": "Essential (primary) hypertension",
        "type": "FamilyPracticeClinic"
    },
 
    // Pain in Joint (ICD-9-CM 719.40 to 719.49 range)
 
    {
        "code":"M25.511",
        "dis": "Pain in right shoulder",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.512 ",
        "dis": "Pain in left shoulder",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.519*",
        "dis": "Pain in unspecified shoulder",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.521",
        "dis": "Pain in right elbow",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.522",
        "dis": "Pain in left elbow",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.529",
        "dis":" Pain in unspecified elbow",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.531",
        "dis": "Pain in right wrist",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M25.532",
        "dis": "Pain in left wrist",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "M25.539*",
        "dis": "Pain in unspecified wrist",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.551 ",
        "dis": "Pain in right hip",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.552",
        "dis": "Pain in left hip",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.559* ",
        "dis": "Pain in unspecified hip",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.561 ",
        "dis": "Pain in right knee",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.562 ",
        "dis": "Pain in left knee",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.569* ",
        "dis": "Pain in unspecified knee",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.571",
        "dis": "Pain in right ankle and joints of right foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.572",
        "dis": "Pain in left ankle and joints of left foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.579*",
        "dis": "Pain in unspecified ankle and joints of unspecified foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M25.50*",
        "dis": "Pain in unspecified joint",
        "type": "FamilyPracticeClinic"
    },
 
    // Pain in Limb (ICD-9-CM 729.5)
    {
        "code":"M79.601",
        "dis": "Pain in right arm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.602",
        "dis": "Pain in left arm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.603",
        "dis": "Pain in arm, unspecified",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.604",
        "dis": "Pain in right leg",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.605",
        "dis": "Pain in left leg",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.606",
        "dis": "Pain in leg, unspecified",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.609",
        "dis": "Pain in unspecified limb",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.621",
        "dis": "Pain in right upper arm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.622",
        "dis": "Pain in left upper arm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.629",
        "dis": "Pain in unspecified upper arm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.631",
        "dis": "Pain in right forearm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.632",
        "dis": "Pain in left forearm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.639",
        "dis": "Pain in unspecified forearm",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.641",
        "dis": "Pain in right hand",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.642",
        "dis": "Pain in left hand",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.643",
        "dis": "Pain in unspecified hand",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.644",
        "dis": "Pain in right finger(s)",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.645",
        "dis": "Pain in left finger(s)",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.646",
        "dis": "Pain in unspecified finger(s)",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.651",
        "dis": "Pain in right thigh",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.652",
        "dis": "Pain in left thigh",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.659",
        "dis": "Pain in unspecified thigh",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.661",
        "dis": "Pain in right lower leg",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.662",
        "dis": "Pain in left lower leg",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.669",
        "dis": "Pain in unspecified lower leg",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.671",
        "dis": "Pain in right foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.672",
        "dis": "Pain in left foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.673",
        "dis": "Pain in unspecified foot",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.674",
        "dis": "Pain in right toe(s)",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.675",
        "dis": "Pain in left toe(s)",
        "type": "FamilyPracticeClinic"
    },
    {
        "code":"M79.676",
        "dis": "Pain in unspecified toe(s)",
        "type": "FamilyPracticeClinic"
    },
 
    // Other Forms Of Heart Disease (ICD-9-CM 427.31)
    {
        "code": "I48.0 " ,
        "dis" : "Paroxysmal atrial fibrillation",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "I48.2" ,
        "dis" : "Chronic atrial fibrillation",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "I48.91* " ,
        "dis" : "Unspecified atrial fibrillation",
        "type": "FamilyPracticeClinic"
    },
 
    // URINARY TRACT INFECTION, CYSTITIS (ICD-9-CM 595.0 TO 595.4
    // RANGE, 595.81, 595.82, 595.89, 595.9, 599.0)
 
 
    {
        "code": "N30.00 " ,
        "dis" : "Acute cystitis without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.01" ,
        "dis" : "Acute cystitis with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.10" ,
        "dis" : "Interstitial cystitis (chronic) without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.11" ,
        "dis" : "Interstitial cystitis (chronic) with hematuria ",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.20" ,
        "dis" : "Other chronic cystitis without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.21" ,
        "dis" : "Other chronic cystitis with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.30" ,
        "dis" : "Trigonitis without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.31" ,
        "dis" : "Trigonitis with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.40" ,
        "dis" : "Irradiation cystitis without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.41" ,
        "dis" : "Irradiation cystitis with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.80" ,
        "dis" : "Other cystitis without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.81" ,
        "dis" : "Other cystitis with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.90" ,
        "dis" : "Cystitis, unspecified without hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N30.91" ,
        "dis" : "Cystitis, unspecified with hematuria",
        "type": "FamilyPracticeClinic"
    },
    {
        "code": "N39.0*" ,
        "dis" : "Urinary tract infection, site not specified",
        "type": "FamilyPracticeClinic"
    },
   
 












     
    // Clinical Concepts for Cardiology----------------------------------------------------------
    
       // Abnormalities of Heart Rhythm (ICD-9-CM 427.81, 427.89, 785.0,785.1, 785.3)
       {
           "code": "R00.0 ",
           "dis" : "Tachycardia, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R00.1",
           "dis" : "Bradycardia, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R00.2 ",
           "dis" : "Palpitations",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R00.8 ",
           "dis" : "Other abnormalities of heart beat",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R00.9 ",
           "dis" : "Unspecified abnormalities of heart beat",
           "type": "Clinical Concepts for Cardiology"
       },
       // Atrial Fibrillation and Flutter (ICD-9-CM 427.31, 427.32)
       {
           "code": "I48.0 ",
           "dis" : "Paroxysmal atrial fibrillation",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.1",
           "dis" : "Persistent atrial fibrillation",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.2",
           "dis" : "Chronic atrial fibrillation",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.3",
           "dis" : "Typical atrial flutter",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.4",
           "dis" : "Atypical atrial flutter",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.91",
           "dis" : "Unspecified atrial fibrillation",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I48.92",
           "dis" : "Unspecified atrial flutter",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // Cardiac Arrhythmias (Other) (ICD-9-CM 427.41, 427.42, 427.60,427.61, 427.69, 427.81, 427.89, 427.9)
       {
           "code": "I49.01",
           "dis" : "Ventricular fibrillation",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.02",
           "dis" : "Ventricular flutter",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.1",
           "dis" : "Atrial premature depolarization",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.2",
           "dis" : "Junctional premature depolarization",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.3",
           "dis" : "Ventricular premature depolarization",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.40",
           "dis" : "Unspecified premature depolarization",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.49",
           "dis" : "Other premature depolarization",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.5",
           "dis" : "Sick sinus syndrome",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.8",
           "dis" : "Other specified cardiac arrhythmias",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I49.9",
           "dis" : "Cardiac arrhythmia, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // Chest Pain (ICD-9-CM 411.1, 413.1, 413.9, 786.50 to 786.59 Range)
    
       {
           "code": "I20.0 ",
           "dis" : "Unstable angina",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I20.1",
           "dis" : "Angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I20.9",
           "dis" : "Other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I20.9",
           "dis" : "Angina pectoris, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.1",
           "dis" : "Chest pain on breathing",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.2",
           "dis" : "Precordial pain",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.81",
           "dis" : "Pleurodynia",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.82",
           "dis" : "Intercostal pain",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.89",
           "dis" : "Other chest pain",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "R07.9* ",
           "dis" : "Chest pain, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
       // Heart Failure (ICD-9-CM 428.0, 428.1, 428.20 to 428.23 Range,428.30 TO 428.33 Range, 428.40 TO 428.43 Range, 428.9)
       {
           "code": "I50.1",
           "dis" : "Left ventricular failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.20",
           "dis" : "Unspecified systolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.21 ",
           "dis" : "Acute systolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.22",
           "dis" : "Chronic systolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.23",
           "dis" : "Acute on chronic systolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.30*",
           "dis" : "Unspecified diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.31",
           "dis" : "Acute diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.32",
           "dis" : "Chronic diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.33",
           "dis" : "Acute on chronic diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.40",
           "dis" : "Unspecified combined systolic (congestive) and diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.41",
           "dis" : "Acute combined systolic (congestive) and diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.42",
           "dis" : "Chronic combined systolic (congestive) and diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.43",
           "dis" : "Acute on chronic combined systolic (congestive) and diastolic (congestive) heart failure",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I50.9*",
           "dis" : "Heart failure, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // Hypertension (ICD-9-CM 401.9)
    
       {
           "code": "I10",
           "dis" : "Essential (primary) hypertension",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // --> Main == Nonrheumatic Valve Disorders
    
    
       // 1. Aortic Valve Disorders (ICD-9-CM 424.1)
       {
           "code": "I35.0",
           "dis" : "Nonrheumatic aortic (valve) stenosis",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I35.1",
           "dis" : "Nonrheumatic aortic (valve) insufficiency",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I35.2",
           "dis" : "Nonrheumatic aortic (valve) stenosis with insufficiency",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I35.8",
           "dis" : "Other nonrheumatic aortic valve disorders",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I35.9",
           "dis" : "Nonrheumatic aortic valve disorder, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // 2. Mitral Valve Disorders (ICD-9-CM 424.0)
       {
           "code": "I34.0 ",
           "dis" : "Nonrheumatic mitral (valve) insufficiency",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I34.1",
           "dis" : "Nonrheumatic mitral (valve) prolapse",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I34.2",
           "dis" : "Nonrheumatic mitral (valve) stenosis",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I34.8",
           "dis" : "Other nonrheumatic mitral valve disorders",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I34.9",
           "dis" : "Nonrheumatic mitral valve disorder, unspecified",
           "type": "Clinical Concepts for Cardiology"
       }, // End
    
       // Selected Atherosclerosis, Ischemia, and Infarction (ICD-9-CM 410.00 to 410.92 Range, 411.1, 412, 413.0, 413.1, 413.9, 414.00 to 414.07 Range, 414.10, 414.11, 414.12, 414.19, 414.2, 414.3, 414.4, 414.8, 414.9, 429.2, 429.5, 429.6, 429.71, 429.79)
       {
           "code": "I21.01 ",
           "dis" : "ST elevation (STEMI) myocardial infarction involving left main coronary artery",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.02",
           "dis" : "ST elevation (STEMI) myocardial infarction involving left anterior descending coronary artery",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.09",
           "dis" : "ST elevation (STEMI) myocardial infarction involving other coronary artery of anterior wall",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.11 ",
           "dis" : "ST elevation (STEMI) myocardial infarction involving right coronary artery",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.19",
           "dis" : "ST elevation (STEMI) myocardial infarction involving other coronary artery of inferior wall",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.21",
           "dis" : "ST elevation (STEMI) myocardial infarction involving left circumflex coronary artery",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.29",
           "dis" : "ST elevation (STEMI) myocardial infarction involving other sites",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.3 ",
           "dis" : "ST elevation (STEMI) myocardial infarction of unspecified site",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I21.4",
           "dis" : "Non-ST elevation (NSTEMI) myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I22.0 ",
           "dis" : "Subsequent ST elevation (STEMI) myocardial infarction of anterior wall",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I22.1",
           "dis" : "Subsequent ST elevation (STEMI) myocardial infarction of inferior wall",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I22.2",
           "dis" : "Subsequent non-ST elevation (NSTEMI) myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I22.8",
           "dis" : "Subsequent ST elevation (STEMI) myocardial infarction of other sites",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I22.9",
           "dis" : "Subsequent ST elevation (STEMI) myocardial infarction of unspecified site",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.0 ",
           "dis" : "Hemopericardium as current complication following acute  myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.1",
           "dis" : "Atrial septal defect as current complication following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.2",
           "dis" : "Ventricular septal defect as current complication following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.3",
           "dis" : "Rupture of cardiac wall without hemopericardium as current complication following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.4",
           "dis" : "Rupture of chordae tendineae as current complication following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.5",
           "dis" : "Rupture of papillary muscle as current complication following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.6",
           "dis" : "Thrombosis of atrium, auricular appendage, and ventricle as current complications following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
    
       // Selected Atherosclerosis, Ischemia, and Infarction (ICD-9-CM 410.00 to 410.92 Range, 411.1, 412, 413.0, 413.1, 413.9, 414.00 to 414.07 Range, 414.10, 414.11, 414.12, 414.19, 414.2, 414.3, 414.4, 414.8, 414.9, 429.2, 429.5, 429.6, 429.71, 429.79) (continued)
       {
           "code": "I23.7",
           "dis" : "Postinfarction angina",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I23.8",
           "dis" : "Other current complications following acute myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.10 ",
           "dis" : "Atherosclerotic heart disease of native coronary artery without angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.110",
           "dis" : "Atherosclerotic heart disease of native coronary artery with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.111",
           "dis" : "Atherosclerotic heart disease of native coronary artery with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.118",
           "dis" : "Atherosclerotic heart disease of native coronary artery with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.119",
           "dis" : "Atherosclerotic heart disease of native coronary artery with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.2",
           "dis" : "Old myocardial infarction",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.3",
           "dis" : "Aneurysm of heart",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.41",
           "dis" : "Coronary artery aneurysm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.42",
           "dis" : "Coronary artery dissection",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.5",
           "dis" : "Ischemic cardiomyopathy",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.6",
           "dis" : "Silent myocardial ischemia",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.700*",
           "dis" : "Atherosclerosis of coronary artery bypass graft(s), unspecified, with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.701",
           "dis" : "Atherosclerosis of coronary artery bypass graft(s), unspecified, with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.708",
           "dis" : "Atherosclerosis of coronary artery bypass graft(s), unspecified, with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.709",
           "dis" : "Atherosclerosis of coronary artery bypass graft(s), unspecified, with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.710",
           "dis" : "Atherosclerosis of autologous vein coronary artery bypass graft(s) with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.711",
           "dis" : "Atherosclerosis of autologous vein coronary artery bypass graft(s) with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.718",
           "dis" : "Atherosclerosis of autologous vein coronary artery bypass graft(s) with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       // Selected Atherosclerosis, Ischemia, and Infarction (ICD-9-CM 410.00 to 410.92 Range, 411.1, 412, 413.0, 413.1, 413.9, 414.00 To 414.07 Range, 414.10, 414.11, 414.12, 414.19, 414.2, 414.3, 414.4, 414.8, 414.9, 429.2, 429.5, 429.6, 429.71, 429.79) (continued)
       {
           "code": "I25.719* ",
           "dis" : "Atherosclerosis of autologous vein coronary artery bypass graft(s) with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.720",
           "dis" : "Atherosclerosis of autologous artery coronary artery bypass graft(s) with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.721",
           "dis" : "Atherosclerosis of autologous artery coronary artery bypass graft(s) with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.728",
           "dis" : "Atherosclerosis of autologous artery coronary artery bypass graft(s) with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.729",
           "dis" : "Atherosclerosis of autologous artery coronary artery bypass graft(s) with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
        },
       {
           "code": "I25.730",
           "dis" : "Atherosclerosis of nonautologous biological coronary artery bypass graft(s) with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.731",
           "dis" : "Atherosclerosis of nonautologous biological coronary artery bypass graft(s) with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.738",
           "dis" : "Atherosclerosis of nonautologous biological coronary artery bypass graft(s) with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.739",
           "dis" : "Atherosclerosis of nonautologous biological coronary artery bypass graft(s) with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.750",
           "dis" : "Atherosclerosis of native coronary artery of transplanted heart with unstable angina",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.751",
           "dis" : "Atherosclerosis of native coronary artery of transplanted heart with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.758",
           "dis" : "Atherosclerosis of native coronary artery of transplanted heart with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.759",
           "dis" : "Atherosclerosis of native coronary artery of transplanted heart with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.760",
           "dis" : "Atherosclerosis of bypass graft of coronary artery of transplanted heart with unstable angina",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.761",
           "dis" : "Atherosclerosis of bypass graft of coronary artery of transplanted heart  with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.768",
           "dis" : "Atherosclerosis of bypass graft of coronary artery of transplanted heart with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       // Selected Atherosclerosis, Ischemia, and Infarction (ICD-9-CM 410.00 to 410.92 Range, 411.1, 412, 413.0, 413.1, 413.9, 414.00 To 414.07 Range, 414.10, 414.11, 414.12, 414.19, 414.2, 414.3, 414.4, 414.8, 414.9, 429.2, 429.5, 429.6, 429.71, 429.79) (continued)
       {
           "code": "I25.769*",
           "dis" : "Atherosclerosis of bypass graft of coronary artery of transplanted heart with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.790",
           "dis" : "Atherosclerosis of other coronary artery bypass graft(s) with unstable angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.791",
           "dis" : "Atherosclerosis of other coronary artery bypass graft(s) with angina pectoris with documented spasm",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.798",
           "dis" : "Atherosclerosis of other coronary artery bypass graft(s) with other forms of angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.799",
           "dis" : "Atherosclerosis of other coronary artery bypass graft(s) with unspecified angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.810",
           "dis" : "Atherosclerosis of coronary artery bypass graft(s) without angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.811",
           "dis" : "Atherosclerosis of native coronary artery of transplanted heart without angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.812",
           "dis" : "Atherosclerosis of bypass graft of coronary artery of transplanted heart without angina pectoris",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.82 ",
           "dis" : "Chronic total occlusion of coronary artery",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.83",
           "dis" : "Coronary atherosclerosis due to lipid rich plaque",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.84",
           "dis" : "Coronary atherosclerosis due to calcified coronary lesion",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.89",
           "dis" : "Other forms of chronic ischemic heart disease",
           "type": "Clinical Concepts for Cardiology"
       },
       {
           "code": "I25.9*",
           "dis" : "Chronic ischemic heart disease, unspecified",
           "type": "Clinical Concepts for Cardiology"
       },
       // Syncope and Collapse (ICD-9-CM 780.2)
       {
           "code": "R55 ",
           "dis" : "Syncope and collapse",
           "type": "Clinical Concepts for Cardiology"
       },
    
























    
    
    
    //    "Clinical Concepts for OB/GYN"-----------------------------------------------------------
    
       // Abnormal Female Genital Cytology (Excluding Neoplasia and Malignancy Codes) (ICD-9-CM 622.10, 622.11, 622.12, 792.9, 795.01 to 795.19 range, 795.4)
       {
           "code": "R87.610",
           "dis": "Atypical squamous cells of undetermined significance on cytologic smear of cervix (ASC-US)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.611",
           "dis": "Atypical squamous cells cannot exclude high grade squamous intraepithe- lial lesion on cytologic smear of cervix (ASC-H)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.612",
           "dis": "Low grade squamous intraepithelial lesion on cytologic smear of cervix (LGSIL)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.613",
           "dis": "High grade squamous intraepithelial lesion on cytologic smear of cervix (HGSIL)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.615",
           "dis": "Unsatisfactory cytologic smear of cervix",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.616",
           "dis": "Satisfactory cervical smear but lacking transformation zone",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.618",
           "dis": "Other abnormal cytological findings on specimens from cervix uteri",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.619",
           "dis": "Unspecified abnormal cytological findings in specimens from cervix uteri",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.620",
           "dis": "Atypical squamous cells of undetermined significance on cytologic smear of vagina (ASC-US)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.621",
           "dis": "Atypical squamous cells cannot exclude high grade squamous intraepithe-lial lesion on cytologic smear of vagina (ASC-H)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.622",
           "dis": "Low grade squamous intraepithelial lesion on cytologic smear of vagina (LGSIL)",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.623",
           "dis": "High grade squamous intraepithelial lesion on cytologic smear of vagina (HGSIL",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.625",
           "dis": "Unsatisfactory cytologic smear of vagina",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.628",
           "dis": "Other abnormal cytological findings on specimens from vagina",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.629",
           "dis": "Unspecified abnormal cytological findings in specimens from vagina",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.69",
           "dis": "Abnormal cytological findings in specimens from other female genital organs",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N87.0 ",
           "dis": "Mild cervical dysplasia",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N87.1",
           "dis": "Moderate cervical dysplasia",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N87.9",
           "dis": " Dysplasia of cervix uteri, unspecified",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.810",
           "dis": "Cervical high risk human papillomavirus (HPV) DNA test positive",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.811",
           "dis": "Vaginal high risk human papillomavirus (HPV) DNA test positive",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.820",
           "dis": "Cervical low risk human papillomavirus (HPV) DNA test positive",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "R87.821",
           "dis": "Vaginal low risk human papillomavirus (HPV) DNA test positive",
           "type": "Clinical Concepts for OB/GYN"
       },
    
    
       // Excessive, Frequent and Irregular Menstruation (ICD-9-CM 626.2 To 626.6 Range, 627.0 
    
       {
           "code": "N92.0 ",
           "dis": "Excessive and frequent menstruation with regular cycle",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.1",
           "dis": "Excessive and frequent menstruation with irregular cycle",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.2",
           "dis": "Excessive menstruation at puberty",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.3",
           "dis": "Ovulation bleeding",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.4",
           "dis": "Excessive bleeding in the premenopausal period",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.5",
           "dis": "Other specified irregular menstruation",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N92.6",
           "dis": " Irregular menstruation, unspecified",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // General Medical and Gynecological Examinations ICD-9-CM V70.0, V72.31, V72.32 (Excluding Contraceptive and Procreative Codes
       {
           "code": "Z00.00",
           "dis": "Encounter for general adult medical exam without abnormal findings",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z00.01",
           "dis": "Encounter for general adult medical exam with abnormal findings",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z01.411",
           "dis": "Encounter for gynecological examination (general) (routine) with abnormal findings",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z01.419",
           "dis": "Encounterfor gynecological examination (general) (routine) without abnormal findings",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z01.42",
           "dis": " Encounter for cervical smear to confirm findings of recent normal smear following initial abnormal smear",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // Hypertension ICD-9-CM 401.9
       
       {
           "code": "I10",
           "dis": "Essential (primary) hypertension",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       {
           "code": "N76.0",
           "dis": "Acute vaginitis",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.1",
           "dis": "Subacute and chronic vaginitis",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.2",
           "dis": "Acute vulvitis",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.3",
           "dis": "Subacute and chronic vulvitis",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.4",
           "dis": "Abscess of vulva",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.5",
           "dis": "Ulceration of vagina",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.6",
           "dis": "Ulceration of vulva",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.81",
           "dis": "Mucositis (ulcerative) of vagina and vulva",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N76.89",
           "dis": "Other specified inflammation of vagina and vulva",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // Lump in Breast and Other Disorders of the Breast (ICD-9-CM 611.2, 611.3,611.4, 611.5, 611.6, 611.71 to 611.79 range, 611.81 To 611.89 range, 611.9)
       {
           "code": "N63*",
           "dis": "Unspecified lump in breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.0",
           "dis": "Fissure and fistula of nipple",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.1",
           "dis": "Fat necrosis of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.2",
           "dis": "Atrophy of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.3",
           "dis": "Galactorrhea not associated with childbirth",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.4",
           "dis": "Mastodynia",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.51",
           "dis": "Induration of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.52",
           "dis": "Nipple discharge",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.53",
           "dis": "Retraction of nipple",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.59",
           "dis": "Other signs and symptoms in breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.81",
           "dis": "Ptosis of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.82",
           "dis": "Hypoplasia of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.89",
           "dis": "Other specified disorders of breast",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N64.9",
           "dis": "Disorder of breast, unspecified",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // Selected Menopausal and Other Perimenopausal Disorders (ICD-9-CM 627.0 to 627.9 range) (Excluding Post-menopausal Osteoporosis and Urethritis Codes)
    
       {
           "code": "N92.4 ",
           "dis": "Excessive bleeding in the premenopausal period",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N95.0",
           "dis": "Postmenopausal bleeding",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N95.1",
           "dis": "Menopausal and female climacteric states",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N95.2",
           "dis": "Postmenopausal atrophic vaginitis",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N95.8",
           "dis": "Other specified menopausal and perimenopausal disorders",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N95.9",
           "dis": "Unspecified menopausal and perimenopausal disorder",
           "type": "Clinical Concepts for OB/GYN"
       },
       // Noninflammatory Disorders of Ovary, Fallopian Tubes, and Broadligament (ICD-9-CM 620.0 to 620.9 range)
       {
           "code": "N83.0 ",
           "dis": "Follicular cyst of ovary",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.1",
           "dis": "Corpus luteum cyst",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.20",
           "dis": "Unspecified ovarian cysts",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.29",
           "dis": "Other ovarian cysts",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.31",
           "dis": "Acquired atrophy of ovary",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.32",
           "dis": "Acquired atrophy of fallopian tube",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.33",
           "dis": "Acquired atrophy of ovary and fallopian tube",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.4",
           "dis": "Prolapse and hernia of ovary and fallopian tube",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.51",
           "dis": "Torsion of ovary and ovarian pedicle",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.52",
           "dis": "Torsion of fallopian tube",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.53",
           "dis": "Torsion of ovary, ovarian pedicle and fallopian tube",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.6",
           "dis": "Hematosalpinx",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.7",
           "dis": "Hematoma of broad ligament",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.8",
           "dis": "Other noninflammatory disorders of ovary, fallopian tube & broad ligament",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N83.9",
           "dis": "Noninflammatory disorder of ovary, fallopian tube and broad ligament,unspecified",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // Supervision of Normal Pregnancy (ICD-9-CM V22.0, V22.1, V22.2)
       {
           "code": "Z34.00*",
           "dis": "Encounter for supervision of normal first pregnancy, unspecified trimester"
       },
       {
           "code": "Z34.01",
           "dis": " Encounter for supervision of normal first pregnancy, first trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.02",
           "dis": " Encounter for supervision of normal first pregnancy, second trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.03",
           "dis": " Encounter for supervision of normal first pregnancy, third trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.80",
           "dis": " Encounter for supervision of other normal pregnancy, unspecified trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.81",
           "dis": "Encounter for supervision of other normal pregnancy, first trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.82",
           "dis": "Encounter for supervision of other normal pregnancy, second trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.83",
           "dis": "Encounter for supervision of other normal pregnancy, third trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.90",
           "dis": "Encounter for supervision of normal pregnancy, unspecified, unspecified trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.91",
           "dis": "Encounter for supervision of normal pregnancy, unspecified, first trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.92",
           "dis": "Encounter for supervision of normal pregnancy, unspecified, second trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "Z34.93",
           "dis": "Encounter for supervision of normal pregnancy, unspecified, third trimester",
           "type": "Clinical Concepts for OB/GYN"
       },
    
       // Urinary Tract Infection, Cystitis (ICD-9-CM 599.0, 595.0, 595.1,595.2, 595.3, 595.4, 595.5, 595.81, 595.82, 595.89)
       {
           "code": "N30.00",
           "dis": "Acute cystitis without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.01",
           "dis": "Acute cystitis with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.10",
           "dis": "Interstitial cystitis (chronic) without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.11",
           "dis": "Interstitial cystitis (chronic) with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.20",
           "dis": "Other chronic cystitis without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.21",
           "dis": "Other chronic cystitis with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.30",
           "dis": "Trigonitis without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.31",
           "dis": "Trigonitis with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.40",
           "dis": "Irradiation cystitis without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.41",
           "dis": "Irradiation cystitis with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.80",
           "dis": "Other cystitis without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.81",
           "dis": "Other cystitis with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.90",
           "dis": "Cystitis, unspecified without hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N30.91",
           "dis": "Cystitis, unspecified with hematuria",
           "type": "Clinical Concepts for OB/GYN"
       },
       {
           "code": "N39.0",
           "dis": " Urinary tract infection, site not specified",
           "type": "Clinical Concepts for OB/GYN"
       },
    
    









    //    "Clinical Concepts for Orthopedics"---------==============================================
       // Cervical Spine Disorders and Displacement(ICD-9-CM 722.0, 722.4, 722.71, 722.91, 723.4)
       {
           "code": "M50.00*",
           "dis": "Cervical disc disorder with myelopathy, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.01",
           "dis": "Cervical disc disorder with myelopathy, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.02",
           "dis": " Cervical disc disorder with myelopathy, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.03",
           "dis": "Cervical disc disorder with myelopathy, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.10",
           "dis": " Cervical disc disorder with radiculopathy, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.11",
           "dis": "Cervical disc disorder with radiculopathy, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.12",
           "dis": " Cervical disc disorder with radiculopathy, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.13",
           "dis": "Cervical disc disorder with radiculopathy, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.20",
           "dis": "Other cervical disc displacement, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.21",
           "dis": "Other cervical disc displacement, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.22",
           "dis": "Other cervical disc displacement, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.23",
           "dis": " Other cervical disc displacement, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.30",
           "dis": "Other cervical disc degeneration, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.31",
           "dis": "Other cervical disc degeneration, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.32",
           "dis": "Other cervical disc degeneration, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.33",
           "dis": "Other cervical disc degeneration, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.80",
           "dis": "Other cervical disc disorders, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.81",
           "dis": "Other cervical disc disorders, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M5082",
           "dis": "Other cervical disc disorders, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.83",
           "dis": "Other cervical disc disorders, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.90",
           "dis": "Cervical disc disorder, unspecified, unspecified cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.91",
           "dis": "Cervical disc disorder, unspecified, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.92",
           "dis": "Cervical disc disorder, unspecified, mid-cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M50.93",
           "dis": "Cervical disc disorder, unspecified, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Neck and Back Pain (ICD-9-CM 723.1, 724.1, 724.2, 724.3, 724.5)
       {
           "code": "M54.2",
           "dis": "Cervicalgia",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.30",
           "dis": "Sciatica, unspecified side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.31",
           "dis": "Sciatica, right side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.32",
           "dis": "Sciatica, left side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.40",
           "dis": " Lumbago with sciatica, unspecified side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.41",
           "dis": " Lumbago with sciatica, right side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.42",
           "dis": " Lumbago with sciatica, left side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.5",
           "dis": "Low back pain",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.6",
           "dis": "Pain in thoracic spine",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.89",
           "dis": " Other dorsalgia",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.9",
           "dis": "Dorsalgia, unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Osteoarthritis of the Hip (ICD-9-CM 715.15, 715.25, 715.35, 715.95)
    
       {
           "code": "M16.0",
           "dis": "Bilateral primary osteoarthritis of hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.10",
           "dis": " Unilateral primary osteoarthritis, unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.11",
           "dis": " Unilateral primary osteoarthritis, right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.12",
           "dis": " Unilateral primary osteoarthritis, left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.2",
           "dis": "Bilateral osteoarthritis resulting from hip dysplasia",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.30",
           "dis": "Unilateral osteoarthritis resulting from hip dysplasia, unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.31",
           "dis": "Unilateral osteoarthritis resulting from hip dysplasia, right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.32",
           "dis": "Unilateral osteoarthritis resulting from hip dysplasia, left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.4",
           "dis": "Bilateral post-traumatic osteoarthritis of hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.50",
           "dis": "Unilateral post-traumatic osteoarthritis, unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.51",
           "dis": " Unilateral post-traumatic osteoarthritis, right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.52",
           "dis": " Unilateral post-traumatic osteoarthritis, left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.6",
           "dis": "Other bilateral secondary osteoarthritis of hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.7",
           "dis": "Other unilateral secondary osteoarthritis of hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M16.9",
           "dis": "Osteoarthritis of hip, unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
       // Osteoarthritis of the Knee (ICD-9-CM 715.16, 715.26, 715.36, 715.96)
       {
           "code": "M17.0",
           "dis": "Bilateral primary osteoarthritis of knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.10",
           "dis": "Unilateral primary osteoarthritis, unspecified knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.11",
           "dis": "Unilateral primary osteoarthritis, right knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.12",
           "dis": "Unilateral primary osteoarthritis, left knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.2",
           "dis": "Bilateral post-traumatic osteoarthritis of knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.30",
           "dis": " Unilateral post-traumatic osteoarthritis, unspecified knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.31",
           "dis": "Unilateral post-traumatic osteoarthritis, right knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.32",
           "dis": "Unilateral post-traumatic osteoarthritis, left knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.4",
           "dis": "Other bilateral secondary osteoarthritis of knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M17.5",
           "dis": "Other unilateral secondary osteoarthritis of knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M1.9",
           "dis": "Osteoarthritis of knee, unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
       // Radiculopathy (Primary) (ICD-9-CM 723.4, 724.3, 724.4, 729.2)
    
       {
           "code": "M54.10*",
           "dis": "Radiculopathy, site unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.11",
           "dis": " Radiculopathy, occipito-atlanto-axial region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.12",
           "dis": "Radiculopathy, cervical region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.13",
           "dis": " Radiculopathy, cervicothoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.14",
           "dis": "Radiculopathy, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.15",
           "dis": "Radiculopathy, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.16",
           "dis": "Radiculopathy, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.17",
           "dis": "Radiculopathy, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.18",
           "dis": " Radiculopathy, sacral and sacrococcygeal region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.30",
           "dis": " Sciatica, unspecified side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.31",
           "dis": " Sciatica, right side",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M54.32",
           "dis": "Sciatica, left side"
       },
       // Rheumatoid Arthritis (ICD-9-CM 714.0, 714.2) Excludes Combination Codes that Include Neuropathy, Bursitis and Nodule Codes, and the Codes that Indicate “Unspecified Site”.
       {
           "code": "M05.611",
           "dis": "Rheumatoid arthritis of right shoulder with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.612",
           "dis": "Rheumatoid arthritis of left shoulder with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.619*",
           "dis": " Rheumatoid arthritis of unspecified shoulder with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.621",
           "dis": " Rheumatoid arthritis of right elbow with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.622",
           "dis": "Rheumatoid arthritis of left elbow with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.629",
           "dis": " Rheumatoid arthritis of unspecified elbow with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.631",
           "dis": "Rheumatoid arthritis of right wrist with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.632",
           "dis": "Rheumatoid arthritis of left wrist with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.639",
           "dis": "Rheumatoid arthritis of unspecified wrist with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.641",
           "dis": "Rheumatoid arthritis of right hand with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.642",
           "dis": "Rheumatoid arthritis of left hand with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.649",
           "dis": "Rheumatoid arthritis of unspecified hand with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.651",
           "dis": "Rheumatoid arthritis of right hip with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.652",
           "dis": "Rheumatoid arthritis of left hip with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.59",
           "dis": "Rheumatoid arthritis of unspecified hip with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.661",
           "dis": "Rheumatoid arthritis of right knee with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
    
       // Rheumatoid Arthritis ICD-9-CM 714.0, 714.2 Excludes Combination Codes that Include Neuropathy, Bursitis and Nodule Codes, and the Codes that Indicte “Unspecified Site” continued
    
       {
           "code": "M05.662",
           "dis": "Rheumatoid arthritis of left knee with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.669*",
           "dis": "Rheumatoid arthritis of unspecified knee with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.671",
           "dis": " Rheumatoid arthritis of right ankle and foot with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.672",
           "dis": "Rheumatoid arthritis of left ankle and foot with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.679*",
           "dis": "Rheumatoid arthritis of unspecified ankle and foot with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.69",
           "dis": "Rheumatoid arthritis of multiple sites with involvement of other organs and systems",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.711",
           "dis": "Rheumatoid arthritis with rheumatoid factor of right shoulder without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.712",
           "dis": " Rheumatoid arthritis with rheumatoid factor of left shoulder without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.719",
           "dis": " Rheumatoid arthritis with rheumatoid factor of unspecified shoulder without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.721",
           "dis": "Rheumatoid arthritis with rheumatoid factor of right elbow without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.722",
           "dis": " Rheumatoid arthritis with rheumatoid factor of left elbow without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.729",
           "dis": "Rheumatoid arthritis with rheumatoid factor of unspecified elbow without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.731",
           "dis": "Rheumatoid arthritis with rheumatoid factor of right wrist without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.732",
           "dis": "Rheumatoid arthritis with rheumatoid factor of left wrist without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.739",
           "dis": "Rheumatoid arthritis with rheumatoid factor of unspecified wrist without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.741",
           "dis": "Rheumatoid arthritis with rheumatoid factor of right hand without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Rheumatoid Arthritis (ICD-9-CM 714.0, 714.2) Excludes Combination Codes that Include Neuropathy, Bursitis and Nodule Codes, and the Codes that Indicate “Unspecified Site”. (continued)
    
       {
           "code": "M05.742",
           "dis": "Rheumatoid arthritis with rheumatoid factor of left hand without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.749",
           "dis": " Rheumatoid arthritis with rheumatoid factor of unspecified hand without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.751",
           "dis": "Rheumatoid arthritis with rheumatoid factor of right hip without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.752",
           "dis": " Rheumatoid arthritis with rheumatoid factor of left hip without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.759",
           "dis": "Rheumatoid arthritis with rheumatoid factor of unspecified hip without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.761",
           "dis": " Rheumatoid arthritis with rheumatoid factor of right knee without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.762",
           "dis": " Rheumatoid arthritis with rheumatoid factor of left knee without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.769",
           "dis": "Rheumatoid arthritis with rheumatoid factor of unspecified knee without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.771",
           "dis": " Rheumatoid arthritis with rheumatoid factor of right ankle and foot without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.772",
           "dis": "Rheumatoid arthritis with rheumatoid factor of left ankle and foot without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.779",
           "dis": " Rheumatoid arthritis with rheumatoid factor of unspecified ankle and foot without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.79",
           "dis": "Rheumatoid arthritis with rheumatoid factor of multiple sites without organ or systems involvement",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.811",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.812",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.819",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.821",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of right elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.822",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of left elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.829",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of unspecified elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.831",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of right wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.832",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of left wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       // Rheumatoid Arthritis (ICD-9-CM 714.0, 714.2) Excludes Combination Codes that Include Neuropathy, Bursitis and Nodule Codes, and the Codes that Indicate “Unspecified Site”. (continued)
    
    
    
       {
           "code": "M05.839*",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of unspecified wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.841",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of right hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.842",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of left hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.849",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of unspecified hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.851",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.852",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.859",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.861",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of right knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.862",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of left knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.869",
           "dis": " Other rheumatoid arthritis with rheumatoid factor of unspecified knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.871",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of right ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.872",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of left ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.879",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of unspecified ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.89",
           "dis": "Other rheumatoid arthritis with rheumatoid factor of multiple sites",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M05.9",
           "dis": "Rheumatoid arthritis with rheumatoid factor, unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.00*",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified site",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.11",
           "dis": " Rheumatoid arthritis without rheumatoid factor, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.12",
           "dis": "Rheumatoid arthritis without rheumatoid factor, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.19",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.21",
           "dis": " Rheumatoid arthritis without rheumatoid factor, right elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.22",
           "dis": " Rheumatoid arthritis without rheumatoid factor, left elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.29",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.31",
           "dis": "Rheumatoid arthritis without rheumatoid factor, right wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.32",
           "dis": "Rheumatoid arthritis without rheumatoid factor, left wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.39",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.41",
           "dis": "Rheumatoid arthritis without rheumatoid factor, right hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.42",
           "dis": " Rheumatoid arthritis without rheumatoid factor, left hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.49",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.51",
           "dis": "Rheumatoid arthritis without rheumatoid factor, right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.52",
           "dis": "Rheumatoid arthritis without rheumatoid factor, left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.59",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.61",
           "dis": " Rheumatoid arthritis without rheumatoid factor, right knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Rheumatoid Arthritis (ICD-9-CM 714.0, 714.2) Excludes Combination Codes that Include Neuropathy, Bursitis and Nodule Codes, and the Codes that Indicate “Unspecified Site”. (continued)
    
    
       {
           "code": "M06.062",
           "dis": "Rheumatoid arthritis without rheumatoid factor, left knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.069",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.071",
           "dis": "Rheumatoid arthritis without rheumatoid factor, right ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.072",
           "dis": "Rheumatoid arthritis without rheumatoid factor, left ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.079",
           "dis": "Rheumatoid arthritis without rheumatoid factor, unspecified ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.08",
           "dis": "Rheumatoid arthritis without rheumatoid factor, vertebrae",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.09",
           "dis": "Rheumatoid arthritis without rheumatoid factor, multiple sites",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.80",
           "dis": " Other specified rheumatoid arthritis, unspecified site",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.811",
           "dis": "Other specified rheumatoid arthritis, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.812",
           "dis": " Other specified rheumatoid arthritis, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.819",
           "dis": "Other specified rheumatoid arthritis, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.821",
           "dis": " Other specified rheumatoid arthritis, right elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.822",
           "dis": " Other specified rheumatoid arthritis, left elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.829",
           "dis": "Other specified rheumatoid arthritis, unspecified elbow",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.831",
           "dis": "Other specified rheumatoid arthritis, right wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.832",
           "dis": "Other specified rheumatoid arthritis, left wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.839",
           "dis": "Other specified rheumatoid arthritis, unspecified wrist",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.841",
           "dis": "Other specified rheumatoid arthritis, right hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.842",
           "dis": "Other specified rheumatoid arthritis, left hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.849",
           "dis": "Other specified rheumatoid arthritis, unspecified hand",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.851",
           "dis": " Other specified rheumatoid arthritis, right hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.852",
           "dis": " Other specified rheumatoid arthritis, left hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.859",
           "dis": " Other specified rheumatoid arthritis, unspecified hip",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.861",
           "dis": " Other specified rheumatoid arthritis, right knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.862",
           "dis": "Other specified rheumatoid arthritis, left knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.869",
           "dis": " Other specified rheumatoid arthritis, unspecified knee",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.871",
           "dis": "Other specified rheumatoid arthritis, right ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.872",
           "dis": " Other specified rheumatoid arthritis, left ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.879",
           "dis": "Other specified rheumatoid arthritis, unspecified ankle and foot",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.88",
           "dis": "Other specified rheumatoid arthritis, vertebrae",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.89",
           "dis": "Other specified rheumatoid arthritis, multiple sites",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M06.9",
           "dis": "Rheumatoid arthritis, unspecified",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Selected Shoulder Conditions (ICD-9-CM 726.0, 726.10 to 726.19 range, 726.2, 727.61)
    
       {
           "code": "M66.211",
           "dis": "Spontaneous rupture of extensor tendons, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M66.212",
           "dis": "Spontaneous rupture of extensor tendons, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M66.219*",
           "dis": " Spontaneous rupture of extensor tendons, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M66.811",
           "dis": "Spontaneous rupture of other tendons, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M66.812",
           "dis": " Spontaneous rupture of other tendons, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M66.819",
           "dis": "Spontaneous rupture of other tendons, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.00",
           "dis": "Adhesive capsulitis of unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.01",
           "dis": "Adhesive capsulitis of right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.02",
           "dis": "Adhesive capsulitis of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.100",
           "dis": " Unspecified rotator cuff tear or rupture of unspecified shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.101",
           "dis": " Unspecified rotator cuff tear or rupture of right shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.102",
           "dis": "Unspecified rotator cuff tear or rupture of left shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.110",
           "dis": " Incomplete rotator cuff tear or rupture of unspecified shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.111",
           "dis": "Incomplete rotator cuff tear or rupture of right shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.112",
           "dis": " Incomplete rotator cuff tear or rupture of left shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.120",
           "dis": "Complete rotator cuff tear or rupture of unspecified shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.121",
           "dis": "Complete rotator cuff tear or rupture of right shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.122",
           "dis": "Complete rotator cuff tear or rupture of left shoulder, not specified as traumatic",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.20",
           "dis": "Bicipital tendinitis, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.21",
           "dis": "Bicipital tendinitis, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.22",
           "dis": "Bicipital tendinitis, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.30",
           "dis": "Calcific tendinitis of unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.31",
           "dis": "Calcific tendinitis of right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.32",
           "dis": "Calcific tendinitis of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.40",
           "dis": "Impingement syndrome of unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.41",
           "dis": "Impingement syndrome of right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.42",
           "dis": "Impingement syndrome of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       // Selected Shoulder Conditions (ICD-9-CM 726.0, 726.10 to 726.19 range, 726.2, 727.61) (continued)
    
       {
           "code": "M75.42",
           "dis": " Impingement syndrome of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.50",
           "dis": " Bursitis of unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.51",
           "dis": "Bursitis of right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.52",
           "dis": "Bursitis of left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.80",
           "dis": "Other shoulder lesions, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.81",
           "dis": " Other shoulder lesions, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.82",
           "dis": "Other shoulder lesions, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.90",
           "dis": " Shoulder lesion, unspecified, unspecified shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.91",
           "dis": "Shoulder lesion, unspecified, right shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M75.92",
           "dis": "Shoulder lesion, unspecified, left shoulder",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Spinal Stenosis of the Lumbar Region (ICD-9-CM 724.02)
    
    
       {
           "code": "M48.06",
           "dis": "Spinal stenosis, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M48.07",
           "dis": "Spinal stenosis, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.23",
           "dis": "Subluxation stenosis of neural canal of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.33",
           "dis": "Osseous stenosis of neural canal of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.43",
           "dis": " Connective tissue stenosis of neural canal of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.53",
           "dis": "ntervertebral disc stenosis of neural canal of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.63",
           "dis": "Osseous and subluxation stenosis of intervertebral foramina of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M99.73",
           "dis": "Connective tissue and disc stenosis of intervertebral foramina of lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Selected Sprains – Rotator Cuff, Cruciate Ligament, and Ankle (ICD-9-CM 840.4, 844.0, 844.1, 844.2, 844.8, 845.01, 845.00 to 845.09 range, 905.7, V58.89)
    
       {
           "code": "S43.421A",
           "dis": " Sprain of right rotator cuff capsule, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.421D",
           "dis": " Sprain of right rotator cuff capsule, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.421S",
           "dis": "Sprain of right rotator cuff capsule, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.422A",
           "dis": "Sprain of left rotator cuff capsule, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.422D",
           "dis": "Sprain of left rotator cuff capsule, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.422S",
           "dis": "Sprain of left rotator cuff capsule, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.429A",
           "dis": "Sprain of unspecified rotator cuff capsule, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.429D",
           "dis": "Sprain of unspecified rotator cuff capsule, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S43.429S",
           "dis": " Sprain of unspecified rotator cuff capsule, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.501A",
           "dis": " Sprain of unspecified cruciate ligament of right knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.501D",
           "dis": "Sprain of unspecified cruciate ligament of right knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.501S",
           "dis": "Sprain of unspecified cruciate ligament of right knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.502A",
           "dis": "Sprain of unspecified cruciate ligament of left knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.502D",
           "dis": "Sprain of unspecified cruciate ligament of left knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.502S",
           "dis": "Sprain of unspecified cruciate ligament of left knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.509A",
           "dis": "Sprain of unspecified cruciate ligament of unspecified knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.509D",
           "dis": "Sprain of unspecified cruciate ligament of unspecified knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.509S",
           "dis": "Sprain of unspecified cruciate ligament of unspecified knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.511A",
           "dis": "Sprain of anterior cruciate ligament of right knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.511D",
           "dis": "Sprain of anterior cruciate ligament of right knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.511S",
           "dis": "Sprain of anterior cruciate ligament of right knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.512A",
           "dis": " Sprain of anterior cruciate ligament of left knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.512D",
           "dis": "Sprain of anterior cruciate ligament of left knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.512S",
           "dis": " Sprain of anterior cruciate ligament of left knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.519A",
           "dis": "Sprain of anterior cruciate ligament of unspecified knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.519D",
           "dis": "Sprain of anterior cruciate ligament of unspecified knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.519S",
           "dis": "Sprain of anterior cruciate ligament of unspecified knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.521A",
           "dis": " Sprain of posterior cruciate ligament of right knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.521D",
           "dis": " Sprain of posterior cruciate ligament of right knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Selected Sprains – Rotator Cuff, Cruciate Ligament, and Ankle (ICD-9-CM 840.4, 844.0, 844.1, 844.2, 844.8, 845.01, 845.00 to 845.09 range, 905.7, V58.89) (continued)
       
       {
           "code": "S83.521S",
           "dis": "Sprain of posterior cruciate ligament of right knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.522A",
           "dis": "Sprain of posterior cruciate ligament of left knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.522D",
           "dis": "Sprain of posterior cruciate ligament of left knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.522S",
           "dis": "Sprain of posterior cruciate ligament of left knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.529A",
           "dis": " Sprain of posterior cruciate ligament of unspecified knee, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.529D",
           "dis": " Sprain of posterior cruciate ligament of unspecified knee, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S83.529S",
           "dis": "Sprain of posterior cruciate ligament of unspecified knee, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.401A",
           "dis": "Sprain of unspecified ligament of right ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.401D",
           "dis": " Sprain of unspecified ligament of right ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.401S",
           "dis": "Sprain of unspecified ligament of right ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.402A",
           "dis": "Sprain of unspecified ligament of left ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.402D",
           "dis": "Sprain of unspecified ligament of left ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.402S",
           "dis": " Sprain of unspecified ligament of left ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.409A",
           "dis": " Sprain of unspecified ligament of unspecified ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.409D",
           "dis": "Sprain of unspecified ligament of unspecified ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.409S",
           "dis": "Sprain of unspecified ligament of unspecified ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.411A",
           "dis": "Sprain of calcaneofibular ligament of right ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.411D",
           "dis": "Sprain of calcaneofibular ligament of right ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.411S",
           "dis": "Sprain of calcaneofibular ligament of right ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.412A",
           "dis": " Sprain of calcaneofibular ligament of left ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.412D",
           "dis": " Sprain of calcaneofibular ligament of left ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.412S",
           "dis": "Sprain of calcaneofibular ligament of left ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.419A",
           "dis": " Sprain of calcaneofibular ligament of unspecified ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.419D",
           "dis": "Sprain of calcaneofibular ligament of unspecified ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.419S",
           "dis": "Sprain of calcaneofibular ligament of unspecified ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.421A",
           "dis": "Sprain of deltoid ligament of right ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.421D",
           "dis": " Sprain of deltoid ligament of right ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.421S",
           "dis": "Sprain of deltoid ligament of right ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.422A",
           "dis": " Sprain of deltoid ligament of left ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.422D",
           "dis": "Sprain of deltoid ligament of left ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
    
       // Selected Sprains – Rotator Cuff, Cruciate Ligament, and Ankle (ICD-9-CM 840.4, 844.0, 844.1, 844.2, 844.8, 845.01, 845.00 to 845.09 range, 905.7, V58.89)(continued)
       {
           "code": "S93.422S",
           "dis": " Sprain of deltoid ligament of left ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.429A",
           "dis": "Sprain of deltoid ligament of unspecified ankle, initial encounte",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.429D",
           "dis": "Sprain of deltoid ligament of unspecified ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.429S",
           "dis": "Sprain of deltoid ligament of unspecified ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.431A",
           "dis": "Sprain of tibiofibular ligament of right ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.431D",
           "dis": "Sprain of tibiofibular ligament of right ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.431S",
           "dis": " Sprain of tibiofibular ligament of right ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.432A",
           "dis": "Sprain of tibiofibular ligament of left ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.432D",
           "dis": " Sprain of tibiofibular ligament of left ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.432S",
           "dis": "Sprain of tibiofibular ligament of left ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.439A",
           "dis": "Sprain of tibiofibular ligament of unspecified ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.439D",
           "dis": "Sprain of tibiofibular ligament of unspecified ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.439S",
           "dis": "Sprain of tibiofibular ligament of unspecified ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.491A",
           "dis": "Sprain of other ligament of right ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.491D",
           "dis": " Sprain of other ligament of right ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.491S",
           "dis": " Sprain of other ligament of right ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.492A",
           "dis": "Sprain of other ligament of left ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.492D",
           "dis": "Sprain of other ligament of left ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.492S",
           "dis": "Sprain of other ligament of left ankle, sequela",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.499A",
           "dis": " Sprain of other ligament of unspecified ankle, initial encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.499D",
           "dis": "Sprain of other ligament of unspecified ankle, subsequent encounter",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "S93.499S",
           "dis": "Sprain of other ligament of unspecified ankle, sequela"
       },
    
       // Thoracic, Thoracolumbar, and Lumbosacral Intervertebral Disc Disorders (ICD-9-CM 722.10, 722.11, 722.31, 722.32, 722.51, 722.52, 722.72, 722.73, 722.90, 722.92, 722.93, 724.4)
    
       {
           "code": "M51.04",
           "dis": "Intervertebral disc disorders with myelopathy, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.05",
           "dis": "Intervertebral disc disorders with myelopathy, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.06",
           "dis": " Intervertebral disc disorders with myelopathy, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.07",
           "dis": "Intervertebral disc disorders with myelopathy, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.14",
           "dis": " Intervertebral disc disorders with radiculopathy, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.15",
           "dis": " Intervertebral disc disorders with radiculopathy, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.16",
           "dis": "Intervertebral disc disorders with radiculopathy, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.17",
           "dis": " Intervertebral disc disorders with radiculopathy, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.24",
           "dis": " Other intervertebral disc displacement, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.25",
           "dis": "Other intervertebral disc displacement, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.26",
           "dis": "Other intervertebral disc displacement, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.27",
           "dis": "Other intervertebral disc displacement, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.34",
           "dis": "Other intervertebral disc degeneration, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.35",
           "dis": "Other intervertebral disc degeneration, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.36",
           "dis": "Other intervertebral disc degeneration, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.37",
           "dis": "Other intervertebral disc degeneration, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.44",
           "dis": "Schmorls nodes, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.45",
           "dis": "Schmorls nodes, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.46",
           "dis": "Schmorls nodes, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.47",
           "dis": "Schmorls nodes, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.84",
           "dis": "Other intervertebral disc disorders, thoracic region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.85",
           "dis": "Other intervertebral disc disorders, thoracolumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.86",
           "dis": " Other intervertebral disc disorders, lumbar region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.87",
           "dis": "Other intervertebral disc disorders, lumbosacral region",
           "type" : "Clinical Concepts for Orthopedics"
       },
       {
           "code": "M51.9",
           "dis": "Unspecified thoracic, thoracolumbar and lumbosacral intervertebral disc disorder",
           "type" : "Clinical Concepts for Orthopedics"
       },
       
    
    
     
    //    "Clinical Concepts for Pediatrics"===========================================
       // Allergic Inflammation of the Nasal Airways (ICD-9-CM 477.0 TO 477.9 range)
       {
           "code": "J30.0",
           "dis": "Vasomotor rhinitis",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.1",
           "dis": "Allergic rhinitis due to pollen",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.2",
           "dis": "Other seasonal allergic rhinitis",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.5",
           "dis": "Allergic rhinitis due to food",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.81",
           "dis": "Allergic rhinitis due to animal (cat) (dog) hair and dander",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.89",
           "dis": "Other allergic rhinitis",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J30.9",
           "dis": "Allergic rhinitis, unspecified",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Asthma (ICD-9-CM 493.00, 493.01, 493.02, 493.10, 493.11, 493.12, 493.20, 493.21, 493.22, 493.81, 493.82 , 493.90, 493.91, 493.92)
       {
           "code": "J45.20",
           "dis": "Mild intermittent asthma, uncomplicated",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.21",
           "dis": "Mild intermittent asthma with (acute) exacerbation",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.22",
           "dis": "Mild intermittent asthma with status asthmaticus",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.30",
           "dis": "Mild persistent asthma, uncomplicated",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.31",
           "dis": "Mild persistent asthma with (acute) exacerbation",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.32",
           "dis": "Mild persistent asthma with status asthmaticus",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.40",
           "dis": "Moderate persistent asthma, uncomplicated",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.41",
           "dis": "Moderate persistent asthma with (acute) exacerbation",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.42",
           "dis": "Moderate persistent asthma with status asthmaticus",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.50",
           "dis": "Severe persistent asthma, uncomplicated",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.51",
           "dis": "Severe persistent asthma with (acute) exacerbation",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.52",
           "dis": "Severe persistent asthma with status asthmaticus",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.901",
           "dis": "Unspecified asthma with (acute) exacerbation",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.902",
           "dis": "Unspecified asthma with status asthmaticus",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.909",
           "dis": "Unspecified asthma, uncomplicated",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.990",
           "dis": "Exercise induced bronchospasm",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.991",
           "dis": "Cough variant asthma",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "J45.998",
           "dis": "Other asthma",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Diabetes Mellitus (Select) (ICD-9-CM 250.00 to 250.03 range)
    
    
       {
           "code": "E10.65",
           "dis": "Type 1 diabetes mellitus with hyperglycemia",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "E10.9",
           "dis": "Type 1 diabetes mellitus without complications",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "E11.65",
           "dis": "Type 2 diabetes mellitus with hyperglycemia",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "E11.9",
           "dis": "Type 2 diabetes mellitus without complications",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Acute Serous Otitis Media (ICD-9-CM 381.01)
    
       {
           "code": "H65.00",
           "dis": "Acute serous otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.01",
           "dis": "Acute serous otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.02",
           "dis": "Acute serous otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.03",
           "dis": "Acute serous otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.04",
           "dis": "Acute serous otitis media, recurrent, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.05",
           "dis": "Acute serous otitis media, recurrent, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.06",
           "dis": "Acute serous otitis media, recurrent, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.07",
           "dis": "Acute serous otitis media, recurrent, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Other Acute Nonsuppurative Otitis Media (ICD-9-CM 381.00,381.02 to 381.06 range)
    
    
       {
           "code": "H65.111",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.112",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.113",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.114",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), recurrent, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.115",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), recurrent, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.116",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), recurrent, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.117",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), recurrent, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.119",
           "dis": "Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.191",
           "dis": "Other acute nonsuppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.192",
           "dis": "Other acute nonsuppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.193",
           "dis": "Other acute nonsuppurative otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.194",
           "dis": "Other acute nonsuppurative otitis media, recurrent, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.195",
           "dis": "Other acute nonsuppurative otitis media, recurrent, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.196",
           "dis": "Other acute nonsuppurative otitis media, recurrent, bilatera",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.197",
           "dis": "Other acute nonsuppurative otitis media recurrent, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.199",
           "dis": "Other acute nonsuppurative otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Chronic Serous Otitis Media (ICD-9-CM 381.10, 381.19)
    
       {
           "code": "H65.20",
           "dis": "Chronic serous otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.21",
           "dis": "Chronic serous otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.22",
           "dis": "Chronic serous otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.23",
           "dis": "Chronic serous otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Chronic Mucoid Otitis Media (ICD-9-CM 381.20, 381.29)
    
       {
           "code": "H65.30",
           "dis": "Chronic mucoid otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.31",
           "dis": "Chronic mucoid otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.32",
           "dis": "Chronic mucoid otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.33",
           "dis": "Chronic mucoid otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
    
       // Other Chronic Nonsuppurative Otitis Media (ICD-9-CM 381.3)
       {
           "code": "H65.411 ",
           "dis": "Chronic allergic otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.412",
           "dis": "Chronic allergic otitis media, left ear ",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.413",
           "dis": "Chronic allergic otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.419",
           "dis": "Chronic allergic otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.491",
           "dis": "Other chronic nonsuppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.492",
           "dis": "Other chronic nonsuppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.493",
           "dis": "Other chronic nonsuppurative otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.499",
           "dis": "Other chronic nonsuppurative otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Unspecified Nonsuppurative Otitis Media (ICD-9-CM 381.4)
    
       {
           "code": "H65.90",
           "dis": "Unspecified nonsuppurative otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.91",
           "dis": "Unspecified nonsuppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.92",
           "dis": "Unspecified nonsuppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H65.93",
           "dis": "Unspecified nonsuppurative otitis media, bilatera",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Acute Suppurative Otitis Media (ICD-9-CM 382.00, 382.01)
    
    
       {
           "code": "H66.001",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.002",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.003",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, bilatera",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.004",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, recurrent, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.005",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, recurrent, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.006",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, recurrent, bilatera",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.007",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, recurrent, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.009",
           "dis": "Acute suppurative otitis media without spontaneous rupture of ear drum, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.011",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.012",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.013",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.014",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, recurrent, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.015",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, recurrent, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.016",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, recurrent, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.017",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, recurrent, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.019",
           "dis": "Acute suppurative otitis media with spontaneous rupture of ear drum, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Chronic Tubotympanic Suppurative Otitis Media (ICD-9-CM 382.1)
       {
           "code": "H66.10",
           "dis": "Chronic tubotympanic suppurative otitis media, unspecified",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.11",
           "dis": "Chronic tubotympanic suppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.12",
           "dis": "Chronic tubotympanic suppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.13",
           "dis": "Chronic tubotympanic suppurative otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Chronic Atticoantral Suppurative Otitis Media (ICD-9-CM 382.2)
    
       {
           "code": "H66.20*",
           "dis": "Chronic atticoantral suppurative otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.21",
           "dis": "Chronic atticoantral suppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.22",
           "dis": "Chronic atticoantral suppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.23",
           "dis": "Chronic atticoantral suppurative otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Other Chronic Suppurative Otitis Media (ICD-9-CM 382.3)
    
    
       {
           "code": "H66.3X1",
           "dis": "Other chronic suppurative otitis media, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.3X2",
           "dis": "Other chronic suppurative otitis media, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.3X3",
           "dis": "Other chronic suppurative otitis media, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.3X9",
           "dis": "Other chronic suppurative otitis media, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Suppurative Otitis Media, Unspecified (ICD-9-CM 382.4)
    
       {
           "code": "H66.40*",
           "dis": "Suppurative otitis media, unspecified, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.41",
           "dis": "Suppurative otitis media, unspecified, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.42",
           "dis": "Suppurative otitis media, unspecified, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.43",
           "dis": "Suppurative otitis media, unspecified, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       // Otitis media, Unspecified (ICD-9-CM 382.9)
    
    
       {
           "code": "H66.90",
           "dis": "Otitis media, unspecified, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.91",
           "dis": "Otitis media, unspecified, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.92",
           "dis": "Otitis media, unspecified, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H66.93",
           "dis": "Otitis media, unspecified, bilateral",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
    
       // Otitis Media in Diseases Classified Elsewhere (ICD-9-CM 382.02)
    
    
       {
           "code": "H67.1",
           "dis": "Otitis media in diseases classified elsewhere, right ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H67.2",
           "dis": "Otitis media in diseases classified elsewhere, left ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H67.3",
           "dis": "Otitis media in diseases classified elsewhere, bilatera",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "H67.9",
           "dis": "Otitis media in diseases classified elsewhere, unspecified ear",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
       //Routine Child Health Examination (ICD-9-CM V20.2)
    
    
       {
           "code": "Z00.121 ",
           "dis": "Encounter for routine child health examination with abnormal findings",
           "type" : "Clinical Concepts for Pediatrics"
       },
       {
           "code": "Z00.129",
           "dis": "Encounter for routine child health examination without abnormal findings",
           "type" : "Clinical Concepts for Pediatrics"
       },
    
    
]

    

  
//   const r = [
//     createData('Cupcake', 305, 3.7),
//     createData('Donut', 452, 25.0),
//     createData('Eclair', 262, 16.0),
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Gingerbread', 356, 16.0),
//     createData('Honeycomb', 408, 3.2),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Jelly Bean', 375, 0.0),
//     createData('KitKat', 518, 26.0),
//     createData('Lollipop', 392, 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
//   ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
  
  export default function DiseasesTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const [searchTerm, setSearchTerm] = useState("all");
    const filterRow = rows.filter(data => (searchTerm === "all" ? data : data.type === searchTerm) );
  
    return (
        <div>
        <div style={{ backgroundColor:"#1D2633", height:"230px", width:"100%" }} >
            <h2 style={{ color:"white", fontSize:"25px", fontWeight:"bolder", padding:"25px 0 0 50px" }}>ICD-10
            <a href="/apps/icd10-add-diseases"><span style={{ color:"white", fontSize:"15px", fontWeight:"lighter", backgroundColor:"skyblue", padding:"10px", borderRadius:"18px", marginLeft:"10px" }}>Add Disease</span></a>
            </h2>            
            
            
            {/* <input type="text" placeholder="Search" onChange={(event)=>{
                setSearchTerm(event.target.value);
            }} /> */}

            <div style={{display:"flex", alignItem:"center", justifyContent:"center"}} >
                <div>
            <select style={{ height:"30px", padding:"7px", borderRadius:"8px" }} onChange={(event)=>{
                setSearchTerm(event.target.value);
               
            }} >
                <option value="all">All</option>
                <option value="FamilyPracticeClinic" >Family Practice Clinic</option>
                <option value="Clinical Concepts for Cardiology" >Clinical Concepts for Cardiology</option>
                <option value="Clinical Concepts for OB/GYN" >Clinical Concepts for OB/GYN</option>
                <option value="Clinical Concepts for Orthopedics" >Clinical Concepts for Orthopedics</option>
                <option value="Clinical Concepts for Pediatrics" >Clinical Concepts for Pediatrics</option>
            </select>
            </div>
            </div>




        </div>
        <div style={{ padding:"40px", marginTop:"-130px" }} >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
          <TableRow style={{  fontWeight:"bolder", fontSize:"25px"  }}>
                <TableCell component="th" scope="row" style={{  fontWeight:"bolder", fontSize:"19px"  }} >
                  Code
                </TableCell>
                <TableCell align="right" style={{ width: 160,fontWeight:"bolder", fontSize:"19px" }}  >
                  Disease Type
                </TableCell>
                <TableCell align="right" style={{ width: 660,fontWeight:"bolder", fontSize:"19px" }} >
                  Discription
                </TableCell>
              </TableRow>













             {(
               
             
                 rowsPerPage > 0
              ? filterRow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              
              : filterRow

            //    rows.filter((typ)=>{
            //          typ.type.toLowerCase().includes(searchTerm)
            //      })

            ).map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.type}
                </TableCell>
                <TableCell style={{ width: 660 }} align="right">
                  {row.dis}
                </TableCell>
              </TableRow>
            ))} 
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </div>
      </div>
    );
  }
  