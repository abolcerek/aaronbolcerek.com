window.onload = function() {
    const waveEmoji = document.querySelector('.wave-emoji');
    waveEmoji.style.animation = "wave-animation 2.5s infinite";
}

let forminfo = {};
let hasSubmitted = false;

const formstatus = document.getElementById('form-status');

const myform = document.getElementById('myformid');
myform.addEventListener('submit', function(event) {
    event.preventDefault();
    if (hasSubmitted) {
        formstatus.textContent = 'Form has already been submitted.';
        formstatus.style.display = 'flex';
        formstatus.style.justifyContent = 'center';
        return;
    }
    hasSubmitted = true;
    const formdata = new FormData(myform);
    forminfo.name = formdata.get('name');
    forminfo.email = formdata.get('email');
    forminfo.message = formdata.get('message');

    fetch('http://127.0.0.1:3001/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(forminfo)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
    console.log('Success:', data);
    const success = document.getElementById('form-status');
    success.textContent = 'Message sent successfully!';
    success.style.display = 'flex';
    success.style.justifyContent = "center";

    myform.reset();
    setTimeout(() => {
        success.style.display = 'none';
        hasSubmitted = false;
    }, 60000);
    })

    .catch(error => {
    console.error('Error:', error); 
    const failure = document.getElementById('form-status');
    failure.textContent = 'Failed to send message. Please try again';
    failure.style.display = "flex";
    failure.style.justifyContent = 'center';
    });
});
