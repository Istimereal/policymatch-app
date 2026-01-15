function QuestionList({questions, deleteQuestionById, editQuestion}) {
    return (
<div>
    <h1>List of questions</h1>
    <table className="table table-striped">
    <thead>
        <tr>
        <th>Id</th>
        <th>Subject</th>
        <th>Header</th>
        </tr>
    </thead>
    <tbody>
       
            {questions.map((question) =>  (
       //  {crypto.randomUUID()}       
    <tr key={question.id}> d
        <td>{question.id}</td>
        <td>{question.subject}</td>
        <td>{question.header}</td>
      <td>
            <button onClick={() => editQuestion(question)} >Edit</button>
            <button onClick={() => deleteQuestionById(question.id)}>Delete</button>
        </td>
    </tr>
))}
      
    </tbody>
    </table>
</div>
 );
}

export default QuestionList;