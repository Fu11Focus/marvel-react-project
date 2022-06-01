export default class MarvelServices {
    _publicKey = 'a4f0a73ba1bfe6f633b38623bc1a7964';

    getCharacters = async () => {
        await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=543&apikey=${this._publicKey}`)
            .then(response => response.json())
            .then(data => console.log(data.data.results));
    }
} 
