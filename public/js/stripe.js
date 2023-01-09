import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51MJKjkGamE1403bvWszMVFnBtgHUQYbvNipO9FdcJ4B10gNN0rrtHoOgoOVctO1DN2I6EIrIz8PXJMmrgRK7icmu00pOqj5QUt'
);

export const bookTour = async (tourId, date, numPeople) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}/${date}/${numPeople}`
    );

    // 2) Create checkout form + charge credit card
    if (session.data.status === 'success')
      await stripe.redirectToCheckout({ sessionId: session.data.session.id });
    else {
      // location.assign('/');
      document.getElementById('confirm-reservation').textContent = 'Book Now!';
      showAlert(
        'error',
        'You cannot make a reservation for this number of people'
      );
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
