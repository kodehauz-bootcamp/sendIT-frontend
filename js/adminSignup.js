//instantiate the class UI
const ui = new UI();

function eventList() {
	const submitSignupForm = document.querySelector('#submitForm');

	//trigger the button
	submitSignupForm.addEventListener('click', signUpUser);
}

eventList();

async function signUpUser(e) {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const phone_number = document.querySelector('#phone_number').value;
	const address = document.querySelector('#address').value;
	const password = document.querySelector('#password').value;
	const confirmPassword = document.querySelector('#confirmPassword').value;

	if (!name || !email || !phone_number || !address || !password || !confirmPassword) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else if (password != confirmPassword) {
		ui.printMessage('Password Must be Equal to Confirm Password', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		//get user details
		const adminDetails = {
			full_name: name,
			email: email,
			phone: phone_number,
			address: address,
			password: password,
			confirmPassword: confirmPassword
		};

		// return console.log(userDetails)
		//send through the api

		await fetch('https://senditappkh.herokuapp.com/api/v1/admin/signup',{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(adminDetails)
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				return window.location.href = '/admin-login.html';
			})
			.catch(function(error) {
				console.log(error.message);
				ui.printMessage(error.message, 'alert-danger');
			});
	}
}
// }
