import React from "react"
import '../css/index.css'


class Header extends React.Component {


	render() {
		return(
		<nav>
			<div className="nav">
				<div className='user-item'></div>
				<div className="nav-item">
					<a
						href="/typerex"
						style={{ textDecoration: "none", color: "white" }}
					>

						typerex
					</a>
				</div>
				<div className='user-item-main'>
					<div className='user-item-sub'>
						<p style={{marginBottom:'0'}}><b id='username'></b></p>
						<p id='user-wpm' style={{margin:'0'}}></p>
					</div>
				 </div>
			</div>
		</nav>)
	}
}

export default Header
