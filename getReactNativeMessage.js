export const getReactNativeMessage = (event) => {
  alert("current location pin", JSON.stringify(event));
  const naver = window.naver;
  const mapOptions = {
    zoom: 12,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
  };
  var map = new naver.maps.Map(mapElement, mapOptions);
  const message = JSON.parse(JSON.parse(JSON.stringify(event.data)));
  console.log("Received message from React Native:", message);
  // 원하는 작업 수행
  if (message && message.type === "CENTER_MAP") {
  }
  if (message && message.type === "CURRENT_LOCATION_PIN") {
    alert("current location pin", JSON.stringify(message?.data));
    message?.data?.map((d) => {
      let mark = new naver.maps.Marker({
        position: new naver.maps.LatLng(d.latitude, d.longitude),
        map: map,
      });
      // new naver.maps.Event.addListener(mark, "click", function (e) {
      //   map.panTo(marker.position);
      //   postMessage({
      //     type: "MARKER_CLICK",
      //     data: {
      //       lat: marker.position._lat,
      //       lng: marker.position._lng,
      //     },
      //   });
      // });
    });
  }
  const { lat, lng } = message;
  const newCenter = new naver.maps.LatLng(lat, lng);
  map.panTo(newCenter);
};
