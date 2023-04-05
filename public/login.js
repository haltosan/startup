async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
	const recipient = document/querySelector("#recipient");
	localStorage.setItem("recipient", recipient.value);
    window.location.href = 'list.html';
  } else {
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}


async function login() {
	const seed = await getSeed();
	console.log(seed);
	const userName = document.querySelector("#userName");
	localStorage.setItem("userName", userName.value);
	const recipient = document.querySelector("#recipient");
	localStorage.setItem("recipient", recipient.value);
	window.location.href = "list.html";
}


function getSeed(){
	const apiURL = "https://api.drand.sh";
	const chainsURL = apiURL + "/chains";
	let seed = null;
	return fetch(chainsURL).then((response) => response.json()).then((data1) => {
		const chain = data1[0];
		const infoURL = apiURL + "/" + chain + "/public/latest";
		return fetch(infoURL).then((response) => response.json()).then((data2) => {
			return data2['randomness'];
		});
	});
}
