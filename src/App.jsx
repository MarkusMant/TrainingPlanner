import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './components/HomePage';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';

function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Router>
        <Container maxWidth="xl">
              <Box sx={{ bgcolor: 'gray', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="h6" align='center' paddingTop={1}>Training Planner</Typography>
                <Tabs value={value} onChange={handleChange} aria-label="navigation tabs" centered>
                    <Tab label="Home" component={Link} to="/"/>
                    <Tab label="Trainings" component={Link} to="/trainings" />
                    <Tab label="Customers" component={Link} to="/customers" />
                    <Tab label="Calendar" component={Link} to="/calendar" />
                </Tabs>
            </Box>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/trainings" element={<TrainingList />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
          <CssBaseline />
        </Container>
    </Router>
);
}

export default App
