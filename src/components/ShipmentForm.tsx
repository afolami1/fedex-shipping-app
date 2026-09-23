import { useState } from "react";
import axios from "axios";
import "./ShipmentForm.css";
import ShipmentMap from "./ShipmentMap";

const locations: Record<string, Record<string, string[]>> = {
"United States": {
Alabama: ["Birmingham", "Montgomery", "Mobile", "Huntsville"],
Alaska: ["Anchorage", "Fairbanks", "Juneau"],
Arizona: ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
Arkansas: ["Little Rock", "Fayetteville", "Fort Smith"],
California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
Connecticut: ["Bridgeport", "New Haven", "Hartford", "Stamford"],
Delaware: ["Wilmington", "Dover", "Newark"],
Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
Georgia: ["Atlanta", "Savannah", "Augusta", "Columbus"],
Hawaii: ["Honolulu", "Hilo", "Kailua"],
Idaho: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
Illinois: ["Chicago", "Aurora", "Rockford", "Springfield", "Peoria"],
Indiana: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
Iowa: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
Kansas: ["Wichita", "Overland Park", "Kansas City", "Topeka"],
Kentucky: ["Louisville", "Lexington", "Bowling Green", "Frankfort"],
Louisiana: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
Maine: ["Portland", "Lewiston", "Bangor", "Augusta"],
Maryland: ["Baltimore", "Frederick", "Rockville", "Annapolis"],
Massachusetts: ["Boston", "Worcester", "Springfield", "Cambridge"],
Michigan: ["Detroit", "Grand Rapids", "Warren", "Lansing"],
Minnesota: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
Mississippi: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
Missouri: ["Kansas City", "St. Louis", "Springfield", "Columbia"],
Montana: ["Billings", "Missoula", "Great Falls", "Bozeman"],
Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
Nevada: ["Las Vegas", "Henderson", "Reno", "North Las Vegas"],
"New Hampshire": ["Manchester", "Nashua", "Concord", "Dover"],
"New Jersey": ["Newark", "Jersey City", "Paterson", "Trenton"],
"New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
"New York": ["New York City", "Buffalo", "Albany", "Rochester", "Syracuse"],
"North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Wilmington"],
"North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot"],
Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
Oklahoma: ["Oklahoma City", "Tulsa", "Norman", "Lawton"],
Oregon: ["Portland", "Eugene", "Salem", "Bend"],
Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg"],
"Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket"],
"South Carolina": ["Charleston", "Columbia", "Greenville", "Myrtle Beach"],
"South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Pierre"],
Tennessee: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
Utah: ["Salt Lake City", "West Valley City", "Provo", "St. George"],
Vermont: ["Burlington", "South Burlington", "Rutland", "Montpelier"],
Virginia: ["Virginia Beach", "Richmond", "Norfolk", "Arlington", "Alexandria"],
Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Olympia"],
"West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
Wyoming: ["Cheyenne", "Casper", "Laramie", "Gillette"],
},

Canada: {
Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
"British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
Manitoba: ["Winnipeg", "Brandon", "Steinbach"],
"New Brunswick": ["Moncton", "Saint John", "Fredericton"],
"Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl"],
"Nova Scotia": ["Halifax", "Sydney", "Dartmouth"],
Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
"Prince Edward Island": ["Charlottetown", "Summerside"],
Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
Saskatchewan: ["Saskatoon", "Regina", "Prince Albert"],
},

Germany: {
Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg"],
Berlin: ["Berlin"],
Brandenburg: ["Potsdam", "Cottbus", "Brandenburg an der Havel"],
Hesse: ["Frankfurt", "Wiesbaden", "Darmstadt", "Kassel"],
"North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen"],
"Lower Saxony": ["Hanover", "Braunschweig", "Oldenburg", "Osnabrück"],
"Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg"],
Saxony: ["Dresden", "Leipzig", "Chemnitz"],
Hamburg: ["Hamburg"],
Bremen: ["Bremen"],
"Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg"],
"Rhineland-Palatinate": ["Mainz", "Ludwigshafen", "Koblenz"],
Saarland: ["Saarbrücken", "Neunkirchen"],
Thuringia: ["Erfurt", "Jena", "Gera"],
"Saxony-Anhalt": ["Magdeburg", "Halle", "Dessau"],
"Mecklenburg-Vorpommern": ["Rostock", "Schwerin", "Greifswald"],
},

