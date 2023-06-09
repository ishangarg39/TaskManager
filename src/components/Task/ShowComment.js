import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Authentication/FirebaseConfig';

export default function ShowComment(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const q = doc(db, 'Task', props.id);
      console.log("ASdffew f" + props.id);
      const docSnapshot = await getDoc(q);

      if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
        setData(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    if (data === null) {
      console.log(data + "fsa");
      getData();
      console.log(data + "fsa2");
    }
  }, []);

  return (
    <div>
      <h4>Previous Comments:- {props.id}</h4>
      {data &&
        data.Comments?.map((comment, i) => (
          <div key={i}>
            <div  >
              <p>Comment {i+1}:- {comment}</p>
              <p>{/* Description: {task.Description} || Due Date: {task.Due_Date} */}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
