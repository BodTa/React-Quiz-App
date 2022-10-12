import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz.js";
import IntroPage from "./Components/IntroPage.js";
import { nanoid } from "nanoid";
import { shuffle } from "./helperFunctions.js";
import Confetti from "react-confetti";

export default function App() {
	const [quizData, setQuizData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [count, setCount] = useState(0);
	function getQuestions() {
		setIsCompleted(false);
		fetch("https://opentdb.com/api.php?amount=5&type=multiple")
			.then(res => res.json())
			.then(data =>
				setQuizData(
					data.results.map(question => {
						const questionId = nanoid();
						const allAnswers = question.incorrect_answers.concat(
							question.correct_answer
						);
						const newAnswers = allAnswers.map(answer => ({
							answer: answer,
							answerId: nanoid(),
							isSelected: false,
						}));
						return {
							correctAnswer: question.correct_answer,
							question: question.question,
							answers: shuffle(newAnswers),
							questionId: questionId,
						};
					})
				)
			);
		setIsLoaded(true);
	}
	function selectAnswer(quiz, event) {
		const quizData = quiz.answers.map(answer => ({
			...answer,
			isSelected:
				answer.answerId === event.target.id ? !answer.isSelected : false,
		}));
		setQuizData(oldQuizData => {
			const newQuizData = oldQuizData.map(question => {
				return quiz.questionId === question.questionId
					? { ...quiz, answers: quizData }
					: question;
			});
			return newQuizData;
		});
	}
	function question() {
		return quizData.map(quiz => {
			return (
				<Quiz
					key={quiz.questionId}
					question={quiz.question}
					answers={quiz.answers}
					correctAnswer={quiz.correctAnswer}
					handleClick={event => selectAnswer(quiz, event)}
					isCompleted={isCompleted}
				/>
			);
		});
	}
	function setCompleted() {
		let correctCount = 0;
		quizData.map(question => {
			question.answers.map(answer => {
				if (answer.isSelected && answer.answer === question.correctAnswer) {
					correctCount = correctCount + 1;
				}
			});
		});
		setCount(correctCount);
		setIsCompleted(true);
	}
	console.log(quizData);
	return (
		<div>
			{count === 5 && isCompleted && <Confetti width={1300} height={800} />}
			<div className="quiz-container" id="quiz-container">
				{!isLoaded && <IntroPage handleClick={getQuestions} />}
				{isLoaded && <div className="quizes">{question()}</div>}
				<div className="bottom">
					{isLoaded && !isCompleted && (
						<button onClick={setCompleted} className="submit-btn">
							SUBMIT
						</button>
					)}
					{isCompleted && (
						<button onClick={getQuestions} className="submit-btn">
							RESTART
						</button>
					)}
					{isCompleted && (
						<h3>
							You scored {count}/5 correct answer{count > 1 ? "s" : ""}
						</h3>
					)}
				</div>
			</div>
		</div>
	);
}
