/* Global Variables */
const api_key = "c80ecc5f0ecf7b961660ed34cd42b3c4";
const base_url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zip_code = document.getElementById('zip').value.trim();
  const user_response = document.getElementById('feelings').value.trim();
  if (zip_code) {
    getWeatherTemp(base_url, api_key, zip_code)
    .then(data => {
      postData('/addTemp', {temp: data.main.temp, date: newDate, user_response: user_response});
      updateUI();
    })
  } else {
    alert("YOU MUST ENTER A ZIP CODE");
  }
};

const getWeatherTemp = async (base_url, api_key, zip_code = '') =>{
  const res = await fetch(`${base_url}&zip=${zip_code}`)
  try {
    if (res.status == 200){
      const data = await res.json();
      return data;
    }else{
      throw new Error('Could not find temperture for this zip code.');
    }
  } catch(error) {
    alert(error);
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
    if (response.status == 200){
      const newData = await response.json();
      return;
    } else {
      throw new Error('Could not post your last entry.');
    }
  } catch(error) {
    alert(error);
  }
}

const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    if (allData){
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
      document.getElementById('content').innerHTML = `Your Feelings: ${allData.user_response}`;
    } else {
      throw new Error('Could not update your UI.');
    }
  }catch(error){
    alert(error);
  }
}