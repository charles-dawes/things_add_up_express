$("#btnSubmit").on('click', function(e){
  e.preventDefault();
  var firstName = $("#txtFirstName").val();
  var lastName = $("#txtLastName").val();
  var password = $("#txtPassword").val();
  var confPassword = $("#txtPasswordConfirm").val();
  var phoneNumber = $("#txtPhoneNumber").val();

  if (!firstName || !lastName || !password || !confPassword || !phoneNumber){
    toastr.error("All fields must be completed!","Error", {timeOut: 5000, positionClass: 'toast-bottom-center'})
  } else {
    if (password !== confPassword){
      $("#txtPassword").parent().parent().addClass("has-danger")
      $("#txtPasswordConfirm").parent().parent().addClass("has-danger")
      toastr.error("Your passwords do not match", "Password Error", {timeOut: 5000, positionClass: 'toast-bottom-center'});
    } else {
      //submit!
      if (password.length < 6 || !hasUpperCase(password)){
        toastr.error("Your password does not match the password requirements.  Please try again.", "Password Error", { timeOut: 5000, positionClass: 'toast-bottom-center'});
      }  else {
        var data = {
          firstName: firstName,
          lastName: lastName,
          password: confPassword,
          phoneNumber: phoneNumber
        }
        $.post('http://localhost:3000/api/post/create/user', data, function(result){
          console.log(result.created);
          if (result.created === true){
            toastr.options.onHidden = function(){window.location.href='http://localhost:3000';}
            toastr.success("Your account has been created. Redirecting to Home page.", "Account Created!",{ timeOut: 3000, positionClass: 'toast-bottom-center'});
          } else {
            toastr.error("An error has occurred, please try again!", "Error", { timeOut: 3000, positionClass: 'toast-bottom-center'})
          }
        });
      }
    }
  }
})

$("#txtPhoneNumber").on('blur', function(){
  $("#btnSubmit").attr("disabled","disabled");
  var string = $("#txtPhoneNumber").val();
  string = string.replace(/-/g,'').replace('(','').replace(')','');
  $("#txtPhoneNumber").val(string);
  if (!$.isNumeric(string)){
    $("#txtPhoneNumber").parent().parent().addClass("has-danger");
    toastr.error("Please enter a valid phone number.","",{ timeOut: 3000, positionClass: 'toast-bottom-center'});
  } else {
    $("#btnSubmit").removeAttr("disabled");
    $("#txtPhoneNumber").parent().parent().removeClass("has-danger");
  }
})

function hasUpperCase(str){
  if (str.toLowerCase() != str){
    return true;
  }
  return false;
}
