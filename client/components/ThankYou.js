import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
    return (
        <div>
            <h1>Thank you for placing an order!</h1>
            <p>This website is pretend, so unfortunately we can't actually give you a ringtone. Bu you can keep exploring at the link below!</p>
           <Link to="/ringtone">
            <button>Keep Shopping</button>
            </Link>
        </div>
    )
}