const Name = document.getElementById('name');
let nameVal = Name.value;
const Email = document.getElementById('email');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const designOption = document.getElementById('design');
const colorOptionList = document.getElementById('color');

const activities = document.getElementById('activities');
let totalCost = 0;
const total = document.getElementById("activities-cost");

const payment = document.getElementById('payment');
const card = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const cardNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

const labelErrorName = Name.parentNode;
const labelErrorEmail = Email.parentNode;
const labelErrorCard = cardNum.parentNode;
const labelErrorZip = zip.parentNode;
const labelErrorCvv = cvv.parentNode;

const nameErr = document.getElementById('name-hint');
const emailErr = document.getElementById('email-hint');
const activitiesHint = document.getElementById('activities-hint');
const cardErr = document.getElementById('cc-hint');
const zipErr = document.getElementById('zip-hint');
const cvvErr = document.getElementById('cvv-hint');

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

function nameValid() {
    if (nameVal.trim() == '') {
        labelErrorName.style.display = 'block';
        nameErr.style.display = 'block';
        labelErrorName.classList.add('not-valid');
        return false;
    }
    labelErrorName.style.display = 'none';
    nameErr.style.display = 'none';
        labelErrorName.classList.add('valid');
        nameErr.classList.add('valid');
        return true;
}

function emailValid() {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailAddress = regex.test(Email.value);
    if(!emailAddress) {
        labelErrorEmail.style.display = 'block';
        emailErr.style.display = 'block';
        labelErrorEmail.classList.add('not-valid');
        return false;
    }
        labelErrorEmail.style.display = 'none';
        emailErr.style.display = 'none';
        labelErrorEmail.classList.add('valid');
        return true;
}

function activitiesValid() {
    
}

function cardValid() {
    const regexCC = /^\d{13,16}$/;
    let cardTest = regexCC.test(cardNum.value);

    if(!cardTest) {
        labelErrorCard.style.display = 'block';
        cardErr.style.display = 'block';
        labelErrorCard.classList.add('not-valid');
        return false;
    }
        labelErrorCard.style.display = 'none';
        cardErr.style.display = 'none';
        labelErrorCard.classList.add('valid');
        return true;
}

function zipValid() {
    if(zip.value.length != 5) {
        labelErrorZip.style.display = 'block';
        zipErr.style.display = 'block';
        labelErrorZip.classList.add('not-valid');
        return false;
    }
        labelErrorZip.style.display = 'none';
        zipErr.style.display = 'none';
        labelErrorZip.classList.add('valid');
        return true;
}

function cvvValid() {
    if(cvv.value.length != 3) {
        labelErrorCvv.style.display = 'block';
        cvvErr.style.display = 'block';
        labelErrorCvv.classList.add('not-valid');
        return false;
    }
        labelErrorCvv.style.display = 'none';
        cvvErr.style.display = 'none';
        labelErrorCvv.classList.add('valid');
        return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!nameValid()) {
        e.preventDefault();
    }

    if(!emailValid()) {
        e.preventDefault();
    }

    if(!activitiesValid()) {
        e.preventDefault();
    }

    if(!cardValid()) {
        e.preventDefault();
    }

    if(!zipValid()) {
        e.preventDefault();
    }

    if(!cvvValid) {
        e.preventDefault();
    }
    e.preventDefault();
})
