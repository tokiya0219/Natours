import axios from "axios";

import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51I4o1gDBYCX4zdTPvw6Wznl6x90IQf68QFpvyRGWCluPeODpLiFBktowHQuPUtEmDiT0ENbdamLS3seMQJVDV6Cv00YaGrNFB3');

export const bookTour = async(tourId) => {
    try{
    // 1: Get checkout session from API
    const session = await axios(`http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2: Create checkout four + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
        
    } catch(err) {
        console.log(err);
        showAlert('error', err);
    }
};