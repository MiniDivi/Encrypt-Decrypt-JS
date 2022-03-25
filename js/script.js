const alphabet = generateAlphabeth();
let numberOfKeys;

$(document).ready(function () {
    $("#encrypt-form").submit(function (e) {
        e.preventDefault();

        let wordToEncrypt = $('#word-to-encrypt').val();
        //*il metodo wordToEncrypt.length non funzionava quindi ho dovuto procedere con la seguente soluzione
        let wordToEncryptLenght = [...wordToEncrypt].reduce(a => a + 1, 0);
        let encryptedWord = "";

        const keyValuesArray = Array();

        for (let i = 0; i < numberOfKeys; i++) {
            keyValuesArray.push($("#C" + i).val());
        }

        var keyValuesCounter = 0;

        for (let i = 0; i < wordToEncryptLenght; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                if (wordToEncrypt.charAt(i) !== ' ') {
                    if (alphabet[j] === wordToEncrypt.charAt(i)) {
                        if (keyValuesCounter == keyValuesArray.length) {
                            keyValuesCounter = 0;
                        }
                        encryptedWord += getLetter((+j + +keyValuesArray[keyValuesCounter]) % alphabet.length);
                        keyValuesCounter++;

                        break;
                    }
                } else {
                    encryptedWord += " ";
                }
            }
        }
        $('#encrypted-word').html("<b>Encrypted word: </b>" + encryptedWord);
    });

    $("#decrypt-form").submit(function (e) {
        e.preventDefault();

        let wordToDecrypt = $('#word-to-decrypt').val();
        //*il metodo wordToDecrypt.length non funzionava quindi ho dovuto procedere con la seguente soluzione
        let wordToDecryptLenght = [...wordToDecrypt].reduce(a => a + 1, 0);
        let decryptedWord = "";

        const keyValuesArrayDecrypt = Array();


        for (let i = 0; i < numberOfKeys; i++) {
            keyValuesArrayDecrypt.push($("#D" + i).val());
        }

        var keyValuesCounter = 0;

        for (let i = 0; i < wordToDecryptLenght; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                if(wordToDecrypt.charAt(i) !== ' '){

                    if (alphabet[j] === wordToDecrypt.charAt(i)) {
                        if (keyValuesCounter == keyValuesArrayDecrypt.length) {
                            keyValuesCounter = 0;
                        }
                        
                        decryptedWord += (getLetter((alphabet.length + (+j - +keyValuesArrayDecrypt[keyValuesCounter])) % alphabet.length));
                        keyValuesCounter++;
                        
                        break;
                    }
                }else {
                    decryptedWord += " ";
                }
            }
        }
        $('#decrypted-word').html("<b>Decrypted word: </b>" + decryptedWord);
    });


});
function generateAlphabeth() {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
}

function getLetter(number) {
    return alphabet[number];
}

function getNumberOfKeysEncrypt() {
    numberOfKeys = $('#number-of-keys-encrypt').val();
    if (numberOfKeys > 6) {
        numberOfKeys = 6;
    }
    showKeyValueInput(true);
}
function getNumberOfKeysDecrypt() {
    numberOfKeys = $('#number-of-keys-decrypt').val();
    if (numberOfKeys > 6) {
        numberOfKeys = 6;
    }
    showKeyValueInput(false);
}

function showKeyValueInput(EncryptOrDecypt) { //*Encrypt = true; Decrypt = false;
    let code = "";
    if (EncryptOrDecypt) {
        for (let i = 0; i < numberOfKeys; i++) {
            code += '<label for="C' + i + '" class="me-3 ms-2">C' + i + ': </label>';
            code += '<input type="number" class="mb-3" name="C' + i + '" id="C' + i + '" min="1" max="25" required> ';
        }
        $('keyValuesEncrypt').html(code);
    } else {
        for (let i = 0; i < numberOfKeys; i++) {
            code += '<label for="D' + i + '" class="me-3 ms-2">C' + i + ': </label>';
            code += '<input type="number" class="mb-3" name="D' + i + '" id="D' + i + '" min="1" max="25" required> ';
        }
        $('keyValuesDecrypt').html(code);

    }
}