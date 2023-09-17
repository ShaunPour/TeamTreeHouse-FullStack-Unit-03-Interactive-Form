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

const nameErr = Name.nextElementSibling;
const emailErr = document.getElementById('email-hint');
const activitiesHint = document.getElementById('activities-hint');
const cardHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const cvvHint = document.getElementById('cvv-hint');

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
        nameErr.classList.add('not-valid');
        console.log('No!');
        return false;
    }
    labelErrorName.style.display = 'none';
        labelErrorName.classList.add('valid');
        nameErr.classList.add('valid');
        console.log('Yes!');
        return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!nameValid()) {
        e.preventDefault();
    }
    e.preventDefault();
})