"United Kingdom": {
England: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Bristol"],
Scotland: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
Wales: ["Cardiff", "Swansea", "Newport", "Wrexham"],
"Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry"],
},

France: {
"Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
"Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Avignon"],
Occitanie: ["Toulouse", "Montpellier", "Nîmes", "Perpignan"],
"Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne"],
"Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers"],
"Hauts-de-France": ["Lille", "Amiens", "Calais"],
"Grand Est": ["Strasbourg", "Reims", "Metz"],
Normandy: ["Rouen", "Caen", "Le Havre"],
Brittany: ["Rennes", "Brest", "Lorient"],
"Pays de la Loire": ["Nantes", "Angers", "Le Mans"],
},

Spain: {
Madrid: ["Madrid", "Alcalá de Henares", "Getafe"],
Catalonia: ["Barcelona", "Girona", "Tarragona", "Lleida"],
Andalusia: ["Seville", "Malaga", "Granada", "Cordoba"],
Valencia: ["Valencia", "Alicante", "Castellón"],
Galicia: ["Vigo", "A Coruña", "Santiago de Compostela"],
"Basque Country": ["Bilbao", "Vitoria-Gasteiz", "San Sebastián"],
},

Portugal: {
Lisbon: ["Lisbon", "Sintra", "Cascais"],
Porto: ["Porto", "Braga", "Matosinhos"],
Faro: ["Faro", "Loulé", "Portimão"],
Coimbra: ["Coimbra", "Figueira da Foz"],
Madeira: ["Funchal", "Machico"],
},

Italy: {
Lazio: ["Rome", "Frosinone", "Latina"],
Lombardy: ["Milan", "Bergamo", "Brescia", "Monza"],
Tuscany: ["Florence", "Pisa", "Siena", "Lucca"],
Campania: ["Naples", "Salerno", "Caserta"],
Veneto: ["Venice", "Verona", "Padua", "Vicenza"],
Piedmont: ["Turin", "Novara", "Alessandria"],
Sicily: ["Palermo", "Catania", "Messina", "Syracuse"],
},

Netherlands: {
"North Holland": ["Amsterdam", "Haarlem", "Alkmaar"],
"South Holland": ["Rotterdam", "The Hague", "Leiden"],
Utrecht: ["Utrecht", "Amersfoort", "Zeist"],
"North Brabant": ["Eindhoven", "Tilburg", "Breda"],
Gelderland: ["Arnhem", "Nijmegen", "Apeldoorn"],
},

Belgium: {
"Brussels-Capital": ["Brussels"],
Flanders: ["Antwerp", "Ghent", "Bruges", "Leuven"],
Wallonia: ["Liège", "Namur", "Charleroi", "Mons"],
},

Sweden: {
Stockholm: ["Stockholm", "Solna", "Sundbyberg"],
"Västra Götaland": ["Gothenburg", "Borås", "Trollhättan"],
Skåne: ["Malmö", "Lund", "Helsingborg"],
Uppsala: ["Uppsala", "Enköping"],
},

Finland: {
Uusimaa: ["Helsinki", "Espoo", "Vantaa"],
Pirkanmaa: ["Tampere", "Nokia", "Kangasala"],
"North Ostrobothnia": ["Oulu", "Raahe", "Kuusamo"],
"Southwest Finland": ["Turku", "Salo", "Raisio"],
},

Estonia: {
Harju: ["Tallinn", "Maardu", "Keila"],
Tartu: ["Tartu", "Elva", "Kambja"],
Pärnu: ["Pärnu", "Sindi"],
},

Greece: {
Attica: ["Athens", "Piraeus", "Marousi"],
"Central Macedonia": ["Thessaloniki", "Katerini", "Serres"],
Crete: ["Heraklion", "Chania", "Rethymno"],
},

Iceland: {
Capital: ["Reykjavik", "Kópavogur", "Hafnarfjörður"],
"Southern Region": ["Selfoss", "Hveragerði", "Hella"],
"Northern Region": ["Akureyri", "Húsavík"],
},

Poland: {
Masovian: ["Warsaw", "Radom", "Płock"],
"Lesser Poland": ["Kraków", "Tarnów", "Nowy Sącz"],
Silesian: ["Katowice", "Gliwice", "Bielsko-Biała"],
"Lower Silesian": ["Wrocław", "Legnica", "Wałbrzych"],
Pomeranian: ["Gdańsk", "Gdynia", "Sopot"],
},

