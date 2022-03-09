import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";

const Clients = () => {
	const title = "Clients";
	const entity = "client";
	const template = {
		attributes: ["id", "name", "email", "phone", "addresses"],
		dataKeys: ["clientID", "name", "email", "phone","addresses"],
		dataTypes: ["id", "text", "text", "text", "list"],
		create: ["none", "text", "text", "text", "none"]
	};
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getClientRows();
	}, []);

	useEffect(() => {
		console.log(tableData);
	}, [tableData]);

	const getClientRows = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const addClient = async (values) => {
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "PUT",
			body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const editClientRow = async (index, values) => {
		console.log(values)
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "POST",
			body: JSON.stringify({ id: values.id, name: values.name, email: values.email, phone: values.phone }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(response => {
			if (response.status === 200) {
				response.json().then((data) => {
					console.log(data)
					const copyTableData = [...tableData]
					copyTableData[index] = data[0]
					setTableData(copyTableData)
				})
			}
		})
	};

	const deleteClientRow = async (index, id) => {
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(response => {
			if (response.status === 200) {
				getClientRows()
			}
		})
	}
	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addClient}
				editRow={editClientRow}
				deleteRow={deleteClientRow}
			/>
		</div>
	);
};

const testMassData = [
	{
		name: "Josephine Darakjy",
		email: "josephine_darakjy@darakjy.org",
		phone: "810-292-9388",
		addresses: ["4 B Blue Ridge Blvd, Brighton, MI"],
	},
	{
		name: "Art Venere",
		email: "art@venere.org",
		phone: "856-636-8749",
		addresses: ["8 W Cerritos Ave #54, Bridgeport, NJ"],
	},
	{
		name: "Lenna Paprocki",
		email: "lpaprocki@hotmail.com",
		phone: "907-385-4412",
		addresses: ["639 Main St, Anchorage, AK"],
	},
	{
		name: "Donette Foller",
		email: "donette.foller@cox.net",
		phone: "513-570-1893",
		addresses: ["34 Center St, Hamilton, OH"],
	},
	{
		name: "Simona Morasca",
		email: "simona@morasca.com",
		phone: "419-503-2484",
		addresses: ["3 Mcauley Dr, Ashland, OH"],
	},
	{
		name: "Mitsue Tollner",
		email: "mitsue_tollner@yahoo.com",
		phone: "773-573-6914",
		addresses: ["7 Eads St, Chicago, IL"],
	},
	{
		name: "Leota Dilliard",
		email: "leota@hotmail.com",
		phone: "408-752-3500",
		addresses: ["7 W Jackson Blvd, San Jose, CA"],
	},
	{
		name: "Sage Wieser",
		email: "sage_wieser@cox.net",
		phone: "605-414-2147",
		addresses: ["5 Boston Ave #88, Sioux Falls, SD"],
	},
	{
		name: "Kris Marrier",
		email: "kris@gmail.com",
		phone: "410-655-8723",
		addresses: ["228 Runamuck Pl #2808, Baltimore, MD"],
	},
	{
		name: "Minna Amigon",
		email: "minna_amigon@yahoo.com",
		phone: "215-874-1229",
		addresses: ["2371 Jerrold Ave, Kulpsville, PA"],
	},
	{
		name: "Abel Maclead",
		email: "amaclead@gmail.com",
		phone: "631-335-3414",
		addresses: ["37275 St  Rt 17m M, Middle Island, NY"],
	},
	{
		name: "Kiley Caldarera",
		email: "kiley.caldarera@aol.com",
		phone: "310-498-5651",
		addresses: ["25 E 75th St #69, Los Angeles, CA"],
	},
	{
		name: "Graciela Ruta",
		email: "gruta@cox.net",
		phone: "440-780-8425",
		addresses: ["98 Connecticut Ave Nw, Chagrin Falls, OH"],
	},
	{
		name: "Cammy Albares",
		email: "calbares@gmail.com",
		phone: "956-537-6195",
		addresses: ["56 E Morehead St, Laredo, TX"],
	},
	{
		name: "Mattie Poquette",
		email: "mattie@aol.com",
		phone: "602-277-4385",
		addresses: ["73 State Road 434 E, Phoenix, AZ"],
	},
	{
		name: "Meaghan Garufi",
		email: "meaghan@hotmail.com",
		phone: "931-313-9635",
		addresses: ["69734 E Carrillo St, Mc Minnville, TN"],
	},
	{
		name: "Gladys Rim",
		email: "gladys.rim@rim.org",
		phone: "414-661-9598",
		addresses: ["322 New Horizon Blvd, Milwaukee, WI"],
	},
	{
		name: "Yuki Whobrey",
		email: "yuki_whobrey@aol.com",
		phone: "313-288-7937",
		addresses: ["1 State Route 27, Taylor, MI"],
	},
	{
		name: "Fletcher Flosi",
		email: "fletcher.flosi@yahoo.com",
		phone: "815-828-2147",
		addresses: ["394 Manchester Blvd, Rockford, IL"],
	},
	{
		name: "Bette Nicka",
		email: "bette_nicka@cox.net",
		phone: "610-545-3615",
		addresses: ["6 S 33rd St, Aston, PA"],
	},
	{
		name: "Veronika Inouye",
		email: "vinouye@aol.com",
		phone: "408-540-1785",
		addresses: ["6 Greenleaf Ave, San Jose, CA"],
	},
	{
		name: "Willard Kolmetz",
		email: "willard@hotmail.com",
		phone: "972-303-9197",
		addresses: ["618 W Yakima Ave, Irving, TX"],
	},
	{
		name: "Maryann Royster",
		email: "mroyster@royster.com",
		phone: "518-966-7987",
		addresses: ["74 S Westgate St, Albany, NY"],
	},
	{
		name: "Alisha Slusarski",
		email: "alisha@slusarski.com",
		phone: "732-658-3154",
		addresses: ["3273 State St, Middlesex, NJ"],
	},
	{
		name: "Allene Iturbide",
		email: "allene_iturbide@cox.net",
		phone: "715-662-6764",
		addresses: ["1 Central Ave, Stevens Point, WI"],
	},
	{
		name: "Chanel Caudy",
		email: "chanel.caudy@caudy.org",
		phone: "913-388-2079",
		addresses: ["86 Nw 66th St #8673, Shawnee, KS"],
	},
	{
		name: "Ezekiel Chui",
		email: "ezekiel@chui.com",
		phone: "410-669-1642",
		addresses: ["2 Cedar Ave #84, Easton, MD"],
	},
	{
		name: "Willow Kusko",
		email: "wkusko@yahoo.com",
		phone: "212-582-4976",
		addresses: ["90991 Thorburn Ave, New York, NY"],
	},
	{
		name: "Bernardo Figeroa",
		email: "bfigeroa@aol.com",
		phone: "936-336-3951",
		addresses: ["386 9th Ave N, Conroe, TX"],
	},
	{
		name: "Ammie Corrio",
		email: "ammie@corrio.com",
		phone: "614-801-9788",
		addresses: ["74874 Atlantic Ave, Columbus, OH"],
	},
	{
		name: "Francine Vocelka",
		email: "francine_vocelka@vocelka.com",
		phone: "505-977-3911",
		addresses: ["366 South Dr, Las Cruces, NM"],
	},
	{
		name: "Ernie Stenseth",
		email: "ernie_stenseth@aol.com",
		phone: "201-709-6245",
		addresses: ["45 E Liberty St, Ridgefield Park, NJ"],
	},
	{
		name: "Albina Glick",
		email: "albina@glick.com",
		phone: "732-924-7882",
		addresses: ["4 Ralph Ct, Dunellen, NJ"],
	},
	{
		name: "Alishia Sergi",
		email: "asergi@gmail.com",
		phone: "212-860-1579",
		addresses: ["2742 Distribution Way, New York, NY"],
	},
	{
		name: "Solange Shinko",
		email: "solange@shinko.com",
		phone: "504-979-9175",
		addresses: ["426 Wolf St, Metairie, LA"],
	},
	{
		name: "Jose Stockham",
		email: "jose@yahoo.com",
		phone: "212-675-8570",
		addresses: ["128 Bransten Rd, New York, NY"],
	},
	{
		name: "Rozella Ostrosky",
		email: "rozella.ostrosky@ostrosky.com",
		phone: "805-832-6163",
		addresses: ["17 Morena Blvd, Camarillo, CA"],
	},
	{
		name: "Valentine Gillian",
		email: "valentine_gillian@gmail.com",
		phone: "210-812-9597",
		addresses: ["775 W 17th St, San Antonio, TX"],
	},
	{
		name: "Kati Rulapaugh",
		email: "kati.rulapaugh@hotmail.com",
		phone: "785-463-7829",
		addresses: ["6980 Dorsett Rd, Abilene, KS"],
	},
	{
		name: "Youlanda Schemmer",
		email: "youlanda@aol.com",
		phone: "541-548-8197",
		addresses: ["2881 Lewis Rd, Prineville, OR"],
	},
	{
		name: "Dyan Oldroyd",
		email: "doldroyd@aol.com",
		phone: "913-413-4604",
		addresses: ["7219 Woodfield Rd, Overland Park, KS"],
	},
	{
		name: "Roxane Campain",
		email: "roxane@hotmail.com",
		phone: "907-231-4722",
		addresses: ["1048 Main St, Fairbanks, AK"],
	},
	{
		name: "Lavera Perin",
		email: "lperin@perin.org",
		phone: "305-606-7291",
		addresses: ["678 3rd Ave, Miami, FL"],
	},
	{
		name: "Erick Ferencz",
		email: "erick.ferencz@aol.com",
		phone: "907-741-1044",
		addresses: ["20 S Babcock St, Fairbanks, AK"],
	},
	{
		name: "Fatima Saylors",
		email: "fsaylors@saylors.org",
		phone: "952-768-2416",
		addresses: ["2 Lighthouse Ave, Hopkins, MN"],
	},
	{
		name: "Jina Briddick",
		email: "jina_briddick@briddick.com",
		phone: "617-399-5124",
		addresses: ["38938 Park Blvd, Boston, MA"],
	},
	{
		name: "Kanisha Waycott",
		email: "kanisha_waycott@yahoo.com",
		phone: "323-453-2780",
		addresses: ["5 Tomahawk Dr, Los Angeles, CA"],
	},
	{
		name: "Emerson Bowley",
		email: "emerson.bowley@bowley.org",
		phone: "608-336-7444",
		addresses: ["762 S Main St, Madison, WI"],
	},
	{
		name: "Blair Malet",
		email: "bmalet@yahoo.com",
		phone: "215-907-9111",
		addresses: ["209 Decker Dr, Philadelphia, PA"],
	},
	{
		name: "Brock Bolognia",
		email: "bbolognia@yahoo.com",
		phone: "212-402-9216",
		addresses: ["4486 W O St #1, New York, NY"],
	},
	{
		name: "Lorrie Nestle",
		email: "lnestle@hotmail.com",
		phone: "931-875-6644",
		addresses: ["39 S 7th St, Tullahoma, TN"],
	},
	{
		name: "Sabra Uyetake",
		email: "sabra@uyetake.org",
		phone: "803-925-5213",
		addresses: ["98839 Hawthorne Blvd #6101, Columbia, SC"],
	},
	{
		name: "Marjory Mastella",
		email: "mmastella@mastella.com",
		phone: "610-814-5533",
		addresses: ["71 San Mateo Ave, Wayne, PA"],
	},
	{
		name: "Karl Klonowski",
		email: "karl_klonowski@yahoo.com",
		phone: "908-877-6135",
		addresses: ["76 Brooks St #9, Flemington, NJ"],
	},
	{
		name: "Tonette Wenner",
		email: "twenner@aol.com",
		phone: "516-968-6051",
		addresses: ["4545 Courthouse Rd, Westbury, NY"],
	},
	{
		name: "Amber Monarrez",
		email: "amber_monarrez@monarrez.org",
		phone: "215-934-8655",
		addresses: ["14288 Foster Ave #4121, Jenkintown, PA"],
	},
	{
		name: "Shenika Seewald",
		email: "shenika@gmail.com",
		phone: "818-423-4007",
		addresses: ["4 Otis St, Van Nuys, CA"],
	},
	{
		name: "Delmy Ahle",
		email: "delmy.ahle@hotmail.com",
		phone: "401-458-2547",
		addresses: ["65895 S 16th St, Providence, RI"],
	},
	{
		name: "Deeanna Juhas",
		email: "deeanna_juhas@gmail.com",
		phone: "215-211-9589",
		addresses: ["14302 Pennsylvania Ave, Huntingdon Valley, PA"],
	},
	{
		name: "Blondell Pugh",
		email: "bpugh@aol.com",
		phone: "401-960-8259",
		addresses: ["201 Hawk Ct, Providence, RI"],
	},
	{
		name: "Jamal Vanausdal",
		email: "jamal@vanausdal.org",
		phone: "732-234-1546",
		addresses: ["53075 Sw 152nd Ter #615, Monroe Township, NJ"],
	},
	{
		name: "Cecily Hollack",
		email: "cecily@hollack.org",
		phone: "512-486-3817",
		addresses: ["59 N Groesbeck Hwy, Austin, TX"],
	},
	{
		name: "Carmelina Lindall",
		email: "carmelina_lindall@lindall.com",
		phone: "303-724-7371",
		addresses: ["2664 Lewis Rd, Littleton, CO"],
	},
	{
		name: "Maurine Yglesias",
		email: "maurine_yglesias@yglesias.com",
		phone: "414-748-1374",
		addresses: ["59 Shady Ln #53, Milwaukee, WI"],
	},
	{
		name: "Tawna Buvens",
		email: "tawna@gmail.com",
		phone: "212-674-9610",
		addresses: ["3305 Nabell Ave #679, New York, NY"],
	},
	{
		name: "Penney Weight",
		email: "penney_weight@aol.com",
		phone: "907-797-9628",
		addresses: ["18 Fountain St, Anchorage, AK"],
	},
	{
		name: "Elly Morocco",
		email: "elly_morocco@gmail.com",
		phone: "814-393-5571",
		addresses: ["7 W 32nd St, Erie, PA"],
	},
	{
		name: "Ilene Eroman",
		email: "ilene.eroman@hotmail.com",
		phone: "410-914-9018",
		addresses: ["2853 S Central Expy, Glen Burnie, MD"],
	},
	{
		name: "Vallie Mondella",
		email: "vmondella@mondella.com",
		phone: "208-862-5339",
		addresses: ["74 W College St, Boise, ID"],
	},
	{
		name: "Kallie Blackwood",
		email: "kallie.blackwood@gmail.com",
		phone: "415-315-2761",
		addresses: ["701 S Harrison Rd, San Francisco, CA"],
	},
	{
		name: "Johnetta Abdallah",
		email: "johnetta_abdallah@aol.com",
		phone: "919-225-9345",
		addresses: ["1088 Pinehurst St, Chapel Hill, NC"],
	},
	{
		name: "Bobbye Rhym",
		email: "brhym@rhym.com",
		phone: "650-528-5783",
		addresses: ["30 W 80th St #1995, San Carlos, CA"],
	},
	{
		name: "Micaela Rhymes",
		email: "micaela_rhymes@gmail.com",
		phone: "925-647-3298",
		addresses: ["20932 Hedley St, Concord, CA"],
	},
	{
		name: "Tamar Hoogland",
		email: "tamar@hotmail.com",
		phone: "740-343-8575",
		addresses: ["2737 Pistorio Rd #9230, London, OH"],
	},
	{
		name: "Moon Parlato",
		email: "moon@yahoo.com",
		phone: "585-866-8313",
		addresses: ["74989 Brandon St, Wellsville, NY"],
	},
	{
		name: "Laurel Reitler",
		email: "laurel_reitler@reitler.com",
		phone: "410-520-4832",
		addresses: ["6 Kains Ave, Baltimore, MD"],
	},
	{
		name: "Delisa Crupi",
		email: "delisa.crupi@crupi.com",
		phone: "973-354-2040",
		addresses: ["47565 W Grand Ave, Newark, NJ"],
	},
	{
		name: "Viva Toelkes",
		email: "viva.toelkes@gmail.com",
		phone: "773-446-5569",
		addresses: ["4284 Dorigo Ln, Chicago, IL"],
	},
	{
		name: "Elza Lipke",
		email: "elza@yahoo.com",
		phone: "973-927-3447",
		addresses: ["6794 Lake Dr E, Newark, NJ"],
	},
	{
		name: "Devorah Chickering",
		email: "devorah@hotmail.com",
		phone: "505-975-8559",
		addresses: ["31 Douglas Blvd #950, Clovis, NM"],
	},
	{
		name: "Timothy Mulqueen",
		email: "timothy_mulqueen@mulqueen.org",
		phone: "718-332-6527",
		addresses: ["44 W 4th St, Staten Island, NY"],
	},
	{
		name: "Arlette Honeywell",
		email: "ahoneywell@honeywell.com",
		phone: "904-775-4480",
		addresses: ["11279 Loytan St, Jacksonville, FL"],
	},
	{
		name: "Dominque Dickerson",
		email: "dominque.dickerson@dickerson.org",
		phone: "510-993-3758",
		addresses: ["69 Marquette Ave, Hayward, CA"],
	},
	{
		name: "Lettie Isenhower",
		email: "lettie_isenhower@yahoo.com",
		phone: "216-657-7668",
		addresses: ["70 W Main St, Beachwood, OH"],
	},
	{
		name: "Myra Munns",
		email: "mmunns@cox.net",
		phone: "817-914-7518",
		addresses: ["461 Prospect Pl #316, Euless, TX"],
	},
	{
		name: "Stephaine Barfield",
		email: "stephaine@barfield.com",
		phone: "310-774-7643",
		addresses: ["47154 Whipple Ave Nw, Gardena, CA"],
	},
	{
		name: "Lai Gato",
		email: "lai.gato@gato.org",
		phone: "847-728-7286",
		addresses: ["37 Alabama Ave, Evanston, IL"],
	},
	{
		name: "Stephen Emigh",
		email: "stephen_emigh@hotmail.com",
		phone: "330-537-5358",
		addresses: ["3777 E Richmond St #900, Akron, OH"],
	},
	{
		name: "Tyra Shields",
		email: "tshields@gmail.com",
		phone: "215-255-1641",
		addresses: ["3 Fort Worth Ave, Philadelphia, PA"],
	},
	{
		name: "Tammara Wardrip",
		email: "twardrip@cox.net",
		phone: "650-803-1936",
		addresses: ["4800 Black Horse Pike, Burlingame, CA"],
	},
	{
		name: "Cory Gibes",
		email: "cory.gibes@gmail.com",
		phone: "626-572-1096",
		addresses: ["83649 W Belmont Ave, San Gabriel, CA"],
	},
	{
		name: "Danica Bruschke",
		email: "danica_bruschke@gmail.com",
		phone: "254-782-8569",
		addresses: ["840 15th Ave, Waco, TX"],
	},
	{
		name: "Wilda Giguere",
		email: "wilda@cox.net",
		phone: "907-870-5536",
		addresses: ["1747 Calle Amanecer #2, Anchorage, AK"],
	},
	{
		name: "Elvera Benimadho",
		email: "elvera.benimadho@cox.net",
		phone: "408-703-8505",
		addresses: ["99385 Charity St #840, San Jose, CA"],
	},
	{
		name: "Carma Vanheusen",
		email: "carma@cox.net",
		phone: "510-503-7169",
		addresses: ["68556 Central Hwy, San Leandro, CA"],
	},
	{
		name: "Malinda Hochard",
		email: "malinda.hochard@yahoo.com",
		phone: "317-722-5066",
		addresses: ["55 Riverside Ave, Indianapolis, IN"],
	},
	{
		name: "Natalie Fern",
		email: "natalie.fern@hotmail.com",
		phone: "307-704-8713",
		addresses: ["7140 University Ave, Rock Springs, WY"],
	},
	{
		name: "Lisha Centini",
		email: "lisha@centini.org",
		phone: "703-235-3937",
		addresses: ["64 5th Ave #1153, Mc Lean, VA"],
	},
	{
		name: "Arlene Klusman",
		email: "arlene_klusman@gmail.com",
		phone: "504-710-5840",
		addresses: ["3 Secor Rd, New Orleans, LA"],
	},
	{
		name: "Alease Buemi",
		email: "alease@buemi.com",
		phone: "303-301-4946",
		addresses: ["4 Webbs Chapel Rd, Boulder, CO"],
	},
	{
		name: "Louisa Cronauer",
		email: "louisa@cronauer.com",
		phone: "510-828-7047",
		addresses: ["524 Louisiana Ave Nw, San Leandro, CA"],
	},
	{
		name: "Angella Cetta",
		email: "angella.cetta@hotmail.com",
		phone: "808-892-7943",
		addresses: ["185 Blackstone Bldge, Honolulu, HI"],
	},
	{
		name: "Cyndy Goldammer",
		email: "cgoldammer@cox.net",
		phone: "952-334-9408",
		addresses: ["170 Wyoming Ave, Burnsville, MN"],
	},
	{
		name: "Rosio Cork",
		email: "rosio.cork@gmail.com",
		phone: "336-243-5659",
		addresses: ["4 10th St W, High Point, NC"],
	},
	{
		name: "Celeste Korando",
		email: "ckorando@hotmail.com",
		phone: "516-509-2347",
		addresses: ["7 W Pinhook Rd, Lynbrook, NY"],
	},
	{
		name: "Twana Felger",
		email: "twana.felger@felger.org",
		phone: "503-939-3153",
		addresses: ["1 Commerce Way, Portland, OR"],
	},
	{
		name: "Estrella Samu",
		email: "estrella@aol.com",
		phone: "608-976-7199",
		addresses: ["64 Lakeview Ave, Beloit, WI"],
	},
	{
		name: "Donte Kines",
		email: "dkines@hotmail.com",
		phone: "508-429-8576",
		addresses: ["3 Aspen St, Worcester, MA"],
	},
	{
		name: "Tiffiny Steffensmeier",
		email: "tiffiny_steffensmeier@cox.net",
		phone: "305-385-9695",
		addresses: ["32860 Sierra Rd, Miami, FL"],
	},
	{
		name: "Edna Miceli",
		email: "emiceli@miceli.org",
		phone: "814-460-2655",
		addresses: ["555 Main St, Erie, PA"],
	},
	{
		name: "Sue Kownacki",
		email: "sue@aol.com",
		phone: "972-666-3413",
		addresses: ["2 Se 3rd Ave, Mesquite, TX"],
	},
	{
		name: "Jesusa Shin",
		email: "jshin@shin.com",
		phone: "931-273-8709",
		addresses: ["2239 Shawnee Mission Pky, Tullahoma, TN"],
	},
	{
		name: "Rolland Francescon",
		email: "rolland@cox.net",
		phone: "973-649-2922",
		addresses: ["2726 Charcot Ave, Paterson, NJ"],
	},
	{
		name: "Pamella Schmierer",
		email: "pamella.schmierer@schmierer.org",
		phone: "305-420-8970",
		addresses: ["5161 Dorsett Rd, Homestead, FL"],
	},
	{
		name: "Glory Kulzer",
		email: "gkulzer@kulzer.org",
		phone: "410-224-9462",
		addresses: ["55892 Jacksonville Rd, Owings Mills, MD"],
	},
	{
		name: "Shawna Palaspas",
		email: "shawna_palaspas@palaspas.org",
		phone: "805-275-3566",
		addresses: ["5 N Cleveland Massillon Rd, Thousand Oaks, CA"],
	},
	{
		name: "Brandon Callaro",
		email: "brandon_callaro@hotmail.com",
		phone: "808-215-6832",
		addresses: ["7 Benton Dr, Honolulu, HI"],
	},
	{
		name: "Scarlet Cartan",
		email: "scarlet.cartan@yahoo.com",
		phone: "229-735-3378",
		addresses: ["9390 S Howell Ave, Albany, GA"],
	},
	{
		name: "Oretha Menter",
		email: "oretha_menter@yahoo.com",
		phone: "617-418-5043",
		addresses: ["8 County Center Dr #647, Boston, MA"],
	},
	{
		name: "Ty Smith",
		email: "tsmith@aol.com",
		phone: "201-672-1553",
		addresses: ["4646 Kaahumanu St, Hackensack, NJ"],
	},
	{
		name: "Xuan Rochin",
		email: "xuan@gmail.com",
		phone: "650-933-5072",
		addresses: ["2 Monroe St, San Mateo, CA"],
	},
	{
		name: "Lindsey Dilello",
		email: "lindsey.dilello@hotmail.com",
		phone: "909-639-9887",
		addresses: ["52777 Leaders Heights Rd, Ontario, CA"],
	},
	{
		name: "Devora Perez",
		email: "devora_perez@perez.org",
		phone: "510-955-3016",
		addresses: ["72868 Blackington Ave, Oakland, CA"],
	},
	{
		name: "Herman Demesa",
		email: "hdemesa@cox.net",
		phone: "518-497-2940",
		addresses: ["9 Norristown Rd, Troy, NY"],
	},
	{
		name: "Rory Papasergi",
		email: "rpapasergi@cox.net",
		phone: "570-867-7489",
		addresses: ["83 County Road 437 #8581, Clarks Summit, PA"],
	},
	{
		name: "Talia Riopelle",
		email: "talia_riopelle@aol.com",
		phone: "973-245-2133",
		addresses: ["1 N Harlem Ave #9, Orange, NJ"],
	},
	{
		name: "Van Shire",
		email: "van.shire@shire.com",
		phone: "908-409-2890",
		addresses: ["90131 J St, Pittstown, NJ"],
	},
	{
		name: "Lucina Lary",
		email: "lucina_lary@cox.net",
		phone: "321-749-4981",
		addresses: ["8597 W National Ave, Cocoa, FL"],
	},
	{
		name: "Bok Isaacs",
		email: "bok.isaacs@aol.com",
		phone: "718-809-3762",
		addresses: ["6 Gilson St, Bronx, NY"],
	},
	{
		name: "Rolande Spickerman",
		email: "rolande.spickerman@spickerman.com",
		phone: "808-315-3077",
		addresses: ["65 W Maple Ave, Pearl City, HI"],
	},
	{
		name: "Howard Paulas",
		email: "hpaulas@gmail.com",
		phone: "303-623-4241",
		addresses: ["866 34th Ave, Denver, CO"],
	},
	{
		name: "Kimbery Madarang",
		email: "kimbery_madarang@cox.net",
		phone: "973-310-1634",
		addresses: ["798 Lund Farm Way, Rockaway, NJ"],
	},
	{
		name: "Thurman Manno",
		email: "thurman.manno@yahoo.com",
		phone: "609-524-3586",
		addresses: ["9387 Charcot Ave, Absecon, NJ"],
	},
	{
		name: "Becky Mirafuentes",
		email: "becky.mirafuentes@mirafuentes.com",
		phone: "908-877-8409",
		addresses: ["30553 Washington Rd, Plainfield, NJ"],
	},
	{
		name: "Beatriz Corrington",
		email: "beatriz@yahoo.com",
		phone: "508-584-4279",
		addresses: ["481 W Lemon St, Middleboro, MA"],
	},
	{
		name: "Marti Maybury",
		email: "marti.maybury@yahoo.com",
		phone: "773-775-4522",
		addresses: ["4 Warehouse Point Rd #7, Chicago, IL"],
	},
	{
		name: "Nieves Gotter",
		email: "nieves_gotter@gmail.com",
		phone: "503-527-5274",
		addresses: ["4940 Pulaski Park Dr, Portland, OR"],
	},
	{
		name: "Leatha Hagele",
		email: "lhagele@cox.net",
		phone: "214-339-1809",
		addresses: ["627 Walford Ave, Dallas, TX"],
	},
	{
		name: "Valentin Klimek",
		email: "vklimek@klimek.org",
		phone: "312-303-5453",
		addresses: ["137 Pioneer Way, Chicago, IL"],
	},
	{
		name: "Melissa Wiklund",
		email: "melissa@cox.net",
		phone: "419-939-3613",
		addresses: ["61 13 Stoneridge #835, Findlay, OH"],
	},
	{
		name: "Sheridan Zane",
		email: "sheridan.zane@zane.com",
		phone: "951-645-3605",
		addresses: ["2409 Alabama Rd, Riverside, CA"],
	},
	{
		name: "Bulah Padilla",
		email: "bulah_padilla@hotmail.com",
		phone: "254-463-4368",
		addresses: ["8927 Vandever Ave, Waco, TX"],
	},
	{
		name: "Audra Kohnert",
		email: "audra@kohnert.com",
		phone: "615-406-7854",
		addresses: ["134 Lewis Rd, Nashville, TN"],
	},
	{
		name: "Daren Weirather",
		email: "dweirather@aol.com",
		phone: "414-959-2540",
		addresses: ["9 N College Ave #3, Milwaukee, WI"],
	},
	{
		name: "Fernanda Jillson",
		email: "fjillson@aol.com",
		phone: "410-387-5260",
		addresses: ["60480 Old Us Highway 51, Preston, MD"],
	},
	{
		name: "Gearldine Gellinger",
		email: "gearldine_gellinger@gellinger.com",
		phone: "972-934-6914",
		addresses: ["4 Bloomfield Ave, Irving, TX"],
	},
	{
		name: "Chau Kitzman",
		email: "chau@gmail.com",
		phone: "310-560-8022",
		addresses: ["429 Tiger Ln, Beverly Hills, CA"],
	},
	{
		name: "Theola Frey",
		email: "theola_frey@frey.com",
		phone: "516-948-5768",
		addresses: ["54169 N Main St, Massapequa, NY"],
	},
	{
		name: "Cheryl Haroldson",
		email: "cheryl@haroldson.org",
		phone: "609-518-7697",
		addresses: ["92 Main St, Atlantic City, NJ"],
	},
	{
		name: "Laticia Merced",
		email: "lmerced@gmail.com",
		phone: "513-508-7371",
		addresses: ["72 Mannix Dr, Cincinnati, OH"],
	},
	{
		name: "Carissa Batman",
		email: "carissa.batman@yahoo.com",
		phone: "541-326-4074",
		addresses: ["12270 Caton Center Dr, Eugene, OR"],
	},
	{
		name: "Lezlie Craghead",
		email: "lezlie.craghead@craghead.org",
		phone: "919-533-3762",
		addresses: ["749 W 18th St #45, Smithfield, NC"],
	},
	{
		name: "Ozell Shealy",
		email: "oshealy@hotmail.com",
		phone: "212-332-8435",
		addresses: ["8 Industry Ln, New York, NY"],
	},
	{
		name: "Arminda Parvis",
		email: "arminda@parvis.com",
		phone: "602-906-9419",
		addresses: ["1 Huntwood Ave, Phoenix, AZ"],
	},
	{
		name: "Reita Leto",
		email: "reita.leto@gmail.com",
		phone: "317-234-1135",
		addresses: ["55262 N French Rd, Indianapolis, IN"],
	},
	{
		name: "Yolando Luczki",
		email: "yolando@cox.net",
		phone: "315-304-4759",
		addresses: ["422 E 21st St, Syracuse, NY"],
	},
	{
		name: "Lizette Stem",
		email: "lizette.stem@aol.com",
		phone: "856-487-5412",
		addresses: ["501 N 19th Ave, Cherry Hill, NJ"],
	},
	{
		name: "Gregoria Pawlowicz",
		email: "gpawlowicz@yahoo.com",
		phone: "516-212-1915",
		addresses: ["455 N Main Ave, Garden City, NY"],
	},
	{
		name: "Carin Deleo",
		email: "cdeleo@deleo.com",
		phone: "501-308-1040",
		addresses: ["1844 Southern Blvd, Little Rock, AR"],
	},
	{
		name: "Chantell Maynerich",
		email: "chantell@yahoo.com",
		phone: "651-591-2583",
		addresses: ["2023 Greg St, Saint Paul, MN"],
	},
	{
		name: "Dierdre Yum",
		email: "dyum@yahoo.com",
		phone: "215-325-3042",
		addresses: ["63381 Jenks Ave, Philadelphia, PA"],
	},
	{
		name: "Larae Gudroe",
		email: "larae_gudroe@gmail.com",
		phone: "985-890-7262",
		addresses: ["6651 Municipal Rd, Houma, LA"],
	},
	{
		name: "Latrice Tolfree",
		email: "latrice.tolfree@hotmail.com",
		phone: "631-957-7624",
		addresses: ["81 Norris Ave #525, Ronkonkoma, NY"],
	},
	{
		name: "Kerry Theodorov",
		email: "kerry.theodorov@gmail.com",
		phone: "916-591-3277",
		addresses: ["6916 W Main St, Sacramento, CA"],
	},
	{
		name: "Dorthy Hidvegi",
		email: "dhidvegi@yahoo.com",
		phone: "208-649-2373",
		addresses: ["9635 S Main St, Boise, ID"],
	},
	{
		name: "Fannie Lungren",
		email: "fannie.lungren@yahoo.com",
		phone: "512-587-5746",
		addresses: ["17 Us Highway 111, Round Rock, TX"],
	},
	{
		name: "Evangelina Radde",
		email: "evangelina@aol.com",
		phone: "215-964-3284",
		addresses: ["992 Civic Center Dr, Philadelphia, PA"],
	},
	{
		name: "Novella Degroot",
		email: "novella_degroot@degroot.org",
		phone: "808-477-4775",
		addresses: ["303 N Radcliffe St, Hilo, HI"],
	},
	{
		name: "Clay Hoa",
		email: "choa@hoa.org",
		phone: "775-501-8109",
		addresses: ["73 Saint Ann St #86, Reno, NV"],
	},
	{
		name: "Jennifer Fallick",
		email: "jfallick@yahoo.com",
		phone: "847-979-9545",
		addresses: ["44 58th St, Wheeling, IL"],
	},
	{
		name: "Irma Wolfgramm",
		email: "irma.wolfgramm@hotmail.com",
		phone: "973-545-7355",
		addresses: ["9745 W Main St, Randolph, NJ"],
	},
	{
		name: "Eun Coody",
		email: "eun@yahoo.com",
		phone: "864-256-3620",
		addresses: ["84 Bloomfield Ave, Spartanburg, SC"],
	},
	{
		name: "Sylvia Cousey",
		email: "sylvia_cousey@cousey.org",
		phone: "410-209-9545",
		addresses: ["287 Youngstown Warren Rd, Hampstead, MD"],
	},
	{
		name: "Nana Wrinkles",
		email: "nana@aol.com",
		phone: "914-855-2115",
		addresses: ["6 Van Buren St, Mount Vernon, NY"],
	},
	{
		name: "Layla Springe",
		email: "layla.springe@cox.net",
		phone: "212-260-3151",
		addresses: ["229 N Forty Driv, New York, NY"],
	},
	{
		name: "Joesph Degonia",
		email: "joesph_degonia@degonia.org",
		phone: "510-677-9785",
		addresses: ["2887 Knowlton St #5435, Berkeley, CA"],
	},
	{
		name: "Annabelle Boord",
		email: "annabelle.boord@cox.net",
		phone: "978-697-6263",
		addresses: ["523 Marquette Ave, Concord, MA"],
	},
	{
		name: "Stephaine Vinning",
		email: "stephaine@cox.net",
		phone: "415-767-6596",
		addresses: ["3717 Hamann Industrial Pky, San Francisco, CA"],
	},
	{
		name: "Nelida Sawchuk",
		email: "nelida@gmail.com",
		phone: "201-971-1638",
		addresses: ["3 State Route 35 S, Paramus, NJ"],
	},
	{
		name: "Marguerita Hiatt",
		email: "marguerita.hiatt@gmail.com",
		phone: "925-634-7158",
		addresses: ["82 N Highway 67, Oakley, CA"],
	},
	{
		name: "Carmela Cookey",
		email: "ccookey@cookey.org",
		phone: "773-494-4195",
		addresses: ["9 Murfreesboro Rd, Chicago, IL"],
	},
	{
		name: "Junita Brideau",
		email: "jbrideau@aol.com",
		phone: "973-943-3423",
		addresses: ["6 S Broadway St, Cedar Grove, NJ"],
	},
	{
		name: "Claribel Varriano",
		email: "claribel_varriano@cox.net",
		phone: "419-544-4900",
		addresses: ["6 Harry L Dr #6327, Perrysburg, OH"],
	},
	{
		name: "Benton Skursky",
		email: "benton.skursky@aol.com",
		phone: "310-579-2907",
		addresses: ["47939 Porter Ave, Gardena, CA"],
	},
	{
		name: "Hillary Skulski",
		email: "hillary.skulski@aol.com",
		phone: "352-242-2570",
		addresses: ["9 Wales Rd Ne #914, Homosassa, FL"],
	},
	{
		name: "Merilyn Bayless",
		email: "merilyn_bayless@cox.net",
		phone: "408-758-5015",
		addresses: ["195 13n N, Santa Clara, CA"],
	},
	{
		name: "Teri Ennaco",
		email: "tennaco@gmail.com",
		phone: "570-889-5187",
		addresses: ["99 Tank Farm Rd, Hazleton, PA"],
	},
];

export default Clients;
