import React from "react";

export default function IntroPage(props) {
	return (
		<div className="intro-page">
			<h3>Press the button below to start answering :)</h3>
			<button className="get-btn" onClick={props.handleClick}>
				Start
			</button>
		</div>
	);
}
