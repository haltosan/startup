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
			   [false, "5 lb dumell"],
			   [false, "bench press bench"],
			   [false, "bench press bar"]]
}

function getList(){
	return lists[getRecipientName() ?? "Guest"] ?? lists['Guest'];
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
		  <th scope="row">' + (list[row][0] ? "Yes" : "No") + '</th>\
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

function main(){
	setRecipientName();
	setWishList(listToHTML(getList()));
}

main();