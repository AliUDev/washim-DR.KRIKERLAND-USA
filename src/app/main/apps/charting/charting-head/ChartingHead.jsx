import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NativeSelect from '@mui/material/NativeSelect'
import Button from '@mui/material/Button';

function ChartingHead() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


      const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <div>
    <Box sx={{  bgcolor: 'background.paper', width:"100%" }}>
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
      <Tab label="Item Four" />
      <Tab label="Item Five" />
      <Tab label="Item Six" />
      <Tab label="Item Seven" />
    </Tabs>
  </Box>
        <div>
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}  >
        <Grid item xs={12} >
          <Item style={{  boxShadow:"0px 0px 0px 0px ", backgroundColor:"#252F3E", color:"white" }} >
            <center>
      <Avatar
        alt="Remy Sharp"
        src="https://imspeople.com/wp-content/uploads/2017/05/Ashok_vithlani.jpg"
        sx={{ width: 110, height: 110 }}
        
      />
    </center>
    <h2 style={{marginTop:"13px"}}><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Name:</lable>Johan Williams</h2>

          </Item>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}    >
          <Item>
              <ul style={{ fontSize:"14px", textAlign:"left", marginLeft:"3%" }}>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Name:</lable>Johan Williams</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>DOB:</lable>01/12/1997</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Demo:</lable>59 y/o WM</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Location:</lable>Home</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Cont#</lable>706-546-9807(F)</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Emer#</lable>706-546-9807(F)</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Weight:</lable> 160 lbs `72.6 Kg`</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Weight Δ:</lable>01/12/1997</li>

              </ul>
          </Item>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}  >
          <Item>
          <ul style={{ fontSize:"14px", textAlign:"left", marginLeft:"3%" }}>
          <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>DOLE:</lable>01/21/2021</li>
          <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Height:</lable>60 inch</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>1° ins:</lable>N/A</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>2° ins:</lable>N/A</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>3° ins:</lable>N/A</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Allergies:</lable> CSV, Allergy1</li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>BMI:</lable> 31.24 Kg/m<sup>2</sup></li>
                  <li><lable style={{ fontWeight:"bold", marginRight:"3px" }}>Pharmacy:</lable>PMC</li>

              </ul>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Grid container spacing={1}>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <FormControl fullWidth>
         <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Location
         </InputLabel>
         <NativeSelect
          defaultValue={Location}
          inputProps={{
            name: 'Location',
            id: 'uncontrolled-native',
          }}
        >
          <option value="Haper Personal Care Home" >Haper Personal Care Home</option>
          <option value="Heritage Health Care">Heritage Health Care</option>
          <option value="Washington Internal Medical Care">Washington Internal Medical Care</option>
          <option value="Quites Oaks Nursing Home">Quites Oaks Nursing Home</option>
          <option value="Tignall Assisted Living">Tignall Assisted Living</option>
          <option value="Wills Memorial Hospital">Wills Memorial Hospital</option>
        </NativeSelect>
        </FormControl>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <FormControl fullWidth>
         <InputLabel variant="standard" htmlFor="uncontrolled-native">
         SOMR and POMR
         </InputLabel>
         <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'somr',
            id: 'uncontrolled-native',
          }}
        >
          <option value="SOMR">SOMR</option>
          <option value="POMR">POMR</option>

        </NativeSelect>
        </FormControl>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <FormControl fullWidth>
         <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Note Type
         </InputLabel>
         <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'note-type',
            id: 'uncontrolled-native',
          }}
        >
          <option value="Progress Note">Progress Note</option>
          <option value="History and Physical">History and Physical</option>
          <option value="Consult Note">Consult Note</option>
          <option value="Correspondance">Correspondance</option>
        </NativeSelect>
        </FormControl>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <FormControl fullWidth>
         <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Saved?
         </InputLabel>
         <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'save',
            id: 'uncontrolled-native',
          }}
        >
          <option value="Save Complete">Save Complete</option>
          <option value="Save Inomplete">Save Inomplete</option>
        </NativeSelect>
        </FormControl>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <FormControl fullWidth>
         <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Saved?
         </InputLabel>
         <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'save',
            id: 'uncontrolled-native',
          }}
        >
          <option value="Save Complete">Save Complete</option>
          <option value="Save Inomplete">Save Inomplete</option>
        </NativeSelect>
        </FormControl>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
          <input type="date" style={{ marginTop:"9%" }} />
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>Text</Button>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>New Notes</Button>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>Preview</Button>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>Send</Button>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>Problem Session Grid</Button>
        </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6} >
            <Button size='large' variant="outlined"style={{ marginTop:"2%", width:"100%" }}>Template</Button>
        </Grid>
        </Grid>
        
          </Item>
        </Grid>
       <Grid container spacing={2}>
          <Grid item xs={12} >Complaint Section Coming Soon!</Grid>
        </Grid>
        


      </Grid>
        </Box>
        


        </div>
    </div>
  )
}

export default ChartingHead