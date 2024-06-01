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

  const initializeMap = () => {
    const naver = window.naver;
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 13,
    };
    new naver.maps.Map(mapElement, mapOptions);
  };

  loadNavermapsScript();
});
