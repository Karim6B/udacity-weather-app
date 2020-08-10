/* Global Variables */
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=846d951b74c599ef22d8864ec0147e48";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const getWeather = async (baseUrl, cityZIP, apiKey) => {
  const response = await fetch(baseUrl + cityZIP + apiKey);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error" + error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const generateWeather = () => {
  const city = document.getElementById("zip").value;
  let fealings = document.getElementById("feelings").value;
  getWeather(baseUrl, city, apiKey).then((data) => {
    postData("/addData", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: fealings,
    }).then(updateUI());
  });
};

const updateUI = async () => {
  const response = await fetch("/all");
  try {
    const allData = await response.json();
    document.getElementById("date").innerHTML = `Date: ${
      allData[allData.length - 1].date
    }`;
    document.getElementById("temp").innerHTML = `Temprature: ${
      allData[allData.length - 1].temperature
    }`;
    document.getElementById("content").innerHTML = `Your mood: "${
      allData[allData.length - 1].userResponse
    }"`;
    console.log(allData[0]);
  } catch (error) {
    console.log("error", error);
  }
};

document.getElementById("generate").addEventListener("click", generateWeather);
