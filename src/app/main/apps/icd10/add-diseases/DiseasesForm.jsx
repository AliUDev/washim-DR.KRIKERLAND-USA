import React from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function DiseasesForm() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    
  return (
    <div>
        <div style={{ backgroundColor:"#1D2633", height:"230px", width:"100%" }}>
        <h2 style={{ color:"white", fontSize:"25px", fontWeight:"bolder", padding:"25px 0 0 50px" }}>Add ICD-10 Disease</h2>
        </div>
        <div style={{display:"flex", alignItem:"center", justifyContent:"center"}} >
        <div style={{ padding:"40px", marginTop:"-100px", backgroundColor:"white", width:"80%", borderRadius:"20px" }}>
        <TextField style={{ width:"80%", marginBottom:"17px" }} id="outlined-basic" label="Add ICD-code" variant="outlined" />
        <TextField style={{ width:"80%", marginBottom:"17px" }} id="outlined-basic" label="Add Discription" variant="outlined" />
        <div>
        <FormControl variant="filled" style={{ marginLeft:"-1px",marginTop:"-2px"}} sx={{ m: 1, minWidth: 120,width:"80%" }}>
        <InputLabel id="demo-simple-select-filled-label">Add Disease Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Family Practice Clinic">FamilyPracticeClinic</MenuItem>
          <MenuItem value="Clinical Concepts for Cardiology">Clinical Concepts for Cardiology</MenuItem>
          <MenuItem value="Clinical Concepts for OB/GYN">Clinical Concepts for OB/GYN</MenuItem>
          <MenuItem value="Clinical Concepts for Orthopedics">Clinical Concepts for Orthopedics</MenuItem>
          <MenuItem value="Clinical Concepts for Pediatrics">Clinical Concepts for Pediatrics</MenuItem>
        </Select>
       
      </FormControl>
      <div>
      <Button variant="outlined" href="#outlined-buttons" style={{ marginTop:"10px"}}>
        Submit
      </Button>
      </div>
      </div>
        </div>
        </div>
    </div>
  )
}

export default DiseasesForm