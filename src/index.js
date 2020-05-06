import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import ApolloClient from 'apollo-boost';




const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});
client
  .query({
    query: gql`
     {
	  userInfo(username:"amalsan"){
	    username
	    wpm
	  }
	 }
    `
  })
  .then(result => console.log(result));


const App = () => (
  <ApolloProvider client={client}>
    <Main/>
  </ApolloProvider>
);



ReactDOM.render(
  <App/>, 
  document.getElementById("root")
);