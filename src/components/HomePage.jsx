import React from 'react';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <div>
            <Typography variant="h4" align='center' paddingTop={30}>Welcome to the Training Planner</Typography>
            <Typography variant="body1" align='center' paddingTop={5}>Use the tabs to navigate between different pages.</Typography>
        </div>
    );
}

export default Home;