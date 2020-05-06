import React from 'react';
import auth from '../Components/auth';
import { IoMdRefresh } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";





export function Start (props) {

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

