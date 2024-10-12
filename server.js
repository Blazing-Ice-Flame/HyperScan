const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Set up file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files
app.use(express.json()); // Parse JSON bodies

app.post('/upload', upload.array('mangaFiles'), (req, res) => {
    const mangaTitle = req.body.mangaTitle;
    const description = req.body.description;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded.' });
    }

    const manga = {
        title: mangaTitle,
        description: description,
        fileName: files[0].filename // Just showing the first image as a thumbnail
    };

    res.json({ success: true, manga: manga });
});

// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});