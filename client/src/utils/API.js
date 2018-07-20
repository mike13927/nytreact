import axios from "axios";

export default {
  
  getArticles: function() {
    return axios.get("/api/articles");
  },
  
  getArticle: function(id) {
    console.log("calling api get book")
    return axios.get("/api/articles/" + id);
  },
  
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  
  saveArticle: function(bookData) {
    return axios.post("/api/articles", bookData);
  }
};
