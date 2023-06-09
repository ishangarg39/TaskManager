import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Authentication/FirebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ShowComment from './ShowComment';

export default function TaskList() {
    const [data, setData] = useState(null);
    const [del, setDel] = useState(false);
    const [assigningTaskId, setAssigningTaskId] = useState(null);
    const [name, setName] = useState(null);
    const [comments, setComments] = useState(null);
    const [ch, setCh] = useState(null);
    const [displayName, setDisplayName] = useState(null);

const getData = async () => {
    console.log("FDS" + displayName);
    const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    console.log("user 2 " + querySnapshot.data);
    const tempData = querySnapshot.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setData(tempData);
};

useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
        //  const user = auth.currentUser;
    console.log(user+"user  u")
    if (user) {
        // user.providerData.forEach((profile) => {
        //     console.log("Sign-in provider: " + profile.providerId);
        //     console.log("  Provider-specific UID: " + profile.uid);
        //     console.log("  Name: " + profile.displayName);
        //     console.log("  Email: " + profile.email);
        //     console.log("  Photo URL: " + profile.photoURL);
        //   });
        setDisplayName(user.displayName);
        console.log(user.displayName + "  us1");
        console.log(typeof user.displayName);
    } else {
        console.log(user + " dfsfs");
    }});
}, []);

useEffect(() => {
    console.log(displayName+" u3")
    if (displayName) {
        ShowAll();
        getData();
    }
}, [displayName]);

    const handleUpdate = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Status: true });

            console.log('Task updated successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await deleteDoc(docs);
            setDel(true)
            setData((prevData) => prevData.filter((task) => task.id !== taskId));
            console.log('Task Deleted successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const ShowCompleted = async () => {
        console.log("completed task")
        const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName), where("Status", "==", true));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }

    const ShowUnCompleted = async () => {
        console.log("uncompleted task"+displayName)
        const q = query(collection(db, 'Task'),  where("Assign", "array-contains", displayName),where("Status", "==", false));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }
    const ShowAll = async () => {
        console.log("all task")
        const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }

    // ...

    const handleAssign = (taskId) => {
        setAssigningTaskId(taskId);
        console.log(assigningTaskId);
    };

    const handleCancelAssign = () => {
        setAssigningTaskId(null);
        setCh(null)
    };

    const addAssign = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Assign: arrayUnion(name) });
            setName("");
            console.log('User added successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const addComment = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Comments: arrayUnion(comments) });
            setComments("");
            console.log('Comment added successfully!');
        } catch (error) {
            console.error('Error Commenting task:', error);
        }
    };
    return (
        <div>
            <h2>Task List</h2>
            <button onClick={ShowCompleted}>Completed task</button>
            <button onClick={ShowUnCompleted}>Uncompleted task</button>
            <button onClick={ShowAll}>All tasks</button>

            {data &&
                data?.map((task) => (
                    <div key={task.id}>
                        <div className='container-fluid rounded my-3' style={{ color: 'white', backgroundColor: '#212529', width: '20vw', padding: '10px', border: '10px' }}>
                            <h3>Task: {task.Title}</h3>
                            <p>
                                Description: {task.Description} || Due Date: {task.Due_Date}
                            </p>
                            <button type='button' onClick={() => handleDelete(task.id)}>
                                Delete
                            </button>
                            {!task.Status && (
                                <button type='button' onClick={() => handleUpdate(task.id)}>
                                    Completed
                                </button>
                            )}
                            {!assigningTaskId && (
                                <button type='button' onClick={() => handleAssign(task.id)}>
                                    Assign
                                </button>
                            )}
                            {assigningTaskId === task.id && ch===null && (
                                <div>
                                    <div className='container my-1'> <label >User:   </label>
                                        <input
                                            type="text"
                                            value={name}
                                            placeholder='Add User'
                                            onChange={(e) => setName(e.target.value)}
                                        /></div>
                                    <button type="button" onClick={() => addAssign(task.id)}>
                                        Add
                                    </button>
                                    <button type="button" onClick={handleCancelAssign}>
                                        Done
                                    </button>
                                    {/* Add the UserList component here */}
                                </div>
                            )}
                             {!assigningTaskId && (
                                <button type='button' onClick={() =>{ handleAssign(task.id);setCh("")}}>
                                   Add Comment
                                </button>
                            )}
                            {assigningTaskId === task.id &&ch!==null && (
                                <div>
                                    <ShowComment id={task.id}/>
                                    <div className='container my-1'> <label >Comment: </label>
                                        <input
                                            type="text"
                                            value={comments}
                                            placeholder='Type Comment'
                                            onChange={(e) => setComments(e.target.value)}
                                        /></div>
                                    <button type="button" onClick={() => addComment(task.id)}>
                                        Add
                                    </button>
                                    <button type="button" onClick={handleCancelAssign}>
                                        Done
                                    </button>
                                    {/* Add the UserList component here */}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );

}
