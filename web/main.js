function signin (e) {
	console.log("click");
}

var secret_stuff = JSON.parse("secret_stuff.json");

Anvil.configure({
        issuer:       secret_stuff["ISSUER"],
        client_id:    secret_stuff["CLIENT_ID"],
        redirect_uri: secret_stuff["REDIRECT_URI"],
        display:      'page',
        scope:        'realm'
      });


var signin = document.getElementById("signin");

Anvil.deserialize();
var response = (location.hash) ? Anvil.parseFormUrlEncoded(location.hash.substring(1)) : {};
if (location.hash) {
Anvil.getKeys().then(function (keys) {
  function success (session) {
    console.log('RP CALLBACK SUCCESS', session, Anvil.sessionState);
  }
  function failure (fault) {
    console.log('RP CALLBACK FAILURE', fault);
  }
  Anvil.callback(response).then(success, failure)
})
}

signin.addEventListener("click", function (){
	Anvil.authorize()
});

var data = document.getElementById("data");

data.addEventListener("click", function (){

  $.ajax({
      url: secret_stuff["DATA_SERVICE_URI"],
      dataType : 'jsonp',
      beforeSend : function(xhr) {
        var t = "Bearer " + Anvil.session.id_token;
        // set header
        xhr.setRequestHeader("Authorization", t);
      },
      error : function(error) {
        // error handler
        console.dir(error);
        $('#stuff').text(error);
      },
      success: function(data) {
          // success handler
          $('#stuff').text(data);
      }
  });
});