function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function callGetAllWeatherDetailsByStation(){
    let id_station = $('#station').find(":selected").val();
    console.log(id_station)
    getAllWeatherDetailsByStation(id_station)
}



function getAllWeatherDetailsByStation(id_station){
    let csrftoken = getCookie('csrftoken')
    $.ajax({
        type: "POST",
        url: `/getAllWeatherDetailsByStation/${id_station}/`,
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        data: {},
        success: function(response) {

        },
    });

}
function getAllWeatherDetails(){
    let csrftoken = getCookie('csrftoken')
    $.ajax({
        type: "GET",
        url: `/getAllWeatherDetails/`,
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        data: {},
        success: function(response) {
            let data = response["data"];
            // console.log(response["data"]);
            leaflet(data)
        },
    });

}

function getAllStationNamesByCountry(pays){
    let csrftoken = getCookie('csrftoken')
    $.ajax({
        type: "POST",
        url: `/getAllStationNamesByCountry/${pays}/`,
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        data: {},
        success: function(response) {
            let log_unique_par_type = [];
            let field ='';
            let instances = response["data"];
            instances.forEach((inst) => {
                if (log_unique_par_type.includes(inst["fields"]["station_name"]) === true){
                }
                else{
                    log_unique_par_type.push(inst["fields"]["station_name"])
                }
            })

            let frontField = '';
            log_unique_par_type.forEach((inst) => {
                frontField+=
                    `
                        <option value="${inst}" >${inst}</option>
                    `
            });
            $("#select_station_name").html(frontField);
        },
    });

}




function getAllStationDatesByCountry(station){
    let csrftoken = getCookie('csrftoken')
    $.ajax({
        type: "POST",
        url: `/getAllStationDatesByCountry/${station}/`,
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        data: {},
        success: function(response) {
            let log_unique_par_type = [];
            let field ='';
            let instances = response["data"];
            console.log(instances);
            instances.forEach((inst) => {
                if (log_unique_par_type.includes(inst["fields"]["date"]) === true){
                }
                else{
                    log_unique_par_type.push(inst["fields"]["date"])
                }
            })

            let frontField = '';
            console.log(log_unique_par_type)
            log_unique_par_type.forEach((inst) => {
                frontField+=
                    `
                        <option value="${inst}" >${inst}</option>
                    `
            });
            console.log(frontField)
            $("#select_station_periode").html(frontField);
        },
    });

}







function onChangeCountrySelect(){
    let selectedCountryValue
    let selectedCountry = document.getElementById('select_station_pays');
    selectedCountry.addEventListener('change', function() {
        $("#select_station_pays option:selected").each(function () {
            selectedCountryValue = $(this).val();
            (getAllStationNamesByCountry(selectedCountryValue));
        });
    });
//    Cote dates
    let selectedStationValue;
    let selectedStation = document.getElementById('select_station_name');
    selectedStation.addEventListener('change', function() {
        $("#select_station_name option:selected").each(function () {
            selectedStationValue = $(this).val();
            (getAllStationDatesByCountry(selectedStationValue));
        });
    });
}


