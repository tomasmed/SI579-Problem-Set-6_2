import './InputGroup.css'

 function datamuseRequest(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // This invokes the callback that updates the page.
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

function getDatamuseRhymeUrl(rel_rhy) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': rel_rhy})).toString()}`;
}
function getDatamuseSimilarToUrl(ml) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': ml})).toString()}`;
}

function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}


const InputGroup= (props) =>{

    const {setOutputList,theWord,setTheWord, setRhymeMode, setDisplayWord,setLoading} = props;

    const keyDownHandler = (e) =>{
        if (e.keyCode == 13){
            getRhymes()
        }
    }

    const getRhymes = () =>{
        setOutputList([])
        setLoading(true)
        setDisplayWord(theWord)
        var rhymeUrl = getDatamuseRhymeUrl(theWord);
        setRhymeMode(1);
        datamuseRequest(rhymeUrl, (resp)=>{
            setOutputList(groupBy(resp,'numSyllables'))
            setLoading(false)

        })

    }

    const getSynonyms = () =>{
        setOutputList([])
        setLoading(true)
        setDisplayWord(theWord)
        var similarToUrl = getDatamuseSimilarToUrl(theWord);
        setRhymeMode(0);
        datamuseRequest(similarToUrl, (resp)=>{
            setOutputList(resp)
            setLoading(false)
        })

    }

    return(
        <div className="input-group col">
             <input
                        placeholder="Enter a word"
                        type='text'
                        value={theWord}
                        onChange={(e) => setTheWord(e.target.value)}
                        onKeyDown={(e) => keyDownHandler(e)}
                    />
            <button id="show_rhymes" type="button" onClick = {getRhymes} className="bluebtn">Show rhyming words</button>
            <button id="show_synonyms" type="button" onClick = {getSynonyms} className="graybtn">Show synonyms</button>
        </div>
    )

}
export default InputGroup;