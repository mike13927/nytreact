import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import axios from "axios";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    title: "",
    author: "",
    synopsis: "",
    topic: "",
    startYear: "2005-05-05",
    endYear: "2015-06-09"
  };

  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles : res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = artId => {
    console.log("saving article", artId)
    var article = this.state.articles.find(art => {
      return art._id === artId;
    })
    console.log(article);
    API.saveArticle({
        _id: article._id,
        title: article.title,
        url: article.url,
        date: article.date
      })
        .then(res => this.loadSavedArticles())
        .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    var topic = this.state.topic;
    var startY = this.state.startYear;
    var endY = this.state.endYear;

    var qu = this.queryURL + "&q=" + topic;
    qu += "&begin_date=" + startY;
    qu += "&end_date=" + endY;
 
    var that = this;
    axios.get(qu)
        .then(function (response) {
          var docs = response.data.response.docs;
          console.log(docs)
          var ar = [];
          for (var i=0;i<docs.length;i++) {
            var doc = docs[i];
            var title = doc.headline.main;
            var articleUrl = doc.web_url;
            var articleDate = doc.pub_date;
            ar.push({ _id: doc._id,
                      title: title, 
                      url: articleUrl, 
                      date: articleDate})
            console.log(ar);
          }
          that.setState({
            articles: ar
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  render() {
    this.loadSavedArticles();
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Search for Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                id="start-year"
                type="date"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                id="end-year"
                type="date"
                placeholder="End Year (required)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Search for Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-4 sm-4">
            <Jumbotron>
              <h1>NYT Search Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-4 sm-4">
            <Jumbotron>
              <h1>NYT Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <br/>
                    Pub date: {article.date}
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