function leaflet(data) {
    let centre = [36.7753606, 3.0601882];
    let map = L.map('map').setView(centre, 2);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 2,
    }).addTo(map)

    let greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    let blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    /**
     * REDA
     * Globals variables
     * Pour qu'on est accès dans tout le Code
     */
    let markersLayerBox = new L.LayerGroup();
    let markersLayers = new L.LayerGroup();
    let markersLayerBrand = new L.LayerGroup;
    /**
     * Function d'ajout de markers sur les différentes villes des différents points de ventes au chargement de la page
     */
    let element;
    let markersLayersLoading = new L.LayerGroup();
    map.addLayer(markersLayersLoading);
    let marker = [];

    for (let k = 0; k < data.length; k++) {
        marker[k] = new L.Marker((data[k].loc), {
            icon: blueIcon
        }).on("click", function (e) {
            element = '';
            let storeDetails = document.getElementById("station_info");
            element = afficheDetails(data[k])
            storeDetails.innerHTML = element;
        });
        marker[k].on('click', function (e) {
            map.removeLayer(markersLayerBrand);
            for (l in marker) {
                if (marker[l].options.icon.options.iconUrl == "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png") {
                    marker[l].setIcon(blueIcon)
                }
            }
            marker[k].setIcon(greenIcon)
        })
        markersLayersLoading.addLayer(marker[k]);

    }



    /**####################################################################################################################################################################################
     * ###################################################################################################################################################################################*/
    /**
     * Function Au changement du select, filtre par marque
     **/
    let markerSelect = [];
    map.addLayer(markersLayers);
    let selectedBrandValue;
    // let item = document.getElementsByClassName('brand-marque');
    let selectedBrand = document.getElementById('station');
    selectedBrand.addEventListener('change', function() {
        $("#station option:selected" ).each(function() {
            let storeDetails = document.getElementById("station_info");
            storeDetails.innerHTML = '';
            selectedBrandValue = $(this).val();

        });
        console.log(selectedBrandValue)
        let markers = [];
        map.removeLayer(markersLayers);
        map.removeLayer(markersLayerBrand);
        map.removeLayer(markersLayersLoading);
        map.removeLayer(markersLayerBox);
        markersLayers = new L.LayerGroup();
        map.addLayer(markersLayers)
        for (i in data) {
            if (selectedBrandValue == data[i].station_id) {
                markers.push(data[i])
                for (let j = 0; j < markers.length; j++) {
                    markerSelect[j] = new L.Marker(markers[j].loc, {
                        icon: blueIcon
                    }).on("click", function(e) {
                        map.removeLayer(markersLayerBrand)
                        for (f in markerSelect) {
                            if (markerSelect[f].options.icon.options.iconUrl == "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png") {
                                markerSelect[f].setIcon(blueIcon)
                            }
                        }
                        markerSelect[j].setIcon(greenIcon)
                        element = '';
                        let storeDetails = document.getElementById("station_info");
                        element = afficheDetails(markers[j])
                        storeDetails.innerHTML = element;
                    });
                    // marker[j].bindPopup(markers[j].ville);
                    markersLayers.addLayer(markerSelect[j]);
                }
            }
            if (selectedBrandValue == 'all') {
                markers.push(data[i])
                for (let q = 0; q < markers.length; q++) {
                    markerSelect[q] = new L.Marker(markers[q].loc, {
                        icon: blueIcon
                    }).on("click", function(e) {
                        map.removeLayer(markersLayerBrand)
                        for (s in markerSelect) {
                            if (markerSelect[s].options.icon.options.iconUrl == "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png") {
                                markerSelect[s].setIcon(blueIcon)
                            }
                        }
                        markerSelect[q].setIcon(greenIcon)
                        element = '';
                        let storeDetails = document.getElementById("station_info");
                        element = afficheDetails(markers[q])
                        storeDetails.innerHTML = element;
                    });
                    // marker[i].bindPopup( data[i].ville);
                    markersLayers.addLayer(markerSelect[q]);
                }
            }
        }
    })

}

function afficheDetails(data) {
    let element = "<div class=\"card border-0 shadow logs-card\" style=\"width: 100%; margin-top: 3.5%; \">\n"
    element +="                    <div class=\"card-body\">\n"
    element +="                        <h5 class=\"card-title\">"  + data.station_name + "</h5>\n"
    element +="                       <h6 class=\"card-subtitle mb-2 text-muted\">" + data.station_id + "</h6>\n"
    element +="                       <p class=\"card-text\">" + " <i class=\"fas fa-temperature-high\"></i> " + "<b>Température : </b>" + data.tmp_measure + "°" + "</p>\n"
    element +="                       <p class=\"card-text\">"+ " <i class=\"fa fa-wind\"></i> "  + "<b>Vitesse du vent : </b>" + data.wind_measure + "km/h" + "</p>\n"
    element +="                    </div>\n"
    element +="                </div>";
    return element
}



$(document).ready(function () {
    getAllWeatherDetails();
    onChangeCountrySelect();
})