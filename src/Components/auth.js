import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';




const client = new ApolloClient({
  uri: 'https://typerex.herokuapp.com/',
});



class Auth {

	constructor(){
		this.authenticated = false;
	}

	async userUpdate(username,wpm) {
		const result = await client 
			.mutate({
				mutation:gql`
				mutation {
				  userUpdate(username:"${username}" wpm:"${wpm}"){
				  	username
				    wpm
					}
				}
				`
			})
			.then(function(result){
				return result;
			})
			.catch(e => console.log(e))

			if(result) {
				this.authenticated = true;
			}
			return result;

	}

	async login(username) {
		const result = await client
		  .mutate({
		  	mutation:gql`
		  	mutation {
				  userAdd(username:"${username}"){
				    username
				    wpm
					}
				}
		  	`
		  })
		  .then(function(result){
		  	return result;
		  })
		  .catch(e => console.log(e))
		  if (result) {
			this.authenticated = true;
		  }
   		  return result;
	}

	async userInfo(username) {
		const result = await client
		  .query({
		    query: gql`
		     {
			  userInfo(username:"${username}"){
			    username
			    wpm
			  }
			 }
		    `
		  })
		  .then(function(result) {
		  	return result
		  });

		if (result) {
			this.authenticated = true;
		}
		return result;
	}


	logout(cb) {
		this.authenticated = false;
		cb()
	}




	isAuthenticated() {
		return this.authenticated;
	}


}


const USERINFO = gql`
{
  userInfo(username:"amalsan"){
    username
    wpm
  }
}`


// const USERUPDATE;


// const USERDELETE; 


// const USERADD;


// const USERLIST;


export default new Auth();