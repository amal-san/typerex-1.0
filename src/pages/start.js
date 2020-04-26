import React from "react"
import '../css/index.css'
import Header from '../components/Header'
import Myloader from '../components/Myloader'
import { Helmet } from "react-helmet"
import { FiLoader } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import axios from 'axios';
import PageTransition from 'gatsby-plugin-page-transitions';
import cogoToast from 'cogo-toast';
import { navigate } from "@reach/router"





class SecondPage extends React.Component {

    constructor(){
        super()
        this.state={
            text:[],
            words:[],
            isDataSet:true,
            loading:false,
            username:'',
            wpm:'',
        }
        this.startTimer = this.startTimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        document.getElementById('paraEnter').value= "";
        this.fetchPara();
    }
    startTimer() {
              
     document.getElementById('paraEnter').disabled = false;
     document.getElementById('startbt').style.background = 'green';
     var start = document.getElementById("startbt");
     start.className += "disabled";
     var self = this;


     


     setTimeout(function(){

        document.getElementById('startbt').style.background = 'orangered';
        document.getElementById('paraEnter').disabled = true; 
        var text = document.getElementById('wpm').innerHTML
        var wpm = text.split(" ")[1]
        console.log(wpm)
        console.log(this.window)
        
        var input = window.localStorage.getItem("typerex_username")
        axios.post("https://typerex.herokuapp.com/updateUser/", { input,wpm })
        .then( (res) => {
          console.log(res.data)
          if(res.data === 'user_updated' ) {
           cogoToast.success(
              <div>
                <div><b>Your wpm is { wpm }</b><br></br><i> Click the start button </i></div>
              </div>,{ hideAfter:6},
            );
           self.handleReload();
           document.getElementById('wpm').innerHTML = 'Wpm: 0';
           document.getElementById('user-wpm').innerHTML = 'Last wpm : ' + wpm;

           var element = document.getElementById("startbt");
           element.classList.remove("disabled")

         }
         else {

          console.warn('error in database')

         }
        })
        .catch((e) =>{
          console.log(e)
          });
        console.log(input)  
        axios.post("https://typerex.herokuapp.com/infoUser/", { username:input })
        .then( (res) => {
          if(res.data !== 'no_user' ) {
            document.getElementById('username').innerHTML = res.data.username;
            document.getElementById('user-wpm').innerHTML = 'Last wpm : ' + res.data.wpm;
            window.localStorage.setItem('wpm',res.data.wpm)
            console.log(res.data)
      
         }
         else {

          console.warn('error in database')

         }
        })
        .catch((e) =>{
          console.log(e)
          });
      }, 6000);


    }

   handleChange() {


      let value = document.getElementById("paraEnter").value;

      let last = this.state.text.length;

      var wpm = 0;

      for (var j = 0; j < last; j++) {
        function colorText(bgcolor, tcolor, index) {
          document.getElementById(index).style.background = bgcolor;
          document.getElementById(index).style.color = tcolor;
        }

        if (value[j] === this.state.text[j]) {
          
          if(value[j] === " "){
            wpm++;
          }
          colorText("springgreen", "black", j);
         

        } else {
          colorText("#017188", "white", j);
          break;

        }
      }
      document.getElementById('wpm').innerHTML = 'Wpm: ' + wpm;

   }

   componentDidMount() {
    this.fetchPara()
    console.log(window.localStorage.getItem('typerex_username'))
    axios.post("https://typerex.herokuapp.com/infoUser/",{username: window.localStorage.getItem('typerex_username')})
        .then( (res) => {
          if(res.data !== 'no_user' ) {
            document.getElementById('username').innerHTML = res.data.username;
            document.getElementById('user-wpm').innerHTML = 'Last wpm : ' + res.data.wpm;
            document.getElementById('wpm').innerHTML = 'Wpm: 0' ;
            window.localStorage.setItem('wpm',res.data.wpm)
      
         }
         else {
            console.warn('error in database') 
            navigate('/typerex/')

          }
        })
        .catch((e) =>{
          console.log(e)
          navigate('/typerex/')
          });

   }

    render(){

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
                    <div className='test-card'>
                        <div className='para-card'>
                              {this.state.loading ? <div style={{display:'flex',justifyContent:'center'}}> <Myloader /> </div> : rows }
                             <div className='reloadbt'><span className='reload' onClick={this.handleReload}> < IoMdRefresh /> </span></div>
                              <div></div>
                        </div>
                    <div className='test-enter' style={{display:'flex'}}>
                      <input disabled id='paraEnter' onChange={this.handleChange} type='text' placeholder='Start typing......'></input>
                      </div>
                      <div className='activity'>
                      <a id='startbt' onClick={this.startTimer}> Start </a>
                      <p id='timer'>Time: </p>
                      <p id='wpm'>Wpm: </p>
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
