let key = '';

function generateKey() {
    key = CryptoJS.lib.WordArray.random(32).toString();
    document.getElementById('key').value = key;
    alert('Key generated! Save it securely.');
}

function downloadKey() {
    if (!key) {
        alert('Generate or enter a key first!');
        return;
    }
    const blob = new Blob([key], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secret.key';
    a.click();
    window.URL.revokeObjectURL(url);
}

function encryptText() {
    const text = document.getElementById('text-input').value;
    if (!key || !text) {
        alert('Please enter a key and text!');
        return;
    }
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    document.getElementById('text-result').textContent = encrypted;
}

function decryptText() {
    const text = document.getElementById('text-input').value;
    if (!key || !text) {
        alert('Please enter a key and text!');
        return;
    }
    try {
        const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        document.getElementById('text-result').textContent = decrypted || 'Decryption failed (wrong key or invalid text)';
    } catch (e) {
        document.getElementById('text-result').textContent = 'Decryption failed';
    }
}

function copyToClipboard() {
    const result = document.getElementById('text-result').textContent;
    if (result) {
        navigator.clipboard.writeText(result);
        alert('Copied to clipboard!');
    }
}

function encryptFiles() {
    const files = document.getElementById('file-input').files;
    if (!key || files.length === 0) {
        alert('Please enter a key and select files!');
        return;
    }
    processFiles(files, 'encrypt');
}

function decryptFiles() {
    const files = document.getElementById('file-input').files;
    if (!key || files.length === 0) {
        alert('Please enter a key and select files!');
        return;
    }
    processFiles(files, 'decrypt');
}

function processFiles(files, operation) {
    const resultDiv = document.getElementById('file-result');
    resultDiv.innerHTML = '';
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            let result;
            if (operation === 'encrypt') {
                result = CryptoJS.AES.encrypt(e.target.result, key).toString();
            } else {
                try {
                    result = CryptoJS.AES.decrypt(e.target.result, key).toString(CryptoJS.enc.Utf8);
                } catch (e) {
                    result = 'Decryption failed';
                }
            }
            
            const blob = new Blob([result], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = operation === 'encrypt' ? `${file.name}.enc` : `${file.name.replace('.enc', '')}_decrypted`;
            a.click();
            window.URL.revokeObjectURL(url);
            
            resultDiv.innerHTML += `<p>${file.name}: ${operation}ed</p>`;
        };
        reader.readAsText(file);
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

document.getElementById('key').addEventListener('input', (e) => key = e.target.value);