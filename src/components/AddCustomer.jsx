/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCustomer } from '../api/customerapi';

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                handleClose();
                setCustomer({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    streetaddress: "",
                    postcode: "",
                    city: ""
                })
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>Add Customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                        label="First Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                        label="Last Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleChange}
                        label="Street Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                        label="Postcode"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}