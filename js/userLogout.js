// const ui = new UI();

async function logout() {
	await fetch("https://senditappkh.herokuapp.com/api/v1/logout", {
		method: "DELETE"
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			return console.log(`this is the data ${data}`);
			sessionStorage.removeItem("user_jwt");
			window.location.href = "/index.html";
		})
		.catch(function(error) {
			console.log(error.message);
			// ui.printMessage(error.message, "alert-danger");
		});
}
