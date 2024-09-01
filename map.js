const script = document.createElement("script");
script.src =
  "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l5v9gdfhga&submodules=geocoder";
script.async = true;
document.head.appendChild(script);
script.onload = () => initializeMap();
const markers = [];
let markerData = [];

let lastFocusedMarker = null;
let lastUnfoucsedMarker = null;

const getReactNativeMessage = (event, map) => {
  markers.map((marker) => marker.setMap(null));

  const message = JSON.parse(JSON.parse(JSON.stringify(event.data)));
  markerData = event.data;

  if (message && message.type === "CENTER_MAP") {
    map.setCenter(new naver.maps.LatLng(message.data.lat, message.data.lng));
  }
  if (message && message.type === "CURRENT_LOCATION_PIN") {
    message?.data?.map((d) => {
      let marks = new naver.maps.Marker({
        position: new naver.maps.LatLng(d.latitude, d.longitude),
        map: map,
        icon: {
          url: "https://play-lh.googleusercontent.com/5WifOWRs00-sCNxCvFNJ22d4xg_NQkAODjmOKuCQqe57SjmDw8S6VOSLkqo6fs4zqis",
          scaledSize: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 25),
        },
      });
      markers.push(marks);
      new naver.maps.Event.addListener(marks, "click", function (e) {
        // 이전 포커스 마커 제거
        if (lastFocusedMarker) {
          lastFocusedMarker.setMap(null);
        }

        // 새로운 포커스 마커 생성
        const focusMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(d.latitude, d.longitude),
          map: map,
          icon: {
            url: "https://i.pngimg.me/thumb/f/720/comdlpng6960621.jpg",
            scaledSize: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25),
          },
        });
        lastFocusedMarker = focusMarker;

        // 메시지 전송
        postMessage({
          type: "MARKER_CLICK",
          data: {
            lat: marks.position._lat,
            lng: marks.position._lng,
            locationData: d,
          },
        });
      });
    });
  }
};

const initializeMap = () => {
  const naver = window.naver;
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 13,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
  };

  var map = new naver.maps.Map(mapElement, mapOptions);

  naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
    postMessage({
      type: "BOUNDS_CHANGED",
      data: {
        bounds,
      },
    });
  });
  const receiver = navigator.userAgent.includes("Android") ? document : window;
  receiver.addEventListener("message", (event) => getReactNativeMessage(event, map));
  postMessage({ type: "MAP_READY" });
};

const mapElement = document.getElementById("map");

const postMessage = (message) => {
  if (typeof message !== "string") message = JSON.stringify(message);
  window.ReactNativeWebView.postMessage(JSON.stringify({ corkitMessage: message }));
};
