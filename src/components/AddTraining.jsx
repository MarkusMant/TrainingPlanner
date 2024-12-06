/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveTraining } from '../utils/trainingapi';
import { getCustomers } from '../utils/customerapi';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: dayjs(),
        duration: "",
        activity: "",
        customer: ""
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setTraining({ ...training, date });
    };

    const handleSave = () => {
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
                setTraining({
                    date: dayjs(),
                    duration: "",
                    activity: "",
                    customer: ""
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Button variant='contained' color='success' onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time"
                            value={training.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration"
                        value={training.duration}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        label="Activity"
                        value={training.activity}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            name="customer"
                            value={training.customer}
                            onChange={handleChange}
                        >
                            {customers.map((customer, index) => (
                                <MenuItem key={index} value={customer._links.self.href}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}