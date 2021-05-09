console.log(document.referrer);
function saveDetails(e) {
  e.preventDefault();
  const pledge_url = window.location.href;
  const referrer_url = document.referrer;
  let data = {
    name: e.target[0].value,
    email: e.target[1].value,
    refCode: "",
    pledge_url: pledge_url,
    referrer_url: referrer_url,
  };
  let urlHash = window.location.hash;
  if (urlHash) {
    data["refCode"] = urlHash.substring(1);
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  var tohide = document.getElementsByClassName("tohide");

  for (i = 0; i < 5; i++) {
    tohide[i].style.display = "none";
  }

  document.getElementById("message").innerHTML = ` <h4 style="color:grey">
      Please wait a few seconds, while we generate your certificate......
	  <br/><img src="images/YVPG.gif"><br/>It could take a few seconds.
        <h4>`;

  return fetch(
    "https://womensday2021.thesparksfoundation.info/pledge/pledge.php",
    requestOptions
  )
    .then((response) => {
      if (response.status === 201) {
        document.getElementById(
          "message"
        ).innerHTML = ` <h4 style="color:white">Wait...<br/><br/>You are one step away from completing your pledge and being a part of the #IStandForGenderEquality Challenge.
		<br/><br/>Open your mail and click the link to complete your pledge and participate.</h4>`;
        return response.json();
      } else if (response.status === 409) {
        document.getElementById(
          "message"
        ).innerHTML = ` <div class="error"> You have aleady taken the pledge. Please check your email. OR Use another email.</div>`;
      } else {
        document.getElementById(
          "message"
        ).innerHTML = ` <div class="error"> Something went wrong, please try again after some time. OR Send your pledge at : pledge@tsf.sg </div>`;
      }
    })
    .catch((error) => {
      document.getElementById(
        "message"
      ).innerHTML = ` <div class="error">  Something went wrong, please try again after some time. OR Send your pledge at : pledge@tsf.sg </div>`;
    });
}

function on() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("message").innerHTML = "";
}

function off() {
  
  document.getElementById("overlay").style.display = "none";
}
