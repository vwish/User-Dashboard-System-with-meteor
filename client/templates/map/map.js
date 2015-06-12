Markers = new Mongo.Collection('markers');
Ofceaddress = new Mongo.Collection('ofceaddress');

if (Meteor.isClient) {

    Meteor.subscribe("Ofceaddress");


    Template.map.onCreated(function() {
        GoogleMaps.ready('map', function(map) {
            google.maps.event.addListener(map.instance, 'click', function(event) {
                Markers.insert({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });
            });

            var markers = {};

            Markers.find().observe({
                added: function(document) {
                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        map: map.instance,
                        id: document._id
                    });

                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        Markers.update(marker.id, {
                            $set: {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            }
                        });
                    });

                    markers[document._id] = marker;
                },
                changed: function(newDocument, oldDocument) {
                    markers[newDocument._id].setPosition({
                        lat: newDocument.lat,
                        lng: newDocument.lng
                    });
                },
                removed: function(oldDocument) {
                    markers[oldDocument._id].setMap(null);
                    google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                    delete markers[oldDocument._id];
                }
            });
        });
    });

    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.map.helpers({
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                return {
                    center: new google.maps.LatLng(30.727325, 76.84558900000002),
                    zoom: 8
                };
            }
        }
    });


    Template.edit_office_location.helpers({

        office_address: function() {
            return Meteor.user().profile.address;
        },
        office_number: function() {
            return Meteor.user().profile.office_number;
        },
        office_summery: function() {
            return Meteor.user().profile.office_summery;
        }


    });


    Template.office_location.helpers({
       
    });

    Template.edit_office_location.events({
        'submit form': function(event) {
            event.preventDefault();
            //console.log('form submitted');
            var postContent = $('#officeadress').val();
            console.log(postContent);
            //console.log(event.type);
            Ofceaddress.insert({ 

                profile: { 
                    address: postContent
                }
            },
                function(error,result){
                    if(error) console.log(error);
                    if(result) console.log(result)
                })
           
        }
            
        });
    }

