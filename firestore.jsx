import React, { useEffect, useState } from 'react'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from '../Firebase'

const db = getFirestore(app);

export default function FireStore() {
    const [post, setPost] = useState([]);
    const [formData, setFormData] = useState({ first: "", last: "", born: "" });

    useEffect(() => {
        fetchData();
    },[]);

    async function sendData() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: formData.first,
                last: formData.last,
                born: parseInt(formData.born)
            });
            console.log("Document written with ID: ", docRef.id);
            fetchData();
        } catch (e) {
            console.error("Error adding document:", e);
        }
    }

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPost(data);
    }

    async function deleteData(docId) {
        try {
            await deleteDoc(doc(db, "users", docId));
            console.log("Document deleted with ID: ", docId);
            fetchData();
        } catch (e) {
            console.error("Error deleting document:", e);
        }
    }

    async function handleUpdate(docId) {
        const first = window.prompt("Enter new first name:");
        const last = window.prompt("Enter new last name:");
        const born = window.prompt("Enter new birth year:");

        if (first && last && born) {
            try {
                const userRef = doc(db, "users", docId);
                await updateDoc(userRef, {
                    first,
                    last,
                    born: parseInt(born)
                });
                console.log("Document updated with ID: ", docId);
                fetchData();
            } catch (e) {
                console.error("Error updating document:", e);
            }
        } else {
            alert("Update canceled: all fields are required.");
        }
    }

    return (
        <div>
            <h2>FireStore</h2>

            <div>
                <h3>Add New User</h3>
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.first}
                    onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.last}
                    onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year Born"
                    value={formData.born}
                    onChange={(e) => setFormData({ ...formData, born: e.target.value })}
                />
                <button onClick={sendData}>Send Data</button>
            </div>

            <ul>
                {post.map((doc) => (
                    <li key={doc.id}>
                        {doc.first} {doc.last} {doc.born}
                        <button onClick={() => deleteData(doc.id)}>Delete</button>
                        <button onClick={() => handleUpdate(doc.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}