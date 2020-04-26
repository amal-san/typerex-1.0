import React from "react"
import '../css/index.css'
import Header from '../components/Header'
import Home from '../components/Home'
import PageTransition from 'gatsby-plugin-page-transitions';
import axios from 'axios'
import { navigate } from "@reach/router"



class IndexPage extends React.Component {
	constructor(){
		super()
		this.state ={
			shouldload:false
		}
	}
	componentDidMount() {

		axios.post("https/typerex.herokuapp.com/infoUser/", { username:window.localStorage.getItem('typerex_username') })
        .then( (res) => {
          this.setState({shouldload:false})
          if(res.data !== 'no_user' ) {
          	navigate('/typerex/start/');

      
         }
         else {

          console.warn('no_user')
          this.setState({shouldload:true})


          }
        })
        .catch((e) =>{
          this.setState({shouldload:true})
         });

	}
	render(){

	let index =  
		       <PageTransition>
			    <>
			    <Header />
			    <Home />
			    
			    </>
			   </PageTransition>



		return(
			<>

			  {this.state.shouldload ? index : ''}

			</>
			)
	}
}


export default IndexPage
