function getTticketSection(){
    
    // hide section
    const hideSection = document.getElementById('hide-section');
    hideSection.classList.add('hidden');

}

// seat select
const allSeat = document.getElementsByClassName('seat');
let count = 0;
let remaninigSeats = 40;

for(const seat of allSeat){
    // button background color
    seat.addEventListener('click', function(e){
        seat.style.backgroundColor = '#1DD100';
    })


    // remaninig seat display
    seat.addEventListener('click',function(e){
        remaninigSeats = remaninigSeats - 1;
        setInnerText("seat-left", remaninigSeats);
    }) 


    // seat count
    seat.addEventListener("click", function(e){
        count = count + 1;
        setInnerText("count-seat", count); 
        // seat invoice
        const seatName = e.target.parentNode.childNodes[0].innerText;
        
        const price = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[7].childNodes[9].childNodes[3].childNodes[0].innerText;

        const seletedContainer = document.getElementById('seleted-place-container');

        const li = document.createElement('li');

        const p = document.createElement('p');
        p.innerText = seatName + ' ' + 'Economy';
        
        const p2 = document.createElement('p');
        p2.innerText = price;

        li.appendChild(p);
        li.appendChild(p2);
        seletedContainer.appendChild(li);
        // total cost
        totalCost('total-cost', parseInt(price));
        

        // grand total paice
        applyCouponAndGrandTotal('grand-total', parseInt(price));
        
        
        
        
    })
    
}
// total cost
function totalCost(id, value){
    const totalCost = document.getElementById('total-cost').innerText;

    const convertedTotalCost = parseInt(totalCost);
    const sum = convertedTotalCost + parseInt(value);
    setInnerText("total-cost", sum);
}


const couponDiscounts = {
    'NEW15': 15,
    'Couple 20': 20,
};
function applyCouponAndGrandTotal(id, value){
    const couponCode = document.getElementById('coupon-confirm').value;
    const discountPrice = couponDiscounts[couponCode] || 0;
    const discountAmount = parseInt(value * discountPrice) / 100;
    const grandCouponTotal = parseInt(value - discountAmount);
    setInnerText('grand-total', grandCouponTotal); 
}
// apply coupon
document.getElementById('delete-button').addEventListener("click", function(){
    const couponCode = document.getElementById('coupon-confirm').value;
    const totalCost = parseInt(document.getElementById('total-cost').innerText);

    applyCouponAndGrandTotal('grand-total', totalCost);
})

function setInnerText(id, value){
    document.getElementById(id).innerText = value;
    document.getElementById(id).innerText = value;
    document.getElementById(id).innerText = value;
    document.getElementById(id).innerText = value;
}




const couponInput = document.getElementById('coupon-confirm');
const deleteButton = document.getElementById('delete-button');
const deleteItem = document.getElementById('delete-item');

couponInput.addEventListener('input', function(){
    const couponCode = this.value;

    if(couponCode === 'NEW15' || couponCode === 'Couple 20'){
        deleteButton.removeAttribute('disabled');
    }
    else{
        deleteButton.setAttribute('disabled', true);
    }
     
});

deleteButton.addEventListener('click', function(){
    deleteItem.style.display = 'none';
})


// show confirmation
function sectionHide(){
    // header
    const headerSection = document.getElementById('header-section');
    headerSection.classList.add('hidden');

    // coupon section
    const couponSection = document.getElementById('hide-section');
    couponSection.classList.add('hidden');

    // ticket section
    const ticketSection = document.getElementById('ticket-section');
    ticketSection.classList.add('hidden');

    // footer section
    const footerSection = document.getElementById('footer-section');
    footerSection.classList.add('hidden');

    // confirmation section
    const confirmMsg = document.getElementById('confirm-msg');
    confirmMsg.classList.remove('hidden');
}





function selectSeat(seat){
    let selectedSeats = document.querySelectorAll('.btn.seat.selected').length;

    if (selectedSeats >= 4){
       document.querySelectorAll('.btn.seat:not(.selected)').forEach(disabledSeat => {
        disabledSeat.disabled = true;
       });
    
       document.getElementById('delete-item').style.display = 'block';
    }
    else{
        document.getElementById('delete-item').style.display = 'none';

        document.querySelectorAll('.btn.seat:not(.selected)').forEach(enabledSeat => {
            enabledSeat.disabled = false;
        })

        
    }
}

document.querySelectorAll('.btn.seat').forEach(seat => {
    seat.addEventListener('click', function(){
        
            seat.classList.toggle('selected');
            selectSeat(seat);
    })
})