Austria: {
Vienna: ["Vienna"],
Salzburg: ["Salzburg", "Hallein", "Seekirchen"],
Tyrol: ["Innsbruck", "Kufstein", "Telfs"],
Styria: ["Graz", "Leoben", "Kapfenberg"],
"Upper Austria": ["Linz", "Wels", "Steyr"],
},

Mexico: {
"Mexico City": ["Mexico City"],
Jalisco: ["Guadalajara", "Zapopan", "Puerto Vallarta"],
"Nuevo León": ["Monterrey", "San Pedro Garza García", "Apodaca"],
Yucatán: ["Mérida", "Valladolid", "Progreso"],
Puebla: ["Puebla", "Tehuacán", "Atlixco"],
},

Nigeria: {
Lagos: ["Lagos", "Ikeja", "Lekki", "Epe", "Badagry"],
Abuja: ["Abuja", "Gwagwalada", "Kuje", "Bwari"],
Rivers: ["Port Harcourt", "Bonny", "Eleme", "Obio-Akpor"],
Kano: ["Kano", "Wudil", "Gaya"],
Oyo: ["Ibadan", "Ogbomosho", "Oyo", "Iseyin"],
Kaduna: ["Kaduna", "Zaria", "Kafanchan"],
Enugu: ["Enugu", "Nsukka", "Oji River"],
Anambra: ["Awka", "Onitsha", "Nnewi"],
Delta: ["Asaba", "Warri", "Sapele"],
Edo: ["Benin City", "Auchi", "Ekpoma"],
Ogun: ["Abeokuta", "Ijebu-Ode", "Sagamu"],
Osun: ["Osogbo", "Ile-Ife", "Ilesa"],
Kwara: ["Ilorin", "Offa", "Lafiagi"],
"Cross River": ["Calabar", "Ugep", "Ikom"],
"Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene"],
Abia: ["Umuahia", "Aba", "Ohafia"],
Imo: ["Owerri", "Orlu", "Okigwe"],
Benue: ["Makurdi", "Gboko", "Otukpo"],
Plateau: ["Jos", "Bukuru", "Pankshin"],
Bauchi: ["Bauchi", "Azare", "Misau"],
Sokoto: ["Sokoto", "Tambuwal", "Wurno"],
Katsina: ["Katsina", "Daura", "Funtua"],
Borno: ["Maiduguri", "Bama", "Dikwa"],
Yobe: ["Damaturu", "Potiskum", "Gashua"],
Adamawa: ["Yola", "Mubi", "Jimeta"],
Niger: ["Minna", "Suleja", "Bida"],
Nasarawa: ["Lafia", "Keffi", "Akwanga"],
Kogi: ["Lokoja", "Okene", "Idah"],
Ekiti: ["Ado-Ekiti", "Ikere", "Ilawe"],
Ondo: ["Akure", "Ondo", "Owo"],
Bayelsa: ["Yenagoa", "Brass", "Sagbama"],
Ebonyi: ["Abakaliki", "Afikpo", "Onueke"],
Gombe: ["Gombe", "Kaltungo", "Billiri"],
Taraba: ["Jalingo", "Wukari", "Bali"],
Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara"],
},

Brazil: {
"São Paulo": ["São Paulo", "Campinas", "Santos", "Guarulhos"],
"Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
Bahia: ["Salvador", "Feira de Santana", "Ilhéus"],
Paraná: ["Curitiba", "Londrina", "Maringá"],
"Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem"],
},
};

