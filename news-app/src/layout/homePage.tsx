import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Container, Header } from "semantic-ui-react";

import { Link } from "react-router-dom";

import { Button, Form } from "semantic-ui-react";
import { Grid, Image, Card } from "semantic-ui-react";
import { useHistory } from "react-router";

import "./myscss.scss";

const HomePage: any = () => {
  const options = ["Sport", "Business"];

  /////////////////////////////////////////////////////////////////
  const [allData, setAllData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<any>("");

  const [fav, setFav]: any = useState([] as Array<string>);
  const [favUrl, setFavUrl]: any = useState([] as Array<string>);

  const { push } = useHistory();
  let indexOf: any;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/");
      console.log(response);

      setAllData(response.data);
    };
    fetchData();
  }, []);

  const onClickHandler = (e: any) => {
    indexOf = e.currentTarget.getAttribute("data-index"); //will log the index of the clicked item
    //console.log(indexOf);
  };

  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  const searchHandler = (e: any) => {
    setSearchTerm(e.target.value);
    //console.log(searchTerm);
  };

  return (
    <div className="home_page">
      {" "}
      <div className="child_1">
        {favUrl.length === 0 ? (
          <Button disabled={true} style={{ margin: 5 }}>
            NO favourites
          </Button>
        ) : (
          favUrl.map((favURL: string, index: number) => (
            <a href={favURL}>
              <Button style={{ margin: 5 }}> {fav[index]}</Button>
            </a>
          ))
        )}
      </div>
      <div className="parent_content">
        <div className="child_2">
          <div
            className="child_3"
            style={{ display: "flex", flexDirection: "column", width: 750 }}
          >
            <div className="child_4">
              <h1
                style={{
                  color: "magenta",
                  fontSize: "50px",
                }}
              >
                latestnews
              </h1>{" "}
              <Form.Input
                style={{ margin: 17 }}
                placeholder="...search topic name"
                name="topic"
                onChange={searchHandler}
              />
            </div>

            <select
              className="ui search dropdown"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button
              style={{ width: 750 }}
              type="button"
              color="blue"
              onClick={() => push("/category/" + selectedOption.toLowerCase())}
            >
              GO
            </Button>
          </div>

          {allData
            .filter((user: any) => {
              return user.title.toLowerCase().indexOf(searchTerm) > -1;
            })
            .map((article: any, index: number) => (
              <div key={index}>
                <Card style={{ width: 750 }}>
                  <div style={{ margin: "15px" }}>
                    <Link to={"/article/" + index}>
                      <Header as="h2">{article.title + " (Read more)"}</Header>
                    </Link>
                  </div>
                  <Image
                    size="huge"
                    src={article.urlToImage}
                    wrapped
                    ui={true}
                  />
                  <Card.Content
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Card.Meta>
                      <span className="date">
                        Published:{article.publishedAt.split("T")[0]}
                      </span>
                    </Card.Meta>
                    <Card.Description>{article.description}</Card.Description>
                    <Card.Description> {article.content}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a href={article.url}>
                      <button className="ui button">
                        {article.source.name}
                      </button>
                    </a>
                  </Card.Content>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setFavUrl([...favUrl, article.url]);
                      setFav([...fav, article.source.name]);
                    }}
                  >
                    Add favourite
                  </Button>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
