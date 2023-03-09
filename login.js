function login() {
	const userName = document.querySelector("#userName");
	localStorage.setItem("userName", userName.value);
	const recipient = document.querySelector("#recipient");
	localStorage.setItem("recipient", recipient.value);
	window.location.href = "list.html";
}