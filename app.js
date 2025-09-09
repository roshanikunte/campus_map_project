// Initialize Map
const map = L.map('map').setView([19.8681, 75.3247], 17);

// Add Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Campus Locations
const locations = [
  { name: "library", lat: 19.8681, lng: 75.3247, info: "LAB-10:00-05:30" },
  { name: "main gate 1", lat: 19.8689, lng: 75.3240, info: "Main Gate" },
  { name: "ground", lat: 19.8644, lng: 75.3236, info: "Cricket Ground" },
  { name: "geca", lat: 19.8685, lng: 75.3239, info: "Main Entrance Center" },
  { name: "main gate 2", lat: 19.8688, lng: 75.3235, info: "Main Gate" },
  { name: "bbc", lat: 19.8681, lng: 75.3239, info: "Basketball Court" },
  { name: "vbc", lat: 19.8683, lng: 75.3243, info: "Volleyball Court" },
  { name: "mach lab", lat: 19.8678, lng: 75.3239, info: "Mechanical Practical Lab" },
  { name: "dbatu", lat: 19.8675, lng: 75.3233, info: "DR. Babasaheb Ambedkar Technological University" },
  { name: "cse", lat: 19.8681, lng: 75.3233, info: "Computer Science and Engineering" },
  { name: "entc", lat: 19.8675, lng: 75.3233, info: "Electronics and Telecommunication" },
  { name: "eep", lat: 19.8686, lng: 75.3242, info: "Electrical" },
  { name: "mech", lat: 19.8684, lng: 75.3238, info: "Mechanical" },
  { name: "civil", lat: 19.8672, lng: 75.3242, info: "Civil Department" },
  { name: "it & cc", lat: 19.8671, lng: 75.3246, info: "IT, CC, Maths Dept" },
  { name: "it gate", lat: 19.8672, lng: 75.3250, info: "Backside Entry Gate" },
  { name: "boy's hostel", lat: 19.8664, lng: 75.3236, info: "Matoshri Boy's Hostel" },
  { name: "girl's hostel", lat: 19.8658, lng: 75.3236, info: "Matoshri Girls Hostel" },
  { name: "gymkhana", lat: 19.8661, lng: 75.3244, info: "AICF, GYM, Hall" },
  { name: "kho-kho ground", lat: 19.8675, lng: 75.3242, info: "Near Civil" },
  { name: "kabaddi ground", lat: 19.8681, lng: 75.3236, info: "Beside BBC" }
];

let routingControl = null;

function drawRoute() {
  const fromText = document.getElementById("fromBox").value.toLowerCase().trim();
  const toText = document.getElementById("toBox").value.toLowerCase().trim();

  // Remove previous routing if exists
  if (routingControl !== null) {
    map.removeControl(routingControl);
  }

  const from = locations.find(loc => loc.name.toLowerCase() === fromText);
  const to = locations.find(loc => loc.name.toLowerCase() === toText);

  if (from && to) {
    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng)
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      lineOptions: {
        styles: [{color: 'blue', opacity: 0.7, weight: 6}]
      },
      createMarker: function(i, waypoint, n) {
        // Custom markers with popup info
        const loc = (i === 0) ? from : to;
        return L.marker(waypoint.latLng).bindPopup(`<b>${loc.name}</b><br>${loc.info}`);
      }
    }).addTo(map);
  } else {
    alert("One or both locations not found! Please check spelling.");
  }
}
