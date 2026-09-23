import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ShipmentMap.css";

type ShipmentMapProps = {
  originCity: string;
  originState: string;
  originCountry: string;
  destinationCity: string;
  destinationState: string;
  destinationCountry: string;
};

const cityCoordinates: Record<string, [number, number]> = {
  "Los Angeles": [34.0522, -118.2437],
  "San Francisco": [37.7749, -122.4194],
  "San Diego": [32.7157, -117.1611],

  Houston: [29.7604, -95.3698],
  Dallas: [32.7767, -96.797],
  Austin: [30.2672, -97.7431],

  Miami: [25.7617, -80.1918],
  Orlando: [28.5383, -81.3792],
  Tampa: [27.9506, -82.4572],

  "New York City": [40.7128, -74.006],
  Buffalo: [42.8864, -78.8784],
  Albany: [42.6526, -73.7562],

  Toronto: [43.6532, -79.3832],
  Ottawa: [45.4215, -75.6972],
  Mississauga: [43.589, -79.6441],

  Montreal: [45.5017, -73.5673],
  "Quebec City": [46.8139, -71.208],
  Laval: [45.6066, -73.7124],

  Calgary: [51.0447, -114.0719],
  Edmonton: [53.5461, -113.4938],
  "Red Deer": [52.2681, -113.8112],

  Munich: [48.1351, 11.582],
  Nuremberg: [49.4521, 11.0767],
  Augsburg: [48.3668, 10.8985],

  Berlin: [52.52, 13.405],

  Frankfurt: [50.1109, 8.6821],
  Wiesbaden: [50.0782, 8.2398],
  Darmstadt: [49.8728, 8.6512],

  London: [51.5074, -0.1278],
  Manchester: [53.4808, -2.2426],
  Liverpool: [53.4084, -2.9916],

  Edinburgh: [55.9533, -3.1883],
  Glasgow: [55.8642, -4.2518],
  Aberdeen: [57.1497, -2.0943],

  Cardiff: [51.4816, -3.1791],
  Swansea: [51.6214, -3.9436],
  Newport: [51.5842, -2.9977],

  Paris: [48.8566, 2.3522],
  Versailles: [48.8014, 2.1301],
  "Boulogne-Billancourt": [48.8397, 2.2399],

  Marseille: [43.2965, 5.3698],
  Nice: [43.7102, 7.262],
  Toulon: [43.1242, 5.928],

  Toulouse: [43.6047, 1.4442],
  Montpellier: [43.6108, 3.8767],
  "Nîmes": [43.8367, 4.3601],

  Madrid: [40.4168, -3.7038],
  "Alcalá de Henares": [40.4819, -3.3635],
  Getafe: [40.3083, -3.7327],

  Barcelona: [41.3874, 2.1686],
  Girona: [41.9794, 2.8214],
  Tarragona: [41.1189, 1.2445],

  Seville: [37.3891, -5.9845],
  Malaga: [36.7213, -4.4214],
  Granada: [37.1773, -3.5986],

  Lisbon: [38.7223, -9.1393],
  Sintra: [38.8029, -9.3817],
  Cascais: [38.6979, -9.4215],

  Porto: [41.1579, -8.6291],
  Braga: [41.5454, -8.4265],
  Matosinhos: [41.1821, -8.6891],

  Faro: [37.0194, -7.9304],
  Loulé: [37.1376, -8.0238],
  Portimão: [37.1367, -8.5375],

  Rome: [41.9028, 12.4964],
  Frosinone: [41.6396, 13.3516],
  Latina: [41.4676, 12.9037],

  Milan: [45.4642, 9.19],
  Bergamo: [45.6983, 9.6773],
  Brescia: [45.5416, 10.2118],

  Florence: [43.7696, 11.2558],
  Pisa: [43.7228, 10.4017],
  Siena: [43.3188, 11.3308],

  Amsterdam: [52.3676, 4.9041],
  Haarlem: [52.3874, 4.6462],
  Alkmaar: [52.6324, 4.7534],

  Rotterdam: [51.9244, 4.4777],
  "The Hague": [52.0705, 4.3007],
  Leiden: [52.1601, 4.497],

  Utrecht: [52.0907, 5.1214],
  Amersfoort: [52.1561, 5.3878],
  Zeist: [52.0901, 5.233],

  Brussels: [50.8503, 4.3517],
  Antwerp: [51.2194, 4.4025],
  Ghent: [51.0543, 3.7174],
  Bruges: [51.2093, 3.2247],

  "Liège": [50.6326, 5.5797],
  Namur: [50.4674, 4.8718],
  Charleroi: [50.4108, 4.4446],

  Stockholm: [59.3293, 18.0686],
  Solna: [59.360, 18.000],
  Sundbyberg: [59.3613, 17.9714],

  Gothenburg: [57.7089, 11.9746],
  Borås: [57.721, 12.9401],
  Trollhättan: [58.2837, 12.2886],

  Malmö: [55.605, 13.0038],
  Lund: [55.7047, 13.191],
  Helsingborg: [56.0465, 12.6945],

  Helsinki: [60.1699, 24.9384],
  Espoo: [60.2055, 24.6559],
  Vantaa: [60.2934, 25.0378],

  Tampere: [61.4978, 23.761],
  Nokia: [61.4766, 23.505],
  Kangasala: [61.463, 24.076],

  Oulu: [65.0121, 25.4651],
  Raahe: [64.6837, 24.4801],
  Kuusamo: [65.9646, 29.1888],

  Tallinn: [59.437, 24.7536],
  Maardu: [59.4653, 25.0259],
  Keila: [59.3035, 24.413],

  Tartu: [58.3776, 26.729],
  Elva: [58.2228, 26.4211],
  Kambja: [58.2367, 26.6907],

  Athens: [37.9838, 23.7275],
  Piraeus: [37.9838, 23.6469],
  Marousi: [38.0302, 23.8051],

  Thessaloniki: [40.6401, 22.9444],
  Katerini: [40.2727, 22.5004],
  Serres: [41.085, 23.5497],

  Reykjavik: [64.1466, -21.9426],
  Kópavogur: [64.112, -21.908],
  Hafnarfjörður: [64.0671, -21.9548],

  Selfoss: [63.9331, -20.9971],
  Hveragerði: [63.9981, -21.1886],
  Hella: [63.8358, -20.397],

  Warsaw: [52.2297, 21.0122],
  Radom: [51.4027, 21.1471],
  Płock: [52.5463, 19.7065],

  Kraków: [50.0647, 19.945],
  Tarnów: [50.0121, 20.9858],
  "Nowy Sącz": [49.6175, 20.7153],

  Katowice: [50.2649, 19.0238],
  Gliwice: [50.2945, 18.6714],
  "Bielsko-Biała": [49.8224, 19.0444],

  Vienna: [48.2082, 16.3738],
  Salzburg: [47.8095, 13.055],
  Hallein: [47.6833, 13.1],
  Seekirchen: [47.8974, 13.127],

  Innsbruck: [47.2692, 11.4041],
  Kufstein: [47.5833, 12.1667],
  Telfs: [47.3072, 11.0682],

  "Mexico City": [19.4326, -99.1332],
  Guadalajara: [20.6597, -103.3496],
  Zapopan: [20.6597, -103.3496],
  "Puerto Vallarta": [20.6534, -105.2253],

  Monterrey: [25.6866, -100.3161],
  "San Pedro Garza García": [25.6572, -100.402],
  Apodaca: [25.7813, -100.188],

  Lagos: [6.5244, 3.3792],
  Abuja: [9.0765, 7.3986],
};

