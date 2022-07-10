import useHttp from '../../hooks/http.hook';

const useMarvelServices = () => {
    const {loading, error, clearError, request} = useHttp();
    const _publicKey = 'a4f0a73ba1bfe6f633b38623bc1a7964';
    const _urlAPI = "https://gateway.marvel.com:443/v1/public/";
    const _baseOffset = 278;

    const getAllComics = async (offset) => {
        const res = await request(`${_urlAPI}/comics?format=comic&formatType=comic&limit=8&offset=${offset}&apikey=${_publicKey}`);
        return res.data.results.map(item => _transformComic(item));
    }

    const _transformComic = (comic) => {
        let description = "";

        if (comic.description === "" || comic.description === null) {
            description = "This comic don`t have description. Sorry :(";
        } else if (comic.description.length > 0 && comic.description.length < 240) {
            description = comic.description;
        } else {
            description = comic.description.slice(237) + "...";
        }

        return {
            id: comic.id,
            title: comic.title,
            description: description,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            price: comic.prices[0].price,
            pageCount: comic.pageCount,
            language: comic.textObjects.language,
        }        
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_urlAPI}characters?limit=9&offset=${offset}&apikey=${_publicKey}`);
        return res.data.results.map(item => _transformChar(item));
    }

    const getCharacter = async (id) => {
        const res = await request(`${_urlAPI}characters/${id}?apikey=${_publicKey}`);
        return _transformChar(res.data.results[0]); 
    }

    const _transformChar = (res) => {
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

    return {error, loading, clearError, getAllCharacters, getCharacter, getAllComics};
} 

export default useMarvelServices;