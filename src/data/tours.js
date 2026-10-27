import desert from "@/assets/desert.jpg";
import jaipur from "@/assets/jaipur.jpg";
import udaipur from "@/assets/udaipur.jpg";
import jodhpur from "@/assets/jodhpur.jpg";
import pushkar from "@/assets/pushkar.jpg";

export const tours = [
  {
    slug: "pink-city",
    name: "The Pink City & Beyond",
    city: "Jaipur",
    days: 7,
    price: "₹94,200",
    rating: "4.9",
    reviews: 128,
    blurb: "Jaipur, Amber, and a night under the desert sky.",
    image: jaipur,
    includes: [
      "Private driver & all transfers",
      "Daily breakfast & three dinners",
      "A local guide, fair to fort",
      "Four heritage haveli stays",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Jaipur",
        text: "Airport transfer, tea at a walled haveli, and a dusk walk through the old city markets.",
      },
      {
        day: "Day 2",
        title: "Amber & the City Palace",
        text: "Private morning at the hilltop fortress, then a block-print textile workshop with a local artisan.",
      },
      {
        day: "Day 3",
        title: "Jantar Mantar & Johari Bazaar",
        text: "The astronomical observatory at first light, then the silk and gemstone lanes.",
      },
      {
        day: "Day 4",
        title: "Nahargarh at dusk",
        text: "Evening on the hilltop fort with a long-table dinner of Rajasthani thali.",
      },
      {
        day: "Day 5",
        title: "Departure",
        text: "Sunrise walk, a last chai on the terrace, and the final transfer.",
      },
    ],
  },
  {
    slug: "lakes-of-udaipur",
    name: "Lakes of Udaipur",
    city: "Udaipur",
    days: 5,
    price: "₹72,500",
    rating: "4.8",
    reviews: 96,
    blurb: "Floating palaces and a candlelit lakeside dinner.",
    image: udaipur,
    includes: [
      "Lakeside heritage suite",
      "Private boat across Pichola",
      "Daily breakfast & two dinners",
      "Mewar palace guided tour",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival by the water",
        text: "Settle into a lakeside suite, an evening of ghats and rooftop light.",
      },
      {
        day: "Day 2",
        title: "Pichola & the Lake Palace",
        text: "A private boat across the water, heritage lunch, and the Mewar palace at golden hour.",
      },
      {
        day: "Day 3",
        title: "Aravalli hills",
        text: "Winding drive to the Jain temples of Ranakpur, returning for a candlelit dinner.",
      },
      {
        day: "Day 4",
        title: "Miniature painting studio",
        text: "Morning with a fourth-generation painter, afternoon free by the water.",
      },
      {
        day: "Day 5",
        title: "Departure",
        text: "A slow breakfast on the terrace and your onward transfer.",
      },
    ],
  },
  {
    slug: "golden-desert-trail",
    name: "Golden Deserts of Jaisalmer",
    city: "Jaisalmer",
    days: 6,
    price: "₹81,900",
    rating: "5.0",
    reviews: 74,
    blurb: "Dunes of Sam and a night in a heritage haveli.",
    image: desert,
    includes: [
      "Desert camp under the stars",
      "Camel caravan at dusk",
      "Private driver & all transfers",
      "Daily breakfast & three dinners",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Into the golden city",
        text: "Arrive in Jaisalmer, an evening walk through the living fort's sandstone lanes.",
      },
      {
        day: "Day 2",
        title: "Havelis of Patwon",
        text: "Carved facades in the morning, Gadisar Lake at sunset.",
      },
      {
        day: "Day 3",
        title: "Dunes of Sam",
        text: "Camel caravan into the Thar, dinner and folk music beneath the stars.",
      },
      {
        day: "Day 4",
        title: "Khuri village",
        text: "A quieter stretch of desert, mustard fields and a village lunch.",
      },
      {
        day: "Day 5",
        title: "Jodhpur transfer",
        text: "Overland to the blue city with a stop at Pokhran fort.",
      },
      {
        day: "Day 6",
        title: "Departure",
        text: "Mehrangarh at opening hour, then your final transfer.",
      },
    ],
  },
];

export const destinations = [
  { name: "Jaipur", note: "The pink city · palaces & bazaars", image: jaipur },
  { name: "Udaipur", note: "City of lakes · floating palaces", image: udaipur },
  { name: "Jaisalmer", note: "The golden city · dunes & camps", image: desert },
  { name: "Jodhpur", note: "The blue city · Mehrangarh fort", image: jodhpur },
  // { name: "Pushkar", note: "Temple town · the camel fair", image: pushkar },
];
