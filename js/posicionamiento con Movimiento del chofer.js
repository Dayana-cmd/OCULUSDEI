L.mapbox.accessToken = 'pk.eyJ1Ijoib3NjYXJvc2Nhcm9zY2Fyb3NjYXIiLCJhIjoiY2pscXp1NHM4MDFkODN3cXJ1NHJuY293MiJ9.MNHB5b1jTBewBGnlgcj1tQ';
var map = L.mapbox.map('map', 'mapbox.streets')

// As with any other AJAX request, this technique is subject to the Same Origin Policy:
// http://en.wikipedia.org/wiki/Same_origin_policy
var featureLayer = L.mapbox.featureLayer()
    .loadURL('https://wanderdrone.appspot.com/')
    // Once this layer loads, we set a timer to load it again in a few seconds.
    .on('ready', run)
    .addTo(map);
    L.control.locate().addTo(map);
function run() {
    featureLayer.eachLayer(function(user) {
        // map.panTo(user.getLatLng());    //llevar la vista a la ubicacio tuya
        console.log(user.getLatLng())
    });
    window.setTimeout(function() {
        featureLayer.loadURL('https://wanderdrone.appspot.com/');
    }, 100);
}



//array de objetos

function talleres(nombre,ubicacion){
        this.nombre = nombre;
        this.ubicacion= {lat:ubicacion.lat, lng:ubicacion.l};
    }
    
    datosTaller = [];
    
    function meterTalleres(){
        let taller = new talleres('oscar','lejos')
        datosTaller.push(taller)
        mostrarTalleres()
    }
    meterTalleres()
    
    function mostrarTalleres(){
        for(let v = 0;v<datosTaller.length;v++){
            console.log(datosTaller[v])
        }
    }