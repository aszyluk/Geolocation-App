if ("geolocation" in navigator) {
  const geo = navigator.geolocation;
  const map = L.map("map").setView([0, 0], 1);
  const attr =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tiles = L.tileLayer(tileUrl, { attr }).addTo(map);

  const marker = L.marker([0, 0]).addTo(map);
  tiles.addTo(map);

  geo.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("lat").innerText = lat;
    document.getElementById("lon").innerText = lon;

    marker.setLatLng([lat, lon]);
  });
} else {
  prompt("You need geolocation enabled to properly utilize this website.");
}
