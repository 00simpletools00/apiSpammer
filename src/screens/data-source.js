document.getElementById('file-source-radio').addEventListener('click', () => {
    document.getElementById('mongo-db-wrapper').style.display = 'none';
    document.getElementById('file-loader-row').style.display = 'flex';
});

document.getElementById('db-source-radio').addEventListener('click', () => {
    document.getElementById('file-loader-row').style.display = 'none';
    document.getElementById('mongo-db-wrapper').style.display = 'block';
});