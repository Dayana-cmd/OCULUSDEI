let clic = ""
L.mapbox.accessToken = 'pk.eyJ1Ijoib3NjYXJvc2Nhcm9zY2Fyb3NjYXIiLCJhIjoiY2pscXp1NHM4MDFkODN3cXJ1NHJuY293MiJ9.MNHB5b1jTBewBGnlgcj1tQ';
var map = L.mapbox.map('map', 'mapbox.streets')
let bool = true;


//  function paginacion(callback) {  
//     let a = L.control.locate().addTo(map)
//     callback(a)
//  }

//  paginacion(posicionamiento);

//  function posicionamiento(a){
//     console.log(a._map._layers[27]._layers[43]._latlng)
//  }

let a = L.control.locate().addTo(map)

try {
    tiempoPosicion()
} catch (error) {
    console.log(error)
}

function tiempoPosicion(){
    setTimeout(function(){
        console.log(a._map._layers[27]._layers[43]._latlng)
     },3000); // 3000ms = 3s
}
  
    

//otro Metodo
// navigator.geolocation.getCurrentPosition(function (position) {
//     var lon = position.coords.longitude;
//     var lat = position.coords.latitude;
//     console.log('Your location: ' + lon + ',' + lat)
// })

// map.on('mousemove click', function (e) {
//     // console.log(e.latlng.toString());
//     // guardarTaller('taller','aa',e.latlng)
// });

// var featureLayer = L.mapbox.featureLayer()
//     // .loadURL('https://wanderdrone.appspot.com/')
    
//     // Once this layer loads, we set a timer to load it again in a few seconds.
//     .on('ready', run)
//     .addTo(map);

// function run() {
//     featureLayer.eachLayer(function(L) {
//         //  map.panTo(L.getLatLng());    //Movimiento
//     });
//     window.setTimeout(function() {
//         getUserLocation();
//     }, 100);
// }

navigator.geolocation.getCurrentPosition(function(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    console.log('Your location: ' + lon + ',' + lat);
  });


//Base de Datos
let db = firebase.database().ref("Talleres/");

function guardarTaller(ubicacion) {
    let nombre = document.getElementById('agregarTaller').value;
    let descripcion = document.getElementById('agregarDescripcion').value;
    let tipo = document.getElementById('agregarTipo').value;

    let datosTaller = {
        nombre: nombre,
        descripcion: descripcion,
        tipo: tipo,
        ubicacion: ubicacion
    };

    db.push().set(datosTaller, function (error) {
        if (error) {
            console.log(error, "La sincronización falló");
        } else {
            console.log(error, "La sincronización ha sido exitosa");
        };
    })
}


function mostrarTaller() {
    db.on(
        "value",
        function (snapshot) {
            var taller = snapshot.val();
            let datos = {}
            datos.Array = new Array()
            let icono = ""
            let color = ""
            for (key in taller) {
                // L.marker([taller[key].ubicacion.lat, taller[key].ubicacion.lng], {
                //     icon: L.mapbox.marker.icon({
                //         'marker-size': 'small',
                //         'marker-symbol': 'bus',
                //         'description': `<strong>'a'</strong>${taller[key].descripcion}<p></p>
                //             <div><btn value="Como Llegar"></div>
                //             <div><btn value="Como Llegar"></div>`, 
                //         'marker-color': '#fa0',
                //     })
                // }).addTo(map);
                if (taller[key].tipo.toUpperCase() == 'MECANICO') {
                    icono = "rail-metro"
                    color = '#fa0'
                }
                if (taller[key].tipo.toUpperCase() == 'ELECTRICO') {
                    icono = "car"
                    color = '#513EF3'
                }
                if (taller[key].tipo.toUpperCase() == 'GOMERO') {
                    icono = "scooter"
                    color = '#A0E9EC'
                }
                if (taller[key].tipo.toUpperCase() == 'GRUA') {
                    icono = "bus"
                    color = '#FB4040'
                }
                datos.Array.push({
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "marker-color": `${color}`,
                            "marker-size": "small",
                            "marker-symbol": `${icono}`,
                            "description": `<strong class="nombreTaller">${taller[key].nombre}</strong><p class="descrip">${taller[key].descripcion}</p><p class="tipo">${taller[key].tipo}</p>
                          <div class="boton-popup"><input type='button' class='btn comollegar' value='Como Llegar'><a href="https://friendlychat-198ae.firebaseapp.com" type='button' class='btn btn-info' value='Chat'>Pedir Ayuda!</a></div>`,
                            "CAT_CODE": `${taller[key].tipo}`
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                taller[key].ubicacion.lng,
                                taller[key].ubicacion.lat
                            ]
                        }
                    }]
                })
            }


            map.featureLayer.setGeoJSON(datos.Array)
            if (bool) {
                makeCheckboxes()
            }



        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )
}


 mostrarTaller()

