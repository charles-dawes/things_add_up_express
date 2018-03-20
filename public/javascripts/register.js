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
    }
  }
})
