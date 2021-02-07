import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { Route, useParams, useRouteMatch } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./myscss.scss";
import { flexbox } from "@material-ui/system";

const ArticlePage: any = () => {
  const { id }: any = useParams();
  const [dataItem, setDataItem] = useState<any>([]);
  let a: string = id.toUpperCase();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`http://localhost:5000/articles/${id}`);
      console.log(response);

      setDataItem(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="main_article">
      <div style={{ marginTop: 150 }}>
        <a href={dataItem.url}>
          <Card
            style={{
              width: 750,
              alignText: "center",
            }}
          >
            <Image size="huge" src={dataItem.urlToImage} wrapped ui={true} />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Card.Header> {dataItem.title}</Card.Header>
              <Card.Meta>
                <span className="date">Published:{dataItem.publishedAt}</span>
              </Card.Meta>
              <Card.Description>{dataItem.description}</Card.Description>
              <Card.Description> {dataItem.content}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <a href={dataItem.url}>
                  <button className="ui button">{"Visit page"}</button>
                </a>
              </a>
            </Card.Content>
          </Card>
        </a>
      </div>
    </div>
  );
};

export default ArticlePage;
