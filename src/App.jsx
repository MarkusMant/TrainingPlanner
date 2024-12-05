import CustomerList from './components/CustomerList';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material';


function App() {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Customerlist</Typography>
          </Toolbar>
        </AppBar>
        <CustomerList />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
