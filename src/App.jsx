import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import  AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Customerlist</Typography>
          </Toolbar>
        </AppBar>
        <TrainingList />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
