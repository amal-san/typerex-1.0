import React from 'react';
import auth from '../Components/auth';
import { IoMdRefresh } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";





export function Start (props) {

	const[ data , setData ] = useState(false)

	const[ text ,setText ] = useState([])

	const[ words ,setWord] = useState([])

	const[loading, setLoading ] = useState(true)

	const history = useHistory();


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
            	setWord(data.text.split(''))
            	setText(data.text)
            } else {
                setData(false)
            }
        });

    
  	},[]);
	    return(   
	    	<div className='test-container'> 
                    <div className='test-card'>
                        <div className='para-card'>
                            <div className='reloadbt'>
                            	<span className='reload'> 
                            	< IoMdRefresh /> 
                            	</span>
                            </div>
                        </div>
                        <div className='test-enter' style={{display:'flex'}}>
                         <input disabled id='paraEnter' type='text' placeholder='Start typing......'></input>
                          </div>
                           <div className='activity'>
                              <a id='startbt'> Start </a>
                              <p id='timer'>Time: </p>
                              <p id='wpm'>Wpm: </p>
                           </div>
                        </div>
                      <div className='test-below'>
                    </div>
                </div>
			);
}