//Modal
var click = document.getElementById("click"),
    mousemove = document.getElementById("mousemove");

const $overlay = document.getElementById('overlay');
const $modal = document.getElementById('modal');
const $cancelar = document.getElementById('cancelar');
const $guardar = document.getElementById('guardar');
const $like = document.getElementById('like');

map.on("click", function (e) {
    clic = e
    $overlay.classList.toggle('active');
    $modal.style.animation = 'modalIn .8s forwards';
    $like.style.animation = '';
});

$overlay.addEventListener('click', () => {
    $overlay.classList.toggle('active');
    $modal.style.animation = 'modalOut .8s';
});
$cancelar.addEventListener('click', () => {
    $overlay.classList.toggle('active');
    $modal.style.animation = 'modalOut .8s';

})
$guardar.addEventListener('click', () => {
    console.log(clic.latlng)
    guardarTaller(clic.latlng)
    alert('marcador guardaro');
    $overlay.classList.toggle('active');
    $modal.style.animation = 'modalOut .8s';
    $like.style.animation = 'like 1.2s linear';
})


// Find and store a variable reference to the list of filters.
var filters = document.getElementById('filters');

// Wait until the marker layer is loaded in order to build a list of possible
// types. If you are doing this with another featureLayer, you should change
// map.featureLayer to the variable you have assigned to your featureLayer.
var makeCheckboxes = function () {
    bool = false
    // Collect the types of symbols in this layer. you can also just
    // hardcode an array of types if you know what you want to filter on,
    // like var types = ['foo', 'bar'];
    var typesObj = {},
        types = [];

    map.featureLayer.eachLayer(function (entity) {
        typesObj[entity.feature.properties['CAT_CODE']] = true;
    })
    for (var k in typesObj) types.push(k);

    var checkboxes = [];
    // Create a filter interface.
    for (var i = 0; i < types.length; i++) {
        // Create an an input checkbox and label inside.
        var item = filters.appendChild(document.createElement('div'));
        var checkbox = item.appendChild(document.createElement('input'));
        var label = item.appendChild(document.createElement('label'));
        checkbox.type = 'checkbox';
        checkbox.id = types[i];
        checkbox.checked = true;
        // create a label to the right of the checkbox with explanatory text
        label.innerHTML = types[i];
        label.setAttribute('for', types[i]);
        // Whenever a person clicks on this checkbox, call the update().
        checkbox.addEventListener('change', update);
        checkboxes.push(checkbox);
    }

    // This function is called whenever someone clicks on a checkbox and changes
    // the selection of markers to be displayed.
    function update() {
        var enabled = {};
        // Run through each checkbox and record whether it is checked. If it is,
        // add it to the object of types to display, otherwise do not.
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) enabled[checkboxes[i].id] = true;
        }
        map.featureLayer.setFilter(function (feature) {
            // If this symbol is in the list, return true. if not, return false.
            // The 'in' operator in javascript does exactly that: given a string
            // or number, it says if that is in a object.
            // 2 in { 2: true } // true
            // 2 in { } // false
            return (feature.properties['CAT_CODE'] in enabled);
        });
    }
}


// Ruta
map.attributionControl.setPosition('bottomleft');

// create the initial directions object, from which the layer
// and inputs will pull data.
var directions = L.mapbox.directions();

var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);

var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
    .addTo(map);

var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(map);