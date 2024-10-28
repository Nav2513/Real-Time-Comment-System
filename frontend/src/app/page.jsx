"use client"
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import io from "socket.io-client";
import axios from "axios";
import { ButtonOne } from "../../src/app/components/atoms/ButtonOne"

const socket = io("http://localhost:3001");

export default function Home() {
    const [username, setUsername] = useState("");
    const [sessionID, setSessionID] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
        socket.on("new-comment", (newComment) => setComments((prev) => [newComment, ...prev]));
        return () => socket.off("new-comment");
    }, []);

    const fetchComments = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/api/comments");
            setComments(Array.isArray(data) ? data : []); // Ensure comments is always an array
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]); // Fallback to an empty array in case of error
        }
    };

    const handleLogin = async () => {
        const { data } = await axios.post("http://localhost:3001/api/login", { username });
        setSessionID(data.sessionID);
    };

    const postComment = async () => {
        if (comment) {
            await axios.post("http://localhost:3001/api/comments", { username, comment });
            setComment("");
        }
    };

    if (!sessionID) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <TextField
                    label="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>Log In</Button>
            </Box>
        );
    }

    return (
        <div>
        
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h4" gutterBottom>Real-Time Comments</Typography>
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    label="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" onClick={postComment}>Post</Button>
            </Box>
            {comments.map(({ id, username, comment, timestamp }) => (
                <Box key={id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                        {username} - {new Date(timestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">{comment}</Typography>
                </Box>
            ))}
        </Box>

        </div>
    );
}

