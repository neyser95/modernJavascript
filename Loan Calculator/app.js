//listen for submit 
document.querySelector("#loan-form").addEventListener("submit", function(e){
  //Hide Results
  document.querySelector("#results").style.display = "none";

  //Show Loader
  document.querySelector("#loading").style.display = "block"; 

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(){
  //UI Vars
  const amount =  document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //Show results
    document.querySelector("#results").style.display = "block";

    //Hide Loader
    document.querySelector("#loading").style.display = "none";
  }else{
    showError("Please check your numbers");

    //Hide results
    document.querySelector("#results").style.display = "none";
    //Hide Loader
    document.querySelector("#loading").style.display = "none";
  }
}

//show error
function showError(error){
  //Create a div
  const errorDiv = document.createElement("div");

  //get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //class 
  errorDiv.className = "alert alert-danger";

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading 
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//clearError
function clearError(){
  document.querySelector(".alert").remove();
}