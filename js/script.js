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
                if (alphabet[j] === wordToEncrypt.charAt(i)) {
                    if(keyValuesCounter == keyValuesArray.length){
                        keyValuesCounter = 0;
                    }
                    encryptedWord += getLetter((+j + +keyValuesArray[keyValuesCounter]) % alphabet.length);

                    keyValuesCounter++;

                    break;
                }
            }
        }
        $('#encrypted-word').html("<b>Encrypted word: </b>" + encryptedWord);
    });
});
function generateAlphabeth() {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
}

function getLetter(number){
    return alphabet[number];
}

function getNumberOfKeys() {
    numberOfKeys = $('#number-of-keys').val();
    if (numberOfKeys > 6) {
        numberOfKeys = 6;
    }
    showKeyValueInput();
}

function showKeyValueInput() {
    let code = "";
    for (let i = 0; i < numberOfKeys; i++) {
        code += '<label for="C' + i + '" class="me-3">C' + i + ': </label>';
        code += '<input type="number" class="mb-3" name="C' + i + '" id="C' + i + '" min="1" max="25" required> <br>';
    }
    $('keyValues').html(code);
}