import { showAlert } from './alerts.js';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    if (password !== passwordConfirm)
      return showAlert('error', 'Passwords are not the same!');

    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500); // Going to the home page after 1.5s
    }
  } catch (err) {
    // alert(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};
