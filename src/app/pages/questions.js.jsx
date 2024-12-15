import { useState, useEffect } from 'react';

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    useEffect(() => {
        fetch('/api/questions')
            .then((response) => response.json())
            .then((data) => setQuestions(data));
    }, []);

    const handleAddQuestion = () => {
        fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newQuestion }),
        })
            .then((response) => response.json())
            .then((question) => setQuestions([...questions, question]));
    };

    return (
        <div>
            <h1>Questions</h1>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>{q.text}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Add a question"
            />
            <button onClick={handleAddQuestion}>Submit</button>
        </div>
    );
};

export default QuestionsPage;