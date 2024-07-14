document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("map");

  const loadNavermapsScript = () => {
    if (window.naver && window.naver.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l5v9gdfhga&submodules=geocoder";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => initializeMap();
  };
  console.log("hi");

  const initializeMap = () => {
    const naver = window.naver;
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 13,
    };
    var map = new naver.maps.Map(mapElement, mapOptions);
    let markers = [
      {
        position: new naver.maps.LatLng(37.3595704, 127.085399),
      },
      {
        position: new naver.maps.LatLng(37.3415704, 127.095399),
      },
      {
        position: new naver.maps.LatLng(37.3455704, 127.114399),
      },
      {
        position: new naver.maps.LatLng(37.3495704, 127.106399),
      },
      {
        position: new naver.maps.LatLng(37.3335704, 127.105399),
      },
    ];

    markers.map((marker) => {
      let mark = new naver.maps.Marker({
        position: marker.position,
        map: map,
      });
      new naver.maps.Event.addListener(mark, "click", function (e) {
        map.panTo(marker.position);
      });
    });
  };

  loadNavermapsScript();
});
