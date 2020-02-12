import React from "react"
import '../css/index.css'
import Header from '../components/Header'
import { Helmet } from "react-helmet"






class SecondPage extends React.Component {

    constructor(){
        super()
        this.state={
            text:[],
            words:[],
            isDataSet:true,
        }

        this.handleClick = this.handleClick.bind(this);
   }
   

   fetchPara()
   {
        // URL
        const url = "https://typeracingapi.rishikc.com/";

        // Request
        fetch(url).then(res => {
            if(res.status == 200) {
                return res.json()
            }
            else return null;
        }).then(data => {
            console.log(data)
            if(data!==null)  {
                this.setState({
                    text: data.text,
                    words: data.text.split(' '),
                    isDataSet: true
                });
            } else {
                this.setState({
                    isDataSet: false
                });
            }
        });



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

        if(this.state.isDataSet){
            var rows = [];
            for (var i = 0; i < this.state.text.length; i++) {
                rows.push(<span id={i} key={i}>{this.state.text[i]}</span>);
            }
        }

        return (

                <>
                <title>Typerex </title>
                <Header />
                 <div className='test-container'> 
                    <div className='test-card'>
                        <div className='para-card'>
                            <p>
                            {this.state.isDataSet ? rows : 'Not working... Please refresh'}
                            </p>
                        </div>
                    <div className='test-enter'>
                    <input id='paraEnter' onChange={this.handleClick} type='text' placeholder='Start typing......'></input>
                    </div>
                    </div>
                    <div className='test-below'></div>
                 </div>                
                 </>
            )
    }  


    
  
}

export default SecondPage
