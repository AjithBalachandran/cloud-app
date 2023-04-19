const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/:place", async (req, res) => {
  try {
    const city = req.params.place;
    console.log("place is", city);
    const url = `http://api.weatherapi.com/v1/current.json?key=671844879da44a519f172912230503&q=${city}&aqi=no`;
    request(url, (error, response, body) => {
      res.send(body);
    });
  } catch (error) {}
});
app.listen(4000, () => console.log("port start running 4000"));
