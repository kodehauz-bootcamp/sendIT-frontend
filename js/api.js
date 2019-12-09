class UI {
  //printmessage to the page
  printMessage(message, className) {

    //div containing the message whether error or success 
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('alert', 'infor', className);
    messageDiv.setAttribute('role', 'alert')
    messageDiv.appendChild(document.createTextNode(message));
  //   const dismis = `
  //   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  //   <span aria-hidden="true">&times;</span>
  // </button>
  //   `;

  //   messageDiv.appendChild(dismis)

    //where it will be displayed
    const refMessage = document.querySelector('.display');
    refMessage.insertBefore(messageDiv, document.querySelector('.INFORMATION'));

    //set timerto remove the messge
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  } 
}

//instantiate the class UI
const ui = new UI();

const submitSignupForm = document.querySelector('#submitForm');
submitSignupForm.addEventListener('click', signUpUser);

function signUpUser(e) {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone_number = document.querySelector('#phone_number').value;
  const address = document.querySelector('#address').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (!name || !email || !phone_number || !address || !password || !confirmPassword) {
    ui.printMessage('Fill all Fields!!!', 'alert-danger')
  } else if (password != confirmPassword) {
    ui.printMessage('Password Must be Equal to Confirm Password', 'alert-danger')
  } else {
    ui.printMessage('Thank You for Your Info, Processing!', 'alert-success');
    
    //get user details
    const userDetails = {
      name: name,
      email: email,
      phone_number: phone_number,
      address: address,
      password: password,
      confirmPassword: confirmPassword
    }

    // return console.log(userDetails)
    //send through the api
    
    fetch("https://senditappkh.herokuapp.com/api/v1/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
      }).then(function (response) {
      return response.json();
      }).then(function (data) {
        return console.log(data)
      })
      .catch(function (error) {
        console.log(error.message);
    })
  }
}