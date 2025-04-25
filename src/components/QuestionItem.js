import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

 

const handleDeleteClick = () => {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  }).then(() => {
    onDeleteQuestion(id); 
  });
};

const handleCorrectIndexChange = (event) => {
  const newCorrectIndex = parseInt(event.target.value);
  

  onUpdateQuestion(id, newCorrectIndex);

 
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: newCorrectIndex }),
  })
    .then(response => response.json())
    .then(updatedQuestion => {
    
      if (updatedQuestion.correctIndex !== newCorrectIndex) {
        onUpdateQuestion(id, updatedQuestion.correctIndex);
      }
    });
};
  return (
       <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
  value={correctIndex}
  onChange={handleCorrectIndexChange}
>
  {options}
</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
