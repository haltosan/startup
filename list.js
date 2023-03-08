//set the title to be the recipient's name 
function setRecipientName(){
	const title = document.querySelector("#recipientName");
	title.textContent = (getRecipientName() ?? "Guest") + "'s list";
}

function getRecipientName(){
	return localStorage.getItem("recipient");
}

function main(){
	setRecipientName();
}

main();