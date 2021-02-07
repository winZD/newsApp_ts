import express, { Request, Response } from "express";

import debug from "debug";
import axios from "axios";
import path from "path";

const app = express();
const cors = require("cors");
const PORT: number = 5000;
//app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

app.use(cors());

//get all data from API
app.get("/", (req: Request, res: Response) => {
  (async () => {
    try {
      const responseFromAPI: any = await axios.get(
        "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0de722d3812346418241fe6a93bd144a"
      );
      res.json(responseFromAPI.data.articles);
    } catch (error) {}
  })();
});
app.post("/articles/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  (async () => {
    try {
      const responseFromAPI: any = await axios.get(
        "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0de722d3812346418241fe6a93bd144a"
      );
      res.json(responseFromAPI.data.articles[id]);
    } catch (error) {}
  })();
});

app.post("/category/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  let date_ob: Date = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  let y_m_d = year + "-" + month + "-" + date;
  (async () => {
    try {
      const responseFromAPI: any = await axios.get(
        `http://newsapi.org/v2/top-headlines?country=us&category=${id}&apiKey=0de722d3812346418241fe6a93bd144a`
      );
      res.json(responseFromAPI.data.articles);
      console.log(id);
    } catch (error) {}
  })();
});

//http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0de722d3812346418241fe6a93bd144a
