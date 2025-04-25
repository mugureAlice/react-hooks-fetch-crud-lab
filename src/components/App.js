import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };


  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const handleUpdateQuestion = (id, newCorrectIndex) => {
    setQuestions(questions.map(question => 
      question.id === id 
        ? { ...question, correctIndex: newCorrectIndex }
        : question
    ));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
  <QuestionForm onAddQuestion={handleAddQuestion} />
) : (
  <QuestionList
  questions={questions}
  onDeleteQuestion={handleDeleteQuestion}
  onUpdateQuestion={handleUpdateQuestion}
/>

)}
    </main>
  );
}

export default App;