function ShipmentForm() {
const [sender, setSender] = useState("");
const [receiver, setReceiver] = useState("");
const [email, setEmail] = useState("");

const [origin, setOrigin] = useState("");
const [originState, setOriginState] = useState("");
const [originCity, setOriginCity] = useState("");
const [originAddress, setOriginAddress] = useState("");

const [destination, setDestination] = useState("");
const [destinationState, setDestinationState] = useState("");
const [destinationCity, setDestinationCity] = useState("");
const [destinationAddress, setDestinationAddress] = useState("");

const [weight, setWeight] = useState("");
const [paymentMethod, setPaymentMethod] = useState("");
const [paymentStatus, setPaymentStatus] = useState("");
const [Amount, setAmount] = useState("");
const [trackingNumber, setTrackingNumber] = useState("");
const [itemPhoto, setItemPhoto] = useState<File | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();


console.log("CREATE SHIPMENT BUTTON CLICKED");

if (!paymentMethod) {
  alert("Please choose a payment method.");
  return;
}

const newTrackingNumber =
  "GLS" + Math.floor(100000000 + Math.random() * 900000000);

const calculatedShippingCost = Number(weight) * 51.0;

const estimatedDelivery = new Date(
  Date.now() + 5 * 24 * 60 * 60 * 1000
)
  .toISOString()
  .split("T")[0];

const formData = new FormData();

formData.append("tracking_number", newTrackingNumber);
formData.append("sender", sender);
formData.append("receiver", receiver);
formData.append("origin_country", origin);
formData.append("origin_state", originState);
formData.append("origin_city", originCity);
formData.append("origin_address", originAddress);

formData.append("destination_country", destination);
formData.append("destination_state", destinationState);
formData.append("destination_city", destinationCity);
formData.append("destination_address", destinationAddress);

formData.append("weight", weight);
formData.append("shipping_cost", String(calculatedShippingCost));
formData.append("payment_method", paymentMethod);
formData.append("payment_status", "Paid");
formData.append("payment_amount", Amount || "0");
formData.append("status", "Shipment Created");

formData.append(
  "current_location",
  `${originCity}, ${origin}`
);

formData.append("next_location", "Sorting Facility");
formData.append("estimated_delivery", estimatedDelivery);

if (itemPhoto) {
  formData.append("item_photo", itemPhoto);
}

console.log("SENDING SHIPMENT TO DJANGO");

try {
  const response = await axios.post(
    "https://globalshippingonline247.onrender.com/api/",
    formData
  );

  console.log(
    "DJANGO CREATE RESPONSE:",
    JSON.stringify(response.data, null, 2)
  );

  setTrackingNumber(newTrackingNumber);
  setPaymentStatus("Paid");

  alert(
    "Shipment created successfully! Tracking Number: " +
      newTrackingNumber
  );
} catch (error: any) {
  console.error(
    "Shipment creation error:",
    error.response?.data || error.message
  );

  alert(
    "Shipment could not be created. Please make sure the Django server is running."
  );
}

};

const handlePrint = () => {
window.print();
};

const handleDownload = () => {
const receipt = `
GLOBAL SHIPPING
SHIPMENT RECEIPT

Tracking Number: ${trackingNumber}

Sender:
${sender}

Receiver:
${receiver}

Origin:
${originAddress}
${originCity}, ${originState}
${origin}

Destination:
${destinationAddress}
${destinationCity}, ${destinationState}
${destination}

Package Weight: ${weight} kg
Shipping Cost: $${Number(weight) * 51.0}

Payment Method: ${paymentMethod}
Payment Status: ${paymentStatus}
Payment Amount: $${Amount}

Thank you for using Global Shipping
`;


const blob = new Blob([receipt], {
  type: "text/plain",
});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = `${trackingNumber}-receipt.txt`;

document.body.appendChild(link);
link.click();
document.body.removeChild(link);

URL.revokeObjectURL(url);


};

