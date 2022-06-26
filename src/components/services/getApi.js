export default class MarvelServices {
    _publicKey = 'a4f0a73ba1bfe6f633b38623bc1a7964';
    _urlAPI = "https://gateway.marvel.com:443/v1/public/";
    _baseOffset = 278;

    getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._urlAPI}characters?limit=9&offset=${offset}&apikey=${this._publicKey}`);
        return res.data.results.map(item => this._transformChar(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._urlAPI}characters/${id}?apikey=${this._publicKey}`); 
        return this._transformChar(res.data.results[0]); 
    }

    _transformChar = (res) => {
        const char = res;
        let description = "";

        if (char.description.length > 0 && char.description.length < 240) {
            description = char.description;
        } else if (char.description === "") {
            description = "This character don`t have description. Sorry :(";
        } else {
            description = char.description.slice(237) + "...";
        }

        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wikipage: char.urls[1].url,
            comics: char.comics.items
        }
    }
} 
