/* Global Variables */
const api_key = "c80ecc5f0ecf7b961660ed34cd42b3c4";
const base_url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zip_code = document.getElementById('zip').value;
  const user_response = document.getElementById('feelings').value;
  if (zip_code) {
    getWeatherTemp(base_url, api_key, zip_code)
    .then(data => {
      postData('/addTemp', {temp: data.main.temp, date: newDate, user_response: user_response});
    })
    .then(updateUI())
  } else {
    alert("YOU MUST ENTER A ZIP CODE");
  }
};

const getWeatherTemp = async (base_url, api_key, zip_code = '') =>{
  const res = await fetch(`${base_url}&zip=${zip_code}`)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
    alert("something went wrong, please try again later.");
  }
};

const postData = async ( url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },     
    body: JSON.stringify(data), 
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log(error);
    alert("something went wrong, please try again later.");
  }
}

const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById('content').innerHTML = `Your Feelings: ${allData.user_response}`;
  }catch(error){
    console.log("error", error);
  }
}