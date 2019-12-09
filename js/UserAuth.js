function Auth(req, res, next) {
	const token = sessionStorage.getItem('user_jwt');
	console.log(token);

	if (!token) {
		window.location.href = '/login.html';
	}
}

Auth();
