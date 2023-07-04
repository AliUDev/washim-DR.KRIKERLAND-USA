import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const MediciensForm = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    
    return (
        <div>
             <div>
            <div>
        <div style={{ backgroundColor:"#1D2633", height:"230px", width:"100%" }}>
        <h2 style={{ color:"white", fontSize:"25px", fontWeight:"bolder", padding:"25px 0 0 50px" }}>Add Medicine</h2>
        </div>
        <div style={{display:"flex", alignItem:"center", justifyContent:"center"}} >
        <div style={{ padding:"40px", marginTop:"-100px", backgroundColor:"white", width:"80%", borderRadius:"20px" }}>
        <TextField style={{ width:"80%", marginBottom:"17px" }} id="outlined-basic" label="Add Medicine" variant="outlined" />
        <div>
        
      <div>
      <Button variant="outlined" href="#outlined-buttons" style={{ marginTop:"10px"}}>
        Submit
      </Button>
      </div>
      </div>
        </div>
        </div>
    </div>
        </div>
        </div>
    );
}

export default MediciensForm;
