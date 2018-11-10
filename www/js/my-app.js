// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    //Inicio para camara
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    
    myApp.alert('Here comes About page'+pictureSource);
    
    $$(document).on('click', function (e) {
    var $t = $$(e.target);
    if ( $t.is('a') && $t.hasClass('external') ) {
      e.preventDefault();
      window.open($t.attr('href'), '_system');
    }
  });
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('pedidos', function (page) {
    // Do something here for "about" page
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'pedidos') {
        // Following code will be executed for page with data-page attribute equal to "about"
       // myApp.alert('Here comes About page');
        //  myApp.alert('Here comes Pedidos page');
 //   initmap2('18.8988847','-99.1774249');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

//VOLVER A INICIO

$$(document).on("click", ".btn_inicio", function(){
    mainView.router.loadPage('index.html');
});

//      MOSTRAR PROMOCION

/*=== Default standalone ===*/
var myPhotoBrowserStandalone = myApp.photoBrowser({
    photos : [
        'https://hidrogasdecuernavaca.com/promos/promocion-actual.jpg',
    ]
});

$$('.pb-promo').on('click', function () {
    myPhotoBrowserStandalone.open();
});


// CLICK LEVANTAR PEDIDOS
$$(document).on("click", ".hacer_pedido", function(){
     //   var name  = $$(this).attr("data-name");
    //    var id = $$(this).attr("data-id");
     //   app.router.navigate("URL?name=" + name + "&id=" + id);
   // queryForm = app.formToJSON('#pedido-form');
   var formData = $$.serializeObject(myApp.formToJSON($$("#pedido-form"))); 
    var tipo = $$('.frm_tipo').val();
    var validacion = valida(tipo);
//	alert (validacion);
	if(validacion){    
     myApp.showPreloader('Enviando...');
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        cache: false,    
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
            myApp.hidePreloader(); 
            mainView.router.loadPage('ty_pedidos.html');
            
        },
        error: function(xhr, status){
            var output = document.getElementById("out");
            output.innerHTML = 'Error: '+JSON.stringify(xhr)+'ErrorStatus: '+JSON.stringify(status);
            myApp.alert('No se puede enviar la información, verifique su conexión de internet', ' ');
          //  myApp.alert('Error: '+JSON.stringify(xhr));
        //    myApp.alert('ErrorStatus: '+JSON.stringify(status));
        }
        });
    }  else {
      //   myApp.alert('Favor de ingresar todos los datos requeridos'); 
    }  
});


// CLICK LEVANTAR PEDIDOS
$$(document).on("click", ".get_location", function(){
      geoFindMe();
    //    findme2();
});


function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Este dispositivo no soporta geolocalización</p>";
   //   myApp.alert("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
      
   // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
      
      $$('.lat_val').val(latitude);
      $$('.long_val').val(longitude);
     
       output.innerHTML = '<p>¡Dirección para mapa obtenida!</p><iframe src="https://maps.google.com/maps?q='+ latitude +', '+ longitude +'&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>';
      
      //  var img = new Image();
 //   img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
//    output.innerHTML =  frame; 
  //  output.appendChild(img);
  }

  function error(error) {
    output.innerHTML = "No se puede Obtener su ubicación"+error;
   //  myApp.alert("Unable to retrieve your location");  
      
  }

  output.innerHTML = "<p>Obteniendo localización…</p>";
  var options = { enableHighAccuracy: true, timeout:10000 };
  navigator.geolocation.getCurrentPosition(success, error, options);
    
}



function valida(tipo){
//	$$(".error").remove();
	  
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    
	 if( $$(".frm_nombre").val() == ""){
         //   $$(".frm_nombre").focus().after("<span class='error'>Ingrese un Nombre</span>");
            myApp.alert('Ingrese un Nombre', ' '); 
            return false;
        }else if( $$(".frm_tel").val() == ""){
       //     $$(".frm_tel").focus().after("<span class='error'>Ingrese un teléfono</span>");
              myApp.alert('Ingrese un teléfono ', ' '); 
            return false;
         }else if( $$(".frm_dir").val() == "" ){
         //   $$(".frm_dir").focus().after("<span class='error'>Ingrese una Dirección</span>");
              myApp.alerts('Ingrese una Dirección', ' ');  
            return false;
         }else {return true;}
       
		
}
//
//
//                FACTURACION
//
//


