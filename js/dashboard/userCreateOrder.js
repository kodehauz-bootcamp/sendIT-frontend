const ui = new UI();

const placeOrderForm = document.querySelector('#submitForm');

function eventList() {
	//default loading
	document.addEventListener('DOMContentLoaded', loader);

	//trigger the button
	placeOrderForm.addEventListener('click', placeOrder);
}

eventList();

async function loader() {
	await axios.get('https://nigerian-states-info.herokuapp.com/api/v1/states').then((res) => {
		const states = res.data.data;
		const select = document.querySelectorAll('select');
		// return console.log(select);
		select.forEach((tag) => {
			states.forEach((state) => {
				const option = document.createElement('option');
				option.value = state.Name.toUpperCase();
				option.innerHTML = state.Name.toUpperCase();

				//appending the options
				tag.appendChild(option);
			});
		});
	});
}

async function placeOrder(e) {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const parcel_name = document.querySelector('#parcel_name').value;
	const weight = document.querySelector('#weight').value;
	const location = document.querySelector('#location').value;
	const destination = document.querySelector('#destination').value;
	const phone_number = document.querySelector('#phone_number').value;
	const address = document.querySelector('#address').value;
	const r_name = document.querySelector('#r_name').value;
	const r_email = document.querySelector('#r_email').value;
	const r_address = document.querySelector('#r_address').value;
	const r_phone_number = document.querySelector('#r_phone_number').value;

	if (
		!name ||
		!location ||
		!destination ||
		!phone_number ||
		!address ||
		!r_name ||
		!r_email ||
		!r_address ||
		!r_phone_number ||
		!weight ||
		!parcel_name
	) {
		ui.printMessage('Fill all Fields!!!', 'alert-danger');
	} else {
		ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');

		placeOrderForm.innerHTML = `
			<span class="spinner-border spinner-border-sm"></span> Processing
		`;

		//get user details
		const userDetails = {
			sender_name: name,
			recipient_name: r_name,
			recipient_email: r_email,
			parcel_name: parcel_name,
			weight: weight,
			location_address: address,
			location_state: location,
			destination_address: r_address,
			destination_state: destination,
			sender_phone_number: phone_number,
			recipient_phone_number: r_phone_number,
			status: 'Pending',
			price: '$100'
		};

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		});

		return swalWithBootstrapButtons
			.fire({
				title: 'Woow!!!!!',
				text: `Distance Calculated is xx and the price is ${userDetails.price}`,
				imageUrl: 'https://unsplash.it/700/200',
				imageWidth: 700,
				imageHeight: 200,
				showCancelButton: true,
				confirmButtonText: 'Yes, Proceed Order!',
				cancelButtonText: 'No, cancel!',
				reverseButtons: true
			})
			.then(async (result) => {
				if (result.value) {
					await fetch('https://senditappkh.herokuapp.com/api/v1/create/order', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${sessionStorage.getItem('user-jwt')}`
						},
						body: JSON.stringify(userDetails)
					})
						.then(function(data) {
							return console.log(data);
						})
						.catch(function(error) {
							console.log(error.message);
							ui.printMessage(error.message, 'alert-danger');
						});
					swalWithBootstrapButtons.fire('Completed!', 'Your Order is Confirmed.', 'success');
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire('Cancelled', 'Your Order is Cancelled :)', 'error');
				}
			});
	}
}
// }
