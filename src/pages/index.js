import React from "react"
import { Link } from "gatsby"
import '../css/index.css'
import Header from '../components/Header'
import Home from '../components/Home'
import PageTransition from 'gatsby-plugin-page-transitions';
import axios from 'axios'
import cogoToast from 'cogo-toast';


class IndexPage extends React.Component {
	constructor(){
		super()
	}
	componentDidMount() {

		axios.post("http://localhost:8080/infoUser/", { username:window.localStorage.getItem('typerex_username') })
        .then( (res) => {
          console.log(res.data)
          if(res.data !== 'no_user' ) {
          	
          	window.location.href = "http://localhost:8000/start/";
      
         }
         else {

          console.warn('no_user')

          }
        })
        .catch((e) =>{
          console.log(e)
         });

	}
	render(){
		return(

			   <PageTransition>
			    <>
			    <Header />
			    <Home />
			    
			    </>
			   </PageTransition>



			)
	}
}


export default IndexPage
