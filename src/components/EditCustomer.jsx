/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCustomer } from '../api/customerapi';

export default function EditCustomer(props) {
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
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            email: props.data.email,
            phone: props.data.phone,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city
        });
    };

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        updateCustomer(props.data._links.customer.href, customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen} variant="contained">Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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
                    <Button onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}