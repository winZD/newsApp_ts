import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { Route, useParams, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import "./myscss.scss";

const CategoryPage: any = () => {
  ////////////////////////////////////
  const { id }: any = useParams();
  const [categoryDataItem, setCategoryDataItem] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`http://localhost:5000/category/${id}`);
      console.log(response);

      setCategoryDataItem(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="main_category">
      <div style={{ backgroundColor: "whitesmoke", width: 800 }}>
        <h1>{id}</h1>{" "}
      </div>
      {categoryDataItem.map((article: any, index: any) => (
        <div key={index}>
          <a href={article.url}>
            <Card style={{ width: 750 }}>
              <Image size="huge" src={article.urlToImage} wrapped ui={true} />
              <Card.Content
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Header> {article.title}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    Published:{article.publishedAt.split("T")[0]}
                  </span>
                </Card.Meta>
                <Card.Description>{article.description}</Card.Description>
                <Card.Description> {article.content}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <a href={article.url}>
                    <button className="ui button">{article.source.name}</button>
                  </a>
                </a>
              </Card.Content>
            </Card>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
