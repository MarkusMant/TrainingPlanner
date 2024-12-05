/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveTraining } from '../api/trainingapi';
import { getCustomers } from '../api/customerapi';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: "",
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
    } 

    const handleSave = () => {
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
                setTraining({
                    date: "",
                    duration: "",
                    activity: "",
                    customer: ""
                })
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>Add Training</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={handleChange}
                        label="Date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            name="customer"
                            value={training.customer}
                            onChange={handleChange}
                            label="Customer"
                        >
                            {customers.map(customer => {
                                <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSave} color="primary">Save</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}