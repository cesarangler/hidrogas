// Initialize app
//var myApp = new Framework7();
var myApp = new Framework7({
  dialog: {
    // set default title for all dialog shortcuts
    title: 'Hidrogas',
    // change default "OK" button text
    buttonOk: 'Ok',
    buttonCancel: 'Cancelar'  
  }
});

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
    
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
            mainView.router.loadPage('ty_pedidos.html');
            
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

//    alert('Latitude: '          + position.coords.latitude          + '\n' +
//          'Longitude: '         + position.coords.longitude         + '\n' +
//          'Altitude: '          + position.coords.altitude          + '\n' +
//          'Accuracy: '          + position.coords.accuracy          + '\n' +
//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//          'Heading: '           + position.coords.heading           + '\n' +
//          'Speed: '             + position.coords.speed             + '\n' +
//          'Timestamp: '         + position.timestamp                + '\n');  
      
      
   // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.7380223722735!2d'+ longitude +'!3d'+ latitude +'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce7590496bcbc1%3A0x241ceac1db1c6ca1!2s!5e0!3m2!1ses-419!2smx!4v1540924987641" width="300" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>';
       output.innerHTML = '<p>Latitude: ' + latitude + '° <br>Longitude: ' + longitude + '°</p><iframe src="http://maps.google.com/maps?q='+ latitude +', '+ longitude +'&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>';
      $$('.lat_val').val(latitude);
      $$('.long_val').val(longitude);
     
      
  //   initmap2(latitude, longitude);  
      
   // myApp.alert('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');  

  //  var img = new Image();
 //   img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
 //   var frame = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.7380223722735!2d'+ latitude +'!3d'+ longitude +'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce7590496bcbc1%3A0x241ceac1db1c6ca1!2s!5e0!3m2!1ses-419!2smx!4v1540924987641" width="300" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>';
//    output.innerHTML =  frame; 
  //  output.appendChild(img);
  }

  function error(error) {
    output.innerHTML = "No se puede Obtener su ubicación"+error;
   //  myApp.alert("Unable to retrieve your location");  
      
  }

  output.innerHTML = "<p>Obteniendo localización…</p>";
  var options = { enableHighAccuracy: true };
  navigator.geolocation.getCurrentPosition(success, error, options);
    
}


function initmap2(glat, glong){
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([glat, glong]),
          zoom: 4
        })
      });
    
}

function initMap(glat, glong) {
  // The location of Uluru
  var uluru = {lat: glat, lng: glong};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}


function valida(tipo){
//	$$(".error").remove();
	  
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    
	 if( $$(".frm_nombre").val() == ""){
         //   $$(".frm_nombre").focus().after("<span class='error'>Ingrese un Nombre</span>");
          myApp.alert('Ingrese un Nombre '); 
            return false;
        }else if( $$(".frm_tel").val() == ""){
       //     $$(".frm_tel").focus().after("<span class='error'>Ingrese un teléfono</span>");
             myApp.alert('Ingrese un teléfono '); 
            return false;
         }else if( $$(".frm_dir").val() == "" ){
         //   $$(".frm_dir").focus().after("<span class='error'>Ingrese una Dirección</span>");
             myApp.alert('Ingrese una Dirección');  
            return false;
         }else {return true;}
       
		
}
//
//
//                FACTURACION
//
//


// CLICK LEVANTAR PEDIDOS
$$(document).on("click", ".pedir_factura", function(){
    
//    var file_data = $$('#FcImage').prop('files')[0];   
    var formData_frm = $$.serializeObject(myApp.formToJSON($$("#factura-form"))); 
//    formData.append('file', file_data);
    var formData = new FormData();
   
    formData.append('data', formData_frm); 
 //    formData.append('file', file_data); //append file to FormData
    
 //    myApp.alert('Datos : '+formData); 
    var tipo = $$('.frm_tipo').val();
    var validacion = valida_factura(tipo);
//	alert (validacion);
	if(validacion){    
    
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
      //  dataType: 'text',  // what to expect back from the PHP script, if anything
        data: formData_frm,
        success: function(response){
          //  myApp.alert('Datos recibidos : '+response); 
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


function valida_factura(tipo){
//	$$(".error").remove();
	  
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
     var rfc_regex = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
    
	 if( $$(".frm_nombre").val() == ""){
         //   $$(".frm_nombre").focus().after("<span class='error'>Ingrese un Nombre</span>");
          myApp.alert('Ingrese un Nombre o razón social'); 
            return false;
        }else if( $$(".frm_rfc").val() == "" && !rfc_regex.test($$(".frm_rfc").val()) ){
           myApp.alert("Ingrese un RFC Correcto.");
            return false;
         }else if( $$(".frm_mail").val() == "" && !emailreg.test($$(".frm_mail").val()) ){
           myApp.alert("Ingrese un email Correcto.");
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
    destinationType: Camera.DestinationType.FILE_URI });
 //   getImage();
});
function onSuccess() {
    myApp.alert("Camera cleanup success..");
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
     myApp.alert('Failed because: ' + message);
}


function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function(message) {
                alert('get picture failed');
            },{
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
    );

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
    
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
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
    
        $$.ajax({
        url: 'https://hidrogasdecuernavaca.com/hidro-data/get.php',
        method: 'POST',
    //	dataType: 'json',
    //	contentType: 'application/json',
        data: formData,
        success: function(response){
        //    myApp.alert('Datos recibidos : '+response); 
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

