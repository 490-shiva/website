document.getElementById('signup-form').addEventListener('submit', async function (e) {

    e.preventDefault();

    let valid = true;

    const clear = id => document.getElementById(id).textContent = '';

    const error = (id, msg) => {
        document.getElementById(id).textContent = msg;
        valid = false;
    };

    [
        'err-username',
        'err-phone',
        'err-email',
        'err-password',
        'err-repassword',
        'err-terms'
    ].forEach(clear);

    const username = document.getElementById('username').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repass = document.getElementById('repassword').value;
    const terms = document.getElementById('terms').checked;

    if (!username) error('err-username', 'Username is required.');
    else if (username.length < 3) error('err-username', 'Minimum 3 characters.');

    if (!phone) error('err-phone', 'Phone is required.');

    if (!email) error('err-email', 'Email is required.');

    if (!password) error('err-password', 'Password required.');

    if (password !== repass) {
        error('err-repassword', 'Passwords do not match.');
    }

    if (!terms) {
        error('err-terms', 'Accept terms first.');
    }

    // SEND DATA TO SERVER
    if (valid) {

        try {

            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    phone,
                    email,
                    password
                })
            });

            const result = await response.json();

            const btn = this.querySelector('.btn-submit');

            btn.textContent = '✓ Account Created!';
            btn.style.background = '#22c55e';

            alert(result.message);

        } catch (err) {

            alert("Server error");

            console.log(err);

        }

    }

});