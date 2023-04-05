//set the title to be the recipient's name 
function setRecipientName(){
	const title = document.querySelector("#recipientName");
	title.textContent = (getRecipientName() ?? "Guest") + "'s list";
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
	const response = await fetch('/api/list/Olaf');
	const list = await response.json();
	console.log('list: ' + list['list']);
	return list['list'] ?? lists['Guest'];
}

function listToHTML(list){
	console.log('html: ' + list);
	let html = '<thead>\
    <tr>\
      <th scope="col">Has?</th>\
      <th scope="col">Item Description</th>\
    </tr>\
  </thead>\
  <tbody>';
	for(const row in list){
		console.log('row: ' + row);
		html = html + '\
		<tr>\
		  <th onclick=update(this) scope="row">' + (list[row][0] ? "Yes" : "No") + '</th>\
		  <td>' + list[row][1] + '</td>\
		</tr>';
	}
	html = html + "</tbody>";
	return html;
}

function update(cell){
	if(cell.innerText === "Yes"){
		cell.innerText = "No";
	}
	else{
		cell.innerText = "Yes";
	}
}

function setWishList(data){
	const wishlist = document.querySelector("#wishlist");
	wishlist.innerHTML = data;
}

async function main(){
	setRecipientName();
	setWishList(listToHTML(await getList()));
}

main();