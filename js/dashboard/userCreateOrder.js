//instantiate the class UI
const ui = new UI();

const placeOrderForm = document.querySelector('#submitForm');

function eventList() {
	//trigger the button
	placeOrderForm.addEventListener('click', placeOrder);
}

eventList();





async function placeOrder(e) {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const parcel_name = document.querySelector('#parcel_name').value;
	const weight = document.querySelector('#weight').value;
	const location = document.querySelector('#location').value;
	const destination = document.querySelector('#destination').value;
	const phone_number = document.querySelector('#phone_number').value;
	

	if (!name || !location  || !location || !destination || !phone_number) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		placeOrderForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;
	

		//get user details
		const userDetails = {
			name:name,
			parcel_name: parcel_name,
			weight: weight,
			location: location,
			destination: destination,
			phone_number: phone_number
		};

		// return console.log(userDetails)
		//send through the api

		await fetch('https://senditappkh.herokuapp.com/api/v1/create/order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userDetails)
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				placeOrderForm.innerHTML = `Confirm Order`;
				return window.location.href = './payment-slip.html';
			})
			.catch(function(error) {
				console.log(error.message);
				ui.printMessage(error.message, 'alert-danger');
			});
	}
}
// }
