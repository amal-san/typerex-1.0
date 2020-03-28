import React from "react"
import { Link } from "gatsby"
import '../css/index.css'
import Header from '../components/Header'
import Home from '../components/Home'
import PageTransition from 'gatsby-plugin-page-transitions';


const IndexPage = () => (
   
   <PageTransition>
    <>
    <Header />
    <Home />
    
    </>
   </PageTransition>
  
)

export default IndexPage
