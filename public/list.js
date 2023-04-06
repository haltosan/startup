//set the title to be the recipient's name 
function setRecipientName(name){
	const title = document.querySelector("#recipientName");
	title.textContent = (name) + "'s list";
}

function getRecipientName(){
	return localStorage.getItem("recipient");
}

//pull in the proper data for that specific user 
const lists = {
	"Sarah" : [[false, "Roller skates, pink, gloss finish, size 7 1/2"],
	           [true,  "Socks, something fuzzy, not white"],
			   [false, "Origami paper, any color"],
			   [false, "Starbucks gift card"]],
	"Olaf"  : [[false, "Carrots, large, at least 5lb."],
	           [false, "Barbeque, at least 3' long"],
			   [true,  "Coal for the barbeque"],
			   [false, "Ligher fluid for the barbeque"],
			   [false, "Barbeque cleaning kit"]],
	"Guest" : [[false, "Kettle bell"],
	           [true,  "2 lb dumbell"],
			   [false, "5 lb dumbell"],
			   [false, "bench press bench"],
			   [false, "bench press bar"]]
}

async function getList(){
	const response = await fetch('/api/list/' + getRecipientName());
	let list;
	try{
		list = await response.json();
		setRecipientName(getRecipientName());
	}
	catch(error){
		list = {'list' : lists['Guest']};
		setRecipientName('Guest');
	}
	return list['list'];
}

function listToHTML(list){
	let html = '<thead>\
    <tr>\
      <th scope="col">Has?</th>\
      <th scope="col">Item Description</th>\
    </tr>\
  </thead>\
  <tbody>';
	for(const row in list){
		html = html + '\
		<tr>\
		  <th onclick=sucker.update(this) scope="row" id="' + list[row][1] + '">' + (list[row][0] ? "Yes" : "No") + '</th>\
		  <td>' + list[row][1] + '</td>\
		</tr>';
	}
	html = html + "</tbody>";
	return html;
}

function setWishList(data){
	const wishlist = document.querySelector("#wishlist");
	wishlist.innerHTML = data;
}

class Sucker{
	socket;

	async configureWebSocket() {
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
		this.socket.onopen = (event) => {
			this.displayMsg('system', 'game', 'connected');
		};
		this.socket.onclose = (event) => {
			this.displayMsg('system', 'game', 'disconnected');
		};
		this.socket.onmessage = async (event) => {
			const msg = JSON.parse(await event.data.text());
			this.displayMsg('player', msg.from, msg.value);
		};
	}

	displayMsg(cls, from, msg) {
		const chatText = document.querySelector('#player-messages');
		chatText.innerHTML = `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
	}

	async broadcastEvent(from, type, value) {
		console.log(value);
		const event = {
			from: from,
			type: type,
			value: value,
		};
		await this.socket.send(JSON.stringify(event));
	}

	update(cell){
		if(cell.innerText === "Yes"){
			cell.innerText = "No";
		}
		else{
			cell.innerText = "Yes";
			this.broadcastEvent(localStorage.getItem('userName') + ' is getting', 'got', cell.id);
		}
	}

}

let sucker = new Sucker();

async function main(){
	setWishList(listToHTML(await getList()));
	await sucker.configureWebSocket();
}

main();

