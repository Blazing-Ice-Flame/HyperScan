document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let mangaTitle = document.getElementById('mangaTitle').value;
    let description = document.getElementById('description').value;
    let mangaFiles = document.getElementById('mangaFiles').files;

    if (mangaFiles.length > 0) {
        let formData = new FormData();

        formData.append('mangaTitle', mangaTitle);
        formData.append('description', description);
        for (let i = 0; i < mangaFiles.length; i++) {
            formData.append('mangaFiles', mangaFiles[i]);
        }

        // Send the data to the server
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Manga uploaded successfully!');
                displayManga(data.manga);
            } else {
                alert('Upload failed.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

function displayManga(manga) {
    const gallery = document.getElementById('gallery');
    let mangaItem = document.createElement('div');
    mangaItem.classList.add('manga-item');

    let title = document.createElement('h3');
    title.innerText = manga.title;

    let desc = document.createElement('p');
    desc.innerText = manga.description;

    let img = document.createElement('img');
    img.src = `/uploads/${manga.fileName}`;

    mangaItem.appendChild(title);
    mangaItem.appendChild(desc);
    mangaItem.appendChild(img);

    gallery.appendChild(mangaItem);
}