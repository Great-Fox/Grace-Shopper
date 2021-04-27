import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function ThankYou() {
    return (
        <div>
            <h1 className="cheating">Thank you for placing an order!</h1>
            <p>This website is pretend, so unfortunately we can't actually give you a ringtone. Bu you can keep exploring at the link below!</p>
           <Link to="/ringtone">
           <Button
                style={{marginLeft: 5, marginTop: 5}}      
                color="secondary"
                variant="contained"
               >Keep Shopping</Button>
            </Link>
        </div>
    )
}