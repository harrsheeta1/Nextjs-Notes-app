"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import styles from "@/styles/dashboard.module.css";
const SERVER_URL = "http://localhost:5500";

export default function Dashboard() {
  const [noteText, setNoteText] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const addNote = async () => {
    if (!noteText.trim()) return alert("The note is empty");

    const res = await fetch(`${SERVER_URL}/api/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ noteText }),
    });

    const data = await res.json();
    alert(data.message || (res.ok ? "Note is added" : "Note is not added"));
  };

  const deleteNote = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return alert("Cancelled deletion request");

    const res = await fetch(`${SERVER_URL}/api/deletenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ noteText }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Delete successful!");
      setNoteText("");
    } else {
      alert(data.message || "Note is not deleted. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to Notes Dashboard</h1>

      <div className={styles.container}>
        <div className={styles.noteActions}>
          <Button variant="destructive" onClick={deleteNote}>Delete</Button>
        </div>

        <Textarea
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className={styles.textarea}
        />

        <Button className={styles.saveBtn} onClick={addNote}>Save</Button>
      </div>

      <div className={styles.savedNotes} id="notesList">
        {/* You can later render notes here */}
      </div>
    </div>
  );
}
