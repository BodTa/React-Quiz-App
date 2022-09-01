import React, { useState } from "react";
import { htmlDecode } from "../helperFunctions";

export default function Quiz(props) {
	const answerButtons = props.answers.map(answer => {
		const uncompletedStyle = {
			backgroundColor: answer.isSelected ? "#7FBCD2" : "transparent",
		};
		const completedStyle = () => {
			if (props.isCompleted) {
				if (answer.isSelected && answer.answer != props.correctAnswer) {
					return { backgroundColor: "#E94560" };
				} else if (answer.answer == props.correctAnswer) {
					return {
						backgroundColor: "#59CE8F",
					};
				}
			} else {
				return {
					backgroundColor: "taransparent",
				};
			}
		};
		return (
			<button
				id={answer.answerId}
				className="answer-btn"
				onClick={props.handleClick}
				style={props.isCompleted ? completedStyle() : uncompletedStyle}
			>
				{htmlDecode(answer.answer)}
			</button>
		);
	});
	return (
		<div className="quiz">
			<div className="question">{htmlDecode(props.question)}</div>
			<div className="answers">{answerButtons}</div>
			<hr />
		</div>
	);
}