// CLICK SOLICITAR FACTURA
$$(document).on("click", ".pedir_factura", function(){
    
    
    
 //    formData.append('file', file_data); //append file to FormData
    
   //  myApp.alert('Datos : '+formData); 
    var tipo = $$('.frm_tipo').val();
    var validacion = valida_factura(tipo);
//	alert (validacion);
	if(validacion){    
     myApp.showPreloader('Procesando imagen y enviando datos...');
        
        if ($$('#myImage').prop('files')){
         var file_data = $$('#myImage').prop('files')[0]; 
    }else if ($$('#FcImage').prop('files')){
        var file_data = $$('#FcImage').prop('files')[0]; 
    }else
        {
           var file_data = '';
        }
    var img = document.getElementById('Recibo_img');
    var file_base =getBase64Image(img);
 //   var file_img = img.files[0];
      
    var formData_frm = $$.serializeObject(myApp.formToJSON($$("#factura-form"))); 
    
    var formData = new FormData();
    formData.append('file', file_data);
    formData.append('foto', file_base); 
    formData.append('data', formData_frm); 
        
        
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
        processData: false,
        contentType: false,
        cache: false,    
    //	dataType: 'json',
    //	contentType: 'application/json',
      //  dataType: 'text',  // what to expect back from the PHP script, if anything
        data: formData,
        success: function(response){
            myApp.hidePreloader();  
        //     var output = document.getElementById("out");
        //    output.innerHTML = 'Response: '+response;
            mainView.router.loadPage('ty_facturacion.html');
            
        },
        error: function(xhr, status){
            myApp.alert('Error: '+JSON.stringify(xhr));
            myApp.alert('ErrorStatus: '+JSON.stringify(status));
        }
        });
    }  else {
      //   myApp.alert('Favor de ingresar todos los datos requeridos'); 
    }  
});

function getBase64Image(img) {
  // Create an empty canvas element
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function encodeImagetoBase64(element) {

	  var file = element.files[0];

	  var reader = new FileReader();

	  reader.onloadend = function() {

	    $(".link").attr("href",reader.result);

	    $(".link").text(reader.result);

	  }

	  reader.readAsDataURL(file);

	}


function valida_factura(tipo){
//	$$(".error").remove();
	  
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
     var rfc_regex = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
    
	 if( $$(".frm_nombre").val() == ""){
         //   $$(".frm_nombre").focus().after("<span class='error'>Ingrese un Nombre</span>");
          myApp.alert('Ingrese un Nombre o razón social', ' '); 
            return false;
        }else if( $$(".frm_rfc").val() == "" && !rfc_regex.test($$(".frm_rfc").val()) ){
           myApp.alert("Ingrese un RFC Correcto.", ' ');
            return false;
         }else if( $$(".frm_mail").val() == "" && !emailreg.test($$(".frm_mail").val()) ){
           myApp.alert("Ingrese un email Correcto.", ' ');
            return false;
         }
//        else if( $$(".frm_dir").val() == "" ){
//             myApp.alert('Ingrese una Dirección');  
//            return false;
//         }
    else {return true;}
       
		
}
$$(document).on("click", ".get_picture", function(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA,
    encodingType : Camera.EncodingType.JPEG});
 //   getImage();
});
$$(document).on("click", ".get_photo", function(){
    getPhoto(pictureSource.PHOTOLIBRARY);
 //   getImage();
});


function onSuccess(imageData) {
  //  myApp.alert("Camera cleanup success..");
 //   var image = document.getElementById('myImage');
//    image.src = imageURI;
    //    var largeImage = document.getElementById('Recibo_img');
     //   largeImage.style.display = 'block';
      //  largeImage.src = imageData;
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
        smallImage.src = "data:image/jpeg;base64," + imageData;
    //    var image_frm = document.getElementById('Foto_up');
        $$(".frm_foto_b64").val(imageData);
}

function onFail(message) {
     myApp.alert('No se seleccionó ninguna imágen ', ' ');
}



    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
        destinationType: destinationType.DATA_URL,
        sourceType: source });
        
    }



//
//
//                FUGAS
//
//


// CLICK REPORTAR FUGA
$$(document).on("click", ".hacer_reporte", function(){

   var formData = $$.serializeObject(myApp.formToJSON($$("#fugas-form"))); 
    var tipo = $$('.frm_tipo').val();
    var validacion = valida(tipo);

	if(validacion){    
     myApp.showPreloader('Enviando...');
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
            myApp.hidePreloader(); 
            mainView.router.loadPage('ty_fugas.html');
            
        },
        error: function(xhr, status){
            myApp.alert('Error: '+JSON.stringify(xhr));
            myApp.alert('ErrorStatus: '+JSON.stringify(status));
        }
        });
    }  else {
      //   myApp.alert('Favor de ingresar todos los datos requeridos'); 
    }  
});


//
//
//                ASESORIA Y COTIZACIÓNES
//
//


// CLICK ASESORIA
$$(document).on("click", ".solicita_asesoria", function(){

   var formData = $$.serializeObject(myApp.formToJSON($$("#asesoria-form"))); 
    var tipo = $$('.frm_tipo').val();
    var validacion = valida(tipo);

	if(validacion){    
     myApp.showPreloader('Enviando...');
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
            myApp.hidePreloader(); 
            mainView.router.loadPage('ty_asesoria.html');
            
        },
        error: function(xhr, status){
            myApp.alert('Error: '+JSON.stringify(xhr));
            myApp.alert('ErrorStatus: '+JSON.stringify(status));
        }
        });
    }  else {
      //   myApp.alert('Favor de ingresar todos los datos requeridos'); 
    }  
});