return ( <div className="shipment-form-container"> <form
     onSubmit={handleSubmit}
     className="shipment-form"
   > <h2>Create Shipment</h2>


    <div className="form-group">
      <label>Sender Name</label>

      <input
        type="text"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Receiver Name</label>

      <input
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        required
      />
    </div>

    <div className="form-group item-photo-group">
      <label htmlFor="itemPhoto">
        Item Photo
      </label>

      <input
        id="itemPhoto"
        type="file"
        accept="image/*"
        onChange={(e) =>
          setItemPhoto(e.target.files?.[0] || null)
        }
      />

      {itemPhoto && (
        <div className="item-photo-preview">
          <img
            src={URL.createObjectURL(itemPhoto)}
            alt="Selected shipment item"
          />

          <span>{itemPhoto.name}</span>
        </div>
      )}
    </div>

    <div className="form-group">
      <label>Email Address</label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <h3>Origin</h3>

    <div className="form-group">
      <label>Country</label>

      <select
        value={origin}
        onChange={(e) => {
          setOrigin(e.target.value);
          setOriginState("");
          setOriginCity("");
        }}
        required
      >
        <option value="">Select Country</option>

        {Object.keys(locations).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>State</label>

      <select
        value={originState}
        onChange={(e) => {
          setOriginState(e.target.value);
          setOriginCity("");
        }}
        required
        disabled={!origin}
      >
        <option value="">Select State</option>

        {origin &&
          locations[origin] &&
          Object.keys(locations[origin]).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
      </select>
    </div>

    <div className="form-group">
      <label>City</label>

      <select
        value={originCity}
        onChange={(e) =>
          setOriginCity(e.target.value)
        }
        required
        disabled={!originState}
      >
        <option value="">Select City</option>

        {origin &&
          originState &&
          locations[origin]?.[originState]?.map(
            (city) => (
              <option key={city} value={city}>
                {city}
              </option>
            )
          )}
      </select>
    </div>

    <div className="form-group">
      <label>Address</label>

      <input
        type="text"
        value={originAddress}
        onChange={(e) =>
          setOriginAddress(e.target.value)
        }
        required
      />
    </div>

    <h3>Destination</h3>

    <div className="form-group">
      <label>Country</label>

      <select
        value={destination}
        onChange={(e) => {
          setDestination(e.target.value);
          setDestinationState("");
          setDestinationCity("");
        }}
        required
      >
        <option value="">Select Country</option>

        {Object.keys(locations).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>State</label>

      <select
        value={destinationState}
        onChange={(e) => {
          setDestinationState(e.target.value);
          setDestinationCity("");
        }}
        required
        disabled={!destination}
      >
        <option value="">Select State</option>

        {destination &&
          locations[destination] &&
          Object.keys(locations[destination]).map(
            (state) => (
              <option key={state} value={state}>
                {state}
              </option>
            )
          )}
      </select>
    </div>

    <div className="form-group">
      <label>City</label>

      <select
        value={destinationCity}
        onChange={(e) =>
          setDestinationCity(e.target.value)
        }
        required
        disabled={!destinationState}
      >
        <option value="">Select City</option>

        {destination &&
          destinationState &&
          locations[destination]?.[
            destinationState
          ]?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
    </div>

    <div className="form-group">
      <label>Address</label>

      <input
        type="text"
        value={destinationAddress}
        onChange={(e) =>
          setDestinationAddress(e.target.value)
        }
        required
      />
    </div>

    <ShipmentMap
      originCity={originCity}
      originState={originState}
      originCountry={origin}
      destinationCity={destinationCity}
      destinationState={destinationState}
      destinationCountry={destination}
    />

    <div className="form-group">
      <label>Package Weight (kg)</label>

      <input
        type="number"
        min="0.1"
        step="0.1"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value)
        }
        required
      />

      {weight && Number(weight) > 0 && (
        <p className="shipping-cost">
          Shipping Cost: $
          {(Number(weight) * 51.0).toLocaleString()}
        </p>
      )}
    </div>

    <div className="form-group">
      <label>Amount ($)</label>

      <input
        type="number"
        min="0"
        step="0.01"
        value={Amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        placeholder="Enter amount"
      />
    </div>

    <div className="form-group">
      <label>Payment Method</label>

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
        required
      >
        <option value="">
          Select Payment Method
        </option>

        <option value="Credit Card">
          Credit Card
        </option>

        <option value="Debit Card">
          Debit Card
        </option>

        <option value="Bank Transfer">
          Bank Transfer
        </option>

        <option value="Cash">
          Cash
        </option>

        <option value="Payment">
          Payment
        </option>
      </select>
    </div>

    {paymentMethod === "Payment" && (
      <div className="form-group">
        <label>Amount ($)</label>

        <input
          type="number"
          min="1"
          value={Amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="Enter any amount"
          required
        />
      </div>
    )}

    <button type="submit">
      Create Shipment
    </button>
  </form>

  {trackingNumber && (
    <div className="shipment-receipt">
      <h2>Shipment Created Successfully</h2>

      <p>
        <strong>Tracking Number:</strong>{" "}
        {trackingNumber}
      </p>

      <p>
        <strong>Payment Status:</strong>{" "}
        {paymentStatus}
      </p>

      {Amount && (
        <p>
          <strong>Payment Amount:</strong> $
          {Amount}
        </p>
      )}

      <div className="receipt-buttons">
        <button
          type="button"
          onClick={handlePrint}
        >
          Print Receipt
        </button>

        <button
          type="button"
          onClick={handleDownload}
        >
          Download Receipt
        </button>
      </div>
    </div>
  )}
</div>

);
}

export default ShipmentForm;
