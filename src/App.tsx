import React, { useEffect, useRef } from 'react';
import './App.css';
import axios from "axios";
import api from './services/api';

function App() {
    const questions = useRef([]);
    const answer = useRef('');

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        try {
            const response = await axios.get(`${api}/question/all`);
            questions.current = response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const submitAnswer = async (id: number, answer: string) => {
        try {
            const response = await axios.get(`${api}/question/get/${id}`);
            const correctAnswer = response.data.correctAnswer;

            if (answer === correctAnswer) {
                alert('Correct Answer');
            } else {
                alert('Incorrect Answer');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const newQuestionSubmit = async (e: any) => {
        e.preventDefault();
        const questionTitle = document.getElementById('questionTitle') as HTMLInputElement;
        const option1 = document.getElementById('option1') as HTMLInputElement;
        const option2 = document.getElementById('option2') as HTMLInputElement;
        const option3 = document.getElementById('option3') as HTMLInputElement;
        const option4 = document.getElementById('option4') as HTMLInputElement;
        const correctAnswer = document.getElementById('correctAnswer') as HTMLInputElement;
        const difficultyLevel = document.getElementById('difficultyLevel') as HTMLInputElement;
        const category = document.getElementById('category') as HTMLInputElement;

        const data = {
            questionTitle: questionTitle.value,
            option1: option1.value,
            option2: option2.value,
            option3: option3.value,
            option4: option4.value,
            correctAnswer: correctAnswer.value,
            difficultyLevel: difficultyLevel.value,
            category: category.value
        };

        try {
            const response = await axios.post(`${api}/question/add`, data);
            getQuestions();
            alert('Question Added Successfully');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const setRecord = (value: string) => {
        answer.current = value;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addQuestionModal">
                    Add Question
                </button>
            </div>
            <h1 className="mb-4">Questions</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className='text-center'>Question</th>
                        <th className='text-center'>Option 1</th>
                        <th className='text-center'>Option 2</th>
                        <th className='text-center'>Option 3</th>
                        <th className='text-center'>Option 4</th>
                        <th className='text-center'>Answer</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.current.map((question: any) => (
                        <tr key={question.id}>
                            <td className='text-center'>{question.questionTitle}</td>
                            <td className='text-center'>{question.option1}</td>
                            <td className='text-center'>{question.option2}</td>
                            <td className='text-center'>{question.option3}</td>
                            <td className='text-center'>{question.option4}</td>

                            <td className='text-center'>
                                <input type="text" className='form-control' name="answer" id={`answer${question.id}`}
                                    onChange={e => setRecord(e.target.value)} />
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-primary'
                                    onClick={() => submitAnswer(question.id, answer.current)}>Submit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="addQuestionModal" tabIndex={-1} aria-labelledby="addQuestionModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title" id="addQuestionModalLabel">Add Question</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <form onSubmit={newQuestionSubmit}>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="questionTitle" className="form-label">
                                        Question
                                    </label>
                                    <input type="text" className="form-control" id="questionTitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="option1" className="form-label">
                                        Option 1
                                    </label>
                                    <input type="text" className="form-control" id="option1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="option2" className="form-label">
                                        Option 2
                                    </label>
                                    <input type="text" className="form-control" id="option2" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="option3" className="form-label">
                                        Option 3
                                    </label>
                                    <input type="text" className="form-control" id="option3" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="option4" className="form-label">
                                        Option 4
                                    </label>
                                    <input type="text" className="form-control" id="option4" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correctAnswer" className="form-label">
                                        Correct Answer
                                    </label>
                                    <input type="text" className="form-control" id="correctAnswer" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="difficultyLevel" className="form-label">
                                        Difficulty Level
                                    </label>
                                    <input type="text" className="form-control" id="difficultyLevel" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Category
                                    </label>
                                    <input type="text" className="form-control" id="category" />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Add Question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;


