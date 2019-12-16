//instantiate the class UI
const ui = new UI();

const contactUs = document.querySelector('#submitForm');

function eventList() {
	//trigger the button
	contactUs.addEventListener('click', contactUsForm);
}

eventList();





async function contactUsForm(e) {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const phone_number = document.querySelector('#phone_number').value;
	const subject = document.querySelector('#subject').value;
	const content = document.querySelector('#content').value;

	if (!name || !email) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		contactUs.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;
	

		//get user details
		const userDetails = {
			name: name,
			email: email,
			phone_number: phone_number,
			subject: subject,
			content: content
		};
    
		// return console.log(userDetails)
		//send through the api

		await fetch('https://senditappkh.herokuapp.com/api/v1/contact', {
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
				contactUs.innerHTML = `Send Message`;
				return window.location.href = '/contact.html';
			})
			.catch(function(error) {
				console.log(error.message);
				ui.printMessage(error.message, 'alert-danger');
			});
	}
}
// }
