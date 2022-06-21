import { FormText } from "react-bootstrap";

export function executeQuery(query) {
  console.log(query);
  query = query.toLowerCase();
  if (
    query.includes("select") &&
    query.includes("*") &&
    query.includes("customer")
  )
    return table1;

  if (query.includes("first_name") && query.includes("last_name")) {
    const table = [["first_name", "last_name"]];

    let data = [];
    for (let row of table1[1]) {
      if (row[6] !== "OH") continue;
      let temp = [];
      temp.push(row[0]);
      temp.push(row[1]);
      data.push(temp);
    }
    table.push(data);
    return table;
  }

  if (query.includes("rental")) return rentalTable;

  return query === "" ? undefined : table1;
}

export const table1 = [
  [
    "first_name",
    "last_name",
    "company_name",
    "address",
    "city",
    "county",
    "state",
    "zip",
    "phone1",
    "phone2",
    "email",
    "web",
  ],
  [
    [
      "James",
      "Butt",
      "Benton, John B Jr",
      "6649 N Blue Gum St",
      "New Orleans",
      "Orleans",
      "OH",
      70116,
      "504-621-8927",
      "504-845-1427",
      "jbutt@gmail.com",
      "http://www.bentonjohnbjr.com",
    ],
    [
      "Josephine",
      "Darakjy",
      "Chanay, Jeffrey A Esq",
      "4 B Blue Ridge Blvd",
      "Brighton",
      "Livingston",
      "MI",
      48116,
      "810-292-9388",
      "810-374-9840",
      "josephine_darakjy@darakjy.org",
      "http://www.chanayjeffreyaesq.com",
    ],
    [
      "Art",
      "Venere",
      "Chemel, James L Cpa",
      "8 W Cerritos Ave #54",
      "Bridgeport",
      "Gloucester",
      "NJ",
      "08014",
      "856-636-8749",
      "856-264-4130",
      "art@venere.org",
      "http://www.chemeljameslcpa.com",
    ],
    [
      "Lenna",
      "Paprocki",
      "Feltz Printing Service",
      "639 Main St",
      "Anchorage",
      "Anchorage",
      "AK",
      99501,
      "907-385-4412",
      "907-921-2010",
      "lpaprocki@hotmail.com",
      "http://www.feltzprintingservice.com",
    ],

    [
      "Donette",
      "Foller",
      "Printing Dimensions",
      "34 Center St",
      "Hamilton",
      "Butler",
      "OH",
      45011,
      "513-570-1893",
      "513-549-4561",
      "donette.foller@cox.net",
      "http://www.printingdimensions.com",
    ],
    [
      "Simona",
      "Morasca",
      "Chapman, Ross E Esq",
      "3 Mcauley Dr",
      "Ashland",
      "Ashland",
      "OH",
      44805,
      "419-503-2484",
      "419-800-6759",
      "simona@morasca.com",
      "http://www.chapmanrosseesq.com",
    ],

    [
      "Mitsue",
      "Tollner",
      "Morlong Associates",
      "7 Eads St",
      "Chicago",
      "Cook",
      "IL",
      60632,
      "773-573-6914",
      "773-924-8565",
      "mitsue_tollner@yahoo.com",
      "http://www.morlongassociates.com",
    ],

    [
      "Leota",
      "Dilliard",
      "Commercial Press",
      "7 W Jackson Blvd",
      "San Jose",
      "Santa Clara",
      "OH",
      95111,
      "408-752-3500",
      "408-813-1105",
      "leota@hotmail.com",
      "http://www.commercialpress.com",
    ],

    [
      "Sage",
      "Wieser",
      "Truhlar And Truhlar Attys",
      "5 Boston Ave #88",
      "Sioux Falls",
      "Minnehaha",
      "OH",
      57105,
      "605-414-2147",
      "605-794-4895",
      "sage_wieser@cox.net",
      "http://www.truhlarandtruhlarattys.com",
    ],
  ],
];

export const rentalTable = [
  ["Id", "customer", "movie", "date_out", "rental_fee"],
  [
    ["1", "Sage", "Iron Man", "2022-05-26", "$3"],
    ["2", "Leota", "Spider Man", "2022-04-12", "$5"],
    ["3", "Simona", "Iron Man", "2022-03-06", "$3"],
    ["4", "donette", "Lord of Rings", "2022-05-04", "$6"],
    ["5", "Mitsue", "Captain America", "2022-01-07", "$2"],
    ["6", "John", "Iron Man", "2021-03-23", "$6"],
    ["7", "Karan", "Iron Man", "2022-02-12", "$8"],
    ["8", "Justin", "Thor", "2021-03-19", "$9"],
  ],
];
