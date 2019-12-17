function Auth(req, res, next) {
	const token = sessionStorage.getItem('admin_jwt');
	console.log(token);

	if (!token) {
		window.location.href = './admin-login.html';
	}
}
Auth();


function logoutAdmin() {
	try {
		sessionStorage.removeItem('admin_jwt');
		return window.location.href = './index.html';	
	} catch (e) {
		console.log(e.message);
		alert('User already logged out');
	}
	
 }