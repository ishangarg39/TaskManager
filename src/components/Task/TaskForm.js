import { collection, doc, getCountFromServer, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Authentication/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [counts, setCounts] = useState(0); // Initialize counts state variable
  var userCollectionRef;
  const navigate = useNavigate();

  var displayName;
  const user = auth.currentUser;
  if (user != null) {
    displayName = user.displayName;
    
  }


useEffect(() => {
  console.log(counts);
}, [counts]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (title !== '' && description !== '' && dueDate !== '') {
    const coll = collection(db, 'Task');
    const snapshot = await getCountFromServer(coll);
    console.log(typeof snapshot.data().count);
    const c = snapshot.data().count;
    setCounts(c + 1);
    userCollectionRef = doc(db, 'Task', `Task-${c + 1}`);
    const u = doc(db, 'Quizes', `${c + 1}`);
    var QName = await getDoc(u);
    if (QName.exists()) {
      console.log('Same task number');
    } else {
      await setDoc(userCollectionRef, {
        Title: title,
        Description: description,
        Due_Date: dueDate,
        Status: false,
        Assign: [displayName],
        Comments: []
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      console.log('Data saved:', c + 1);
      //  navigate("/CreateQuiz/Ques", { state: { Q: `Quizes/${QuizName}/Ques` } })
    }
  } else {
    alert('Fill all details');
  }
};


  return (
    <div>
      <h2>Create Task</h2>
      <div className="mb-3">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} type="submit">
        Add Task
      </button>
    </div>
  );
}
