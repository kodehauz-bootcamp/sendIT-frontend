class PAYAUTH {
	constructor(order, price) {
		this.order = order;
		this.id = order.id;
		this.price = price;
	}

	getOrder(order, price) {
		this.order = order;
		this.price = price;
	}

	async paymentAuth() {
		try {
			let url = `https://senditappkh.herokuapp.com/api/v1/getSingle/order/${this.id}`;
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('user_jwt')}`
				}
			});
			const order = await data.json();

			return {
				order
			};
		} catch (err) {
			return console.log(err.message);
		}
	}
}
