import { collection, doc, getCountFromServer, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../Authentication/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    var userCollectionRef;
    const navigate = useNavigate();
const [count ,setCount]=useState(1);
    
var displayName;
const user = auth.currentUser;
if (user != null) {
    displayName = user.displayName;
    console.log(displayName)
}
        const handleSubmit = async (e) => {
            const coll = collection(db, "Task");
            const snapshot = await getCountFromServer(coll);
            setCount (snapshot.data().count+1);
            console.log(count)
            e.preventDefault();
            if ((title!=="" && description!=="" & dueDate!=="")) {
                userCollectionRef = doc(db, "Task", `Task-${count}`);
                console.log(`${count}`);
                const u = doc(db, "Quizes", `${count}`)
                var QName = await getDoc(u);
                if (QName.exists()) { console.log("Same task number") }
                else {
                    await setDoc(userCollectionRef, {
                        Title: title, Description: description, Due_Date: dueDate,Status:false,
                        Assign:[displayName],Comments:[]
                    });
                    setCount ( count + 1)
                    setTitle('');
                    setDescription('');
                    setDueDate('');
                    console.log("data saved" + count);
                    //  navigate("/CreateQuiz/Ques", { state: { Q: `Quizes/${QuizName}/Ques` } })

                }
            }
            else {
                alert("Fill all Details")
            }
        }


        // Reset the form

 

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
            <button onClick={handleSubmit} type="submit">Add Task</button>


        </div>
    );
}
