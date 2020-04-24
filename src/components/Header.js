import React from "react"
import '../css/index.css'
import PageTransition from 'gatsby-plugin-page-transitions';


const Header = () => (
<nav>
	<div className="nav">
		<div className="nav-item">
			<a
				href="/typerex"
				style={{ textDecoration: "none", color: "white" }}
			>
				{" "}
				typerex{" "}
			</a>{" "}
		</div>
	</div>
</nav>
)

export default Header
