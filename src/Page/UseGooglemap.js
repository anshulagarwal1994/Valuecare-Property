import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

// based on https://developers.google.com/maps/documentation/javascript/adding-a-google-map
const uluru = { lat: -25.274399, lng: 133.775131 };

var location = [];
const UseGooglemap = React.memo(function Map(props) {
  location = props.locationlist;
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyBwg_LyNB9AsizTdmTEX2gp-TydKCxFv84",
    {
      zoom: 4,
      center: uluru,
    }
  );
  if (map) {
    // Execute when the map object is ready
    location.forEach(markerData => {
      // new google.maps.Marker({
      //   position: markerData.position,
      //   map,
      //   title: markerData.title,
      // });

      // new google.maps.InfoWindow({
      //   content: "<p>Hello</p>",
      //   ariaLabel: "Uluru",
      // });

    

      const makeData = '<div class="map-callout"> <div class="pm-list-box"> <div class="pm-image"> <span> <img src="'+markerData.imageUrl+'" alt="Property Image"></img> </span> </div><div class="pm-content"> <div class="pm-category"> <span>INDEOENDENT LIVING</span> </div><div class="pm-name"> <h3>'+markerData.title+'</h3> </div><div class="pm-location"> <p>'+markerData.shortDes+'</p></div><div class="pm-avail"> <span><b>'+markerData.bedroom+'</b> Bedreooms</span> <span><b>'+markerData.bathroom+'</b> Bathrooms</span> </div><div class="pm-more"><a href="'+markerData.id+'">Learn more</a></div></div></div></div>'

      const contentString = makeData
        

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Uluru",
      });

      console.log("markerData.position = ",markerData);

      const marker = new google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
  }
  return (
      <div className="map-div" ref={ref} />
  );
});
export default UseGooglemap;
