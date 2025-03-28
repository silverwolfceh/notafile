
function create_gist(filename, content, access_token) {
    const gistData = {
        description: "Auto creation",
        public: false,  // Set to false to make it a secret gist
        files: {
            [filename] : {
                content: content
            }
        }
    };

    const GIST_API_URL = 'https://api.github.com/gists';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };

    fetch(GIST_API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(gistData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.html_url) {
            alert('Secret Gist created successfully! URL: ' + data.html_url);
        } else {
            alert('Failed to create Secret Gist');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating Secret Gist');
    });
}
function update_file_name(fname) {
    document.getElementById("fileName").value = fname;
}
$(document).ready(function () {
    // File input change handler for Base64 conversion
    $('#fileInput').on('change', function () {
        const file = this.files[0];
        const progressBar = $('#progressBar');
        const output = $('#base64Output');

        if (!file) {
            alert('Please select a file first!');
            return;
        }
        progressBar.css('width', '0%');

        update_file_name(file.name);
        const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        let currentChunk = 0;
        let base64Content = '';

        const reader = new FileReader();

        reader.onload = function (event) {
            const base64Chunk = event.target.result.split(',')[1]; // Extract Base64 content
            base64Content += base64Chunk;
            currentChunk++;

            // Update progress bar
            const percentLoaded = (currentChunk / totalChunks) * 100;
            progressBar.css('width', percentLoaded + '%');

            if (currentChunk < totalChunks) {
                readNextChunk();
            } else {
                output.val(base64Content);
                progressBar.css('width', '100%');
            }
        };

        reader.onerror = function () {
            alert('Error reading file. Please try again.');
        };

        function readNextChunk() {
            const start = currentChunk * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const blob = file.slice(start, end);
            reader.readAsDataURL(blob);
        }

        base64Content = ''; // Reset content before reading
        readNextChunk(); // Start reading
    });

    // Download button click handler
    $('#downloadButton').on('click', function () {
        const base64String = $('#base64Output').val();
        const fileName = $('#fileName').val();

        if (!base64String) {
            alert('Please convert a file to Base64 first!');
            return;
        }

        if (!fileName) {
            alert('Please provide a file name!');
            return;
        }

        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    });

    // Upload button click handler
    $('#uploadButton').on('click', function () {
        const base64String = $('#base64Output').val();
        const fileName = $('#fileName').val();
        if (!base64String) {
            alert('Please convert a file to Base64 first!');
            return;
        }

        if (!fileName) {
            alert('Please provide a file name!');
            return;
        }
        const access_token = new URLSearchParams(window.location.search).get("access_token");
        if (access_token) {
            
            create_gist(fileName, base64String, access_token);
        } else {
            document.location.href = "https://notafile.tongvuu.workers.dev";
        }
        
    });
});
