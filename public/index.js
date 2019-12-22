if ("geolocation" in navigator) {
  const geo = navigator.geolocation;
  const map = L.map("map").setView([0, 0], 1);
  const attr =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tiles = L.tileLayer(tileUrl, { attr }).addTo(map);

  const marker = L.marker([0, 0]).addTo(map);
  const issIcon = L.icon({
    iconUrl: "iss.png",
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94] // point of the icon which will correspond to marker's location
  });
  const issMark = L.marker([0, 0], { icon: issIcon }).addTo(map);
  tiles.addTo(map);

  geo.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("lat").innerText = lat;
    document.getElementById("lon").innerText = lon;

    marker.setLatLng([lat, lon]);
  });

  async function getISSData() {
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    const data = await response.json();

    const lon = data["iss_position"].longitude;
    const lat = data["iss_position"].latitude;
    issMark.setLatLng([lat, lon]);
  }
  getISSData();
  setInterval(getISSData, 5000);
} else {
  prompt("You need geolocation enabled to properly utilize this website.");
}
