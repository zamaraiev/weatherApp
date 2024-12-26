import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";

export default function Map(){
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>()
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {
        center: {lat: 53.09935326972206, lng:8.766035568553951},
        zoom: 10,
      }))
    }
    if(map && !markerCluster){
      map.addListener('click', (e: google.maps.MapMouseEvent)=> {
        if(e.latLng){
          const {lat, lng} = e.latLng
          setMarker({lat: lat(), lng: lng()})
        }
      })
      setMarkerClusters(new MarkerClusterer({map, markers: [], }));
    }
  }, [map, markerCluster])
  
  useEffect(()=> {
    if(marker && markerCluster){
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: {lat: marker.lat, lng: marker.lng}
        })
      )
    }
  }, [marker, markerCluster])

  return (
    <>
      <div ref={ref as any} style={{height: "100%", width: "100%", maxHeight:"70%"}} ></div>
    </>
  )
}