const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        background:${color};
        width:18px;
        height:18px;
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,.5);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

const originIcon = createIcon("#16a34a");
const destinationIcon = createIcon("#dc2626");

function ShipmentMap({
  originCity,
  originState,
  originCountry,
  destinationCity,
  destinationState,
  destinationCountry,
}: ShipmentMapProps) {
  const originPosition = cityCoordinates[originCity];
  const destinationPosition = cityCoordinates[destinationCity];

  if (!originPosition || !destinationPosition) {
    return (
      <div className="shipment-map-placeholder">
        <p>
          Select an origin city and destination city to display the shipment
          route on the map.
        </p>
      </div>
    );
  }

  const center: [number, number] = [
    (originPosition[0] + destinationPosition[0]) / 2,
    (originPosition[1] + destinationPosition[1]) / 2,
  ];

  return (
    <div className="shipment-map-wrapper">
      <MapContainer
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        className="shipment-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={originPosition} icon={originIcon}>
          <Popup>
            <strong>Shipment Origin</strong>
            <br />
            {originCity}, {originState}, {originCountry}
          </Popup>
        </Marker>

        <Marker position={destinationPosition} icon={destinationIcon}>
          <Popup>
            <strong>Shipment Destination</strong>
            <br />
            {destinationCity}, {destinationState}, {destinationCountry}
          </Popup>
        </Marker>

        <Polyline
          positions={[originPosition, destinationPosition]}
          pathOptions={{ weight: 4 }}
        />
      </MapContainer>

      <div className="map-route-info">
        <div>
          <span className="route-dot origin-dot"></span>
          <strong>Origin:</strong> {originCity}, {originCountry}
        </div>

        <div>
          <span className="route-dot destination-dot"></span>
          <strong>Destination:</strong> {destinationCity}, {destinationCountry}
        </div>
      </div>
    </div>
  );
}

export default ShipmentMap;