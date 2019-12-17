//instantiate the class UI
const ui = new UI();

const editProfileForm = document.querySelector('#submitForm');

function eventList() {
	//trigger the button
	editProfileForm.addEventListener('click', editProfile);
}

eventList();





async function placeOrder(e) {
	e.preventDefault();
	const full_name = document.querySelector('#full_name').value;
	const phone = document.querySelector('#phone').value;
	const address = document.querySelector('#address').value;
	

	if (!fill_name  || !address || !phone_number) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		editProfileForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;
	

		//get user details
		const userDetails = {
			 
			full_name: full_name ,
      phone: phone,
      address: address
		};

		// return console.log(userDetails)
		//send through the api

		await fetch('https://senditappkh.herokuapp.com/api/v1/update/user', {
			method: 'PATCH',
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
				editProfileForm.innerHTML = `Confirm Order`;
				return window.location.href = '';
			})
			.catch(function(error) {
				console.log(error.message);
				ui.printMessage(error.message, 'alert-danger');
			});
	}
}
// }
