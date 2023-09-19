/*Variables for the multitude of elements needed for interacting with the page below. Group into sections based on relationship to each other.
The interaction with most is simply grabbing some text from an input or changing the element's interactibility (i.e. making it so the other job field only shows when thtat role is selected).
*/
const Name = document.getElementById('name');
const Email = document.getElementById('email');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const designOption = document.getElementById('design');
const colorOptionList = document.getElementById('color');

// The elements below relate to the activities fieldset section and the prices. They will be used in that function below to change the displayed price based on which activities the user has selected and keep track of the price through any changes to it.

const activities = document.getElementById('activities');
let totalCost = 0;
const total = document.getElementById("activities-cost");

/*

*/

const activityBox = document.querySelectorAll('input[type="checkbox"]');
const activityLabel = document.querySelectorAll('.activities label');

const payment = document.getElementById('payment');
const card = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const cardNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

const nameErr = document.getElementById('name-hint');
const nameLabel = Name.parentNode;
const emailErr = document.getElementById('email-hint');
const emailLabel = Email.parentNode;
const activityErr = document.getElementById('activities-hint');
const cardErr = document.getElementById('cc-hint');
const cardLabel = cardNum.parentNode;
const zipErr = document.getElementById('zip-hint');
const zipLabel = zip.parentNode;
const cvvErr = document.getElementById('cvv-hint');
const cvvLabel = cvv.parentNode;

Name.focus();
otherJobRole.style.display = 'none';
paypal.style.display = 'none';
bitcoin.style.display = 'none';
payment[1].setAttribute('selected', 'selected');

jobRole.addEventListener('change', () => {
    if(jobRole.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

colorOptionList.disabled  = true;

designOption.addEventListener('change', () => {
    colorOptionList.disabled = false;
    const design = designOption.value;

    for(let i = 0; i < colorOptionList.options.length; i++){
        const theme = colorOptionList.options[i].getAttribute('data-theme');
        
        if (theme === design){
            colorOptionList.options[i].style.display = '';
            colorOptionList.options[i].selected = true;
        } else{
            colorOptionList.options[i].style.display = 'none';
            colorOptionList.options[i].selected = false;
        }
    }
});

activities.addEventListener('change', (event) => {
    const dataTarget = parseInt(event.target.getAttribute('data-cost'));

    if(event.target.checked) {
        totalCost += dataTarget;
        total.innerHTML = `Total: $${totalCost}`;
    } else if(!event.target.checked) {
        totalCost -= dataTarget;
        total.innerHTML = `Total: $${totalCost}`;
    }
});

payment.addEventListener('change', () => {
    if (payment.value == 'credit-card') {
        card.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (payment.value == 'paypal') {
        card.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
    } else if (payment.value == 'bitcoin') {
        card.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    }
});

function nameValid(Name, nameErr, nameLabel) {
    const nameVal = Name.value.trim();
    if (nameVal === '') {
        nameErr.style.display = 'block';
        nameLabel.classList.add('not-valid');
        nameLabel.classList.remove('valid');
        return false;
    } else {
        nameErr.style.display = 'none';
        nameLabel.classList.add('valid');
        nameLabel.classList.remove('not-valid');
        return false;
    }
}

function emailValid(Email, emailErr, emailLabel) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email.value);
    if(Email.value === '' || !regex) {
        emailErr.style.display = 'block';
        emailLabel.classList.add('not-valid');
        emailLabel.classList.remove('valid');
        return false;
    } else {
        emailErr.style.display = 'none';
        emailLabel.classList.add('valid');
        emailLabel.classList.remove('not-valid');
        return true;
    }
}

function activityValid() {
    
    for(let i = 0; i < activityBox.length; i++) {
        if(activityBox[i].checked) {
            console.log('Yes');
            activityErr.style.display = 'none';
            activities.classList.add('valid');
            activities.classList.remove('not-valid');
        } else {
            console.log('No');
            activityErr.style.display = 'block';
            activities.classList.add('not-valid');
            activities.classList.remove('valid');
        }
    }
}

function cardValid(cardNum, cardErr, cardLabel) {
    const regexCC = /^\d{13,16}$/.test(cardNum.value);
    if(cardNum.value === '') {
        cardErr.innerHTML = 'Card number is required';
        cardErr.style.display = 'block';
        cardLabel.classList.add('not-valid');
        cardLabel.classList.remove('valid');
        return false;
    } else if (!regexCC) {
            cardErr.innerHTML = 'Credit card number must be between 13 - 16 digits';
            cardErr.style.display = 'block';
            cardLabel.classList.add('not-valid');
            cardLabel.classList.remove('valid');
            return false;
    } else {
            cardErr.style.display = 'none';
            cardLabel.classList.add('valid');
            cardLabel.classList.remove('not-valid');
            return true;
    }
}

function zipValid(zip, zipErr, zipLabel) {
    if(zip.value.length != 5) {
        zipErr.style.display = 'block';
        zipLabel.classList.add('not-valid');
        zipLabel.classList.remove('valid');
        return false;
    } else {
        zipErr.style.display = 'none';
        zipLabel.classList.add('valid');
        zipLabel.classList.remove('not-valid');
        return true;
    }
}

function cvvValid(cvv, cvvErr, cvvLabel) {
    if(cvv.value.length != 3) {
        cvvErr.style.display = 'block';
        cvvLabel.classList.add('not-valid');
        cvvLabel.classList.remove('valid');
        return false;
    } else {
        cvvErr.style.display = 'none';
        cvvLabel.classList.add('valid');
        cvvLabel.classList.remove('not-valid');
        return true;
    }
}

Name.addEventListener('keyup', () => {
    nameValid(Name, nameErr, nameLabel);
});

Email.addEventListener('keyup', () => {
    emailValid(Email, emailErr, emailLabel);
});

cardNum.addEventListener('keyup', () => {
    cardValid(cardNum, cardErr, cardLabel);
});

zip.addEventListener('keyup', () => {
    zipValid(zip, zipErr, zipLabel);
});

cvv.addEventListener('keyup', () => {
    cvvValid(cvv, cvvErr, cvvLabel);
});

form.addEventListener('submit', (e) => {
    if(nameValid(Name, nameErr, nameLabel)) {
        e.preventDefault();
    }
    if(!emailValid(Email, emailErr, emailLabel)) {
        e.preventDefault();
    }
    if(!activityValid()) {
        e.preventDefault();
    }
    let paymentCC = false;
    if(payment.value == 'credit-card') {
        paymentCC = true;
    } else {
        paymentCC = false;
    }
        if(!cardValid(cardNum, cardErr, cardLabel) && paymentCC == true) {
            e.preventDefault();
        }
        if(!zipValid(zip, zipErr, zipLabel) && paymentCC == true) {
            e.preventDefault();
        }
        if(!cvvValid(cvv, cvvErr, cvvLabel) && paymentCC == true) {
            e.preventDefault();
        }

    e.preventDefault();
});

function activityFocus() {
    for(let i = 0; i < activityBox.length; i++) {
        activityBox[i].addEventListener('focus', (event) => {
            if(event) {
                activityLabel[i].classList.add('focus');
            }
        });
        activityBox[i].addEventListener('blur', (event) => {
            if(event) {
                activityLabel[i].classList.remove('focus');
            }
        });
    }
}

activityFocus();

