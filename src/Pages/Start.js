import React from 'react';
import auth from '../Components/auth';
import { IoMdRefresh } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TextLoader from '../Components/TextLoader';
import cogoToast from 'cogo-toast';






export function Start (props) {

	const[ data , setData ] = useState(false)

	const[ text ,setText ] = useState([])

	const[ words ,setWord] = useState([])

	const[ loading, setLoading ] = useState(true)





	const[ reload , setReload ] = useState(false)

	function reloadText() {
		document.getElementById('paraEnter').value = ' ';
		setReload(true)
		fetchText()
	}

	function startTimer(e) {

	   document.getElementById('paraEnter').disabled = false;
	   document.getElementById('startbt').style.background = 'green';
	   var start = document.getElementById("startbt");
	   start.className += "disabled";

	    setTimeout(function(){

	        document.getElementById('startbt').style.background = 'orangered';
	        document.getElementById('paraEnter').disabled = true; 
	        var text = document.getElementById('wpm').innerHTML
	        var wpm = text.split(" ")[1]
	        var username = localStorage.getItem("typerex_username")

	        auth.userUpdate(username,wpm)
		      .then(() => {
		      	cogoToast.success(
	              <div>
	                <div><b>Your wpm is { wpm }</b><br></br><i> Click the start button </i></div>
	              </div>,{ hideAfter:5},
	            );
	            localStorage.setItem('wpm',wpm)
	            setTimeout(function() { reloadText() },2000)
		        
		      })
		      .catch(e => {
		        console.log(e)
		    })

	    },6000)
	}

	const history = useHistory();






	function handleChange(e) {

	  let value = document.getElementById("paraEnter").value;
      let last = text.length;
      var wpm = 0;

      for (var j = 0; j < last; j++) {
        function colorText(bgcolor, tcolor, index) {
          document.getElementById(index).style.background = bgcolor;
          document.getElementById(index).style.color = tcolor;
        }

        if (value[j] === text[j]) {
          
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
	

	function fetchText() {

		const url = "https://typeracingapi.rishikc.com/.netlify/functions/server/text/";

        // Request
        setLoading(true);
		       
        fetch(url).then(res => {
            if(res.status === 200) {
                return res.json()
            }
            else return null;
        }).then(data => {
            console.log(data)
            if(data!==null)  {
            	setLoading(false)
            	setData(true)
            	setWord(data.text.split(' '))
            	setText(data.text)
            	console.log(text)
            	console.log(words)
            } else {
                setData(false)
            }
        });
	}





	useEffect((props) => {
  		
  	document.title='Start';
  	const username = localStorage.getItem('typerex_username');
  		console.log(username);
      auth.userInfo(username)
      .then((data) => {
      	console.log(data);
        console.log('logged in')
      })
      .catch(e => {
      	history.push('/')
      })
      fetchText()},[reload]);

        if(data){
            var rows = [];
            for (var i = 0; i < text.length; i++) {
                rows.push(<span id={i} key={i}>{text[i]}</span>);
            }
        }

	    return(   
	    	<div className='test-container'> 
                    <div className='test-card'>
                        <div className='para-card'>
                            { loading ? <div style={{display:'flex',justifyContent:'center'}}> <TextLoader/> </div> : rows }
                            <div className='reloadbt' onClick={reloadText}>
                            	<span className='reload'> 
                            	< IoMdRefresh /> 
                            	</span>
                            </div>
                        </div>
                        <div className='test-enter' style={{display:'flex'}}>
                         <input disabled id='paraEnter' type='text' placeholder='Start typing......' onChange={handleChange}></input>
                          </div>
                           <div className='activity'>
                              <a id='startbt' onClick={startTimer}> Start </a>
                              <p id='timer'>Time: </p>
                              <p id='wpm'>Wpm: </p>
                           </div>
                        </div>
                      <div className='test-below'>
                    </div>
                </div>
			);
}


