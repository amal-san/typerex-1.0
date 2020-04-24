import React from "react"
import '../css/index.css'
import Header from '../components/Header'
import Myloader from '../components/Myloader'
import { Helmet } from "react-helmet"
import { FiLoader } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import axios from 'axios';
import PageTransition from 'gatsby-plugin-page-transitions';





class SecondPage extends React.Component {

    constructor(){
        super()
        this.state={
            text:[],
            words:[],
            isDataSet:true,
            loading:false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleReload = this.handleReload.bind(this);
   }
   fetchPara()
   {
        // URL
        const url = "https://typeracingapi.rishikc.com/.netlify/functions/server/text/";

        // Request
        this.setState({
            loading:true,
        })
        fetch(url).then(res => {
            if(res.status === 200) {
                return res.json()
            }
            else return null;
        }).then(data => {
            console.log(data)
            if(data!==null)  {
                this.setState({
                    text: data.text,
                    words: data.text.split(' '),
                    isDataSet: true,
                    loading:false,
                });
            } else {
                this.setState({
                    isDataSet: false
                });
            }
        });



    }

    componentDidUpdate(prevProps, prevState) {
    if (prevState.isDataSet !== this.state.isDataSet)  {
      this.fetchPara();
       }
    }
    
    handleReload()  {
        this.fetchPara();
    }

   handleClick() {

        let value = document.getElementById('paraEnter').value;

        let last = this.state.text.length;

        for(var j=0;j< last;j++){

        function colorText(bgcolor,tcolor,index){ 
             document.getElementById(index).style.background = bgcolor; 
             document.getElementById(index).style.color = tcolor
            }
        if(value[j] === this.state.text[j]) {
            colorText('springgreen','black', j)
        }
        else {
            colorText('#017188','white', j) 
            break;
          }               
        }

   }
   componentDidMount() {
    this.fetchPara()

   }

    render(){

        localStorage.getItem("typerex_username") ? console.log('authenticated'): window.location.href = "http://localhost:8000/";

        if(this.state.isDataSet){
            var rows = [];
            for (var i = 0; i < this.state.text.length; i++) {
                rows.push(<span id={i} key={i}>{this.state.text[i]}</span>);
            }
        }



        return (
              <PageTransition>
                <>
                <title>Typerex </title>
                <Header />
                 <div className='test-container'> 
                  <div></div>
                    <div className='test-card'>
                        <div className='para-card'>
                              {this.state.loading ? <div style={{display:'flex',justifyContent:'center'}}> <Myloader /> </div> : rows }
                             <div className='reloadbt'><span className='reload' onClick={this.handleReload}> < IoMdRefresh /> </span></div>
                        </div>
                    <div className='test-enter' style={{display:'flex'}}>
                      <a id='startbt'> Start </a>
                      <input id='paraEnter' onChange={this.handleClick} type='text' placeholder='Start typing......'></input>
                      </div>
                    </div>
                    <div className='test-below'></div>
                 </div>                
                 </>
              </PageTransition> 
            )
    }  


    
  
}

export default SecondPage
