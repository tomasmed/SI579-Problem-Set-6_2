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

    const {setOutputList,theWord,setTheWord, setRhymeMode} = props;

    const getRhymes = () =>{
        console.log(theWord)

        console.log("getRhymes");
        var rhymeUrl = getDatamuseRhymeUrl(theWord);
        console.log(rhymeUrl)

        setRhymeMode(1);
        datamuseRequest(rhymeUrl, (resp)=>{
            setOutputList(groupBy(resp,'numSyllables'))

        })

    }

    const getSynonyms = () =>{
        console.log(theWord)
        var similarToUrl = getDatamuseSimilarToUrl(theWord);
        console.log(similarToUrl);
        
        setRhymeMode(0);
        datamuseRequest(similarToUrl, (resp)=>{
            setOutputList(resp)
        })

    }

    return(
        <div className="input-group col">
             <input
                        placeholder="Enter a word"
                        type='text'
                        value={theWord}
                        onChange={(e) => setTheWord(e.target.value)}
                    />
            <button id="show_rhymes" type="button" onClick = {getRhymes} className="btn btn-primary">Show rhyming words</button>
            <button id="show_synonyms" type="button" onClick = {getSynonyms} className="btn btn-secondary">Show synonyms</button>
        </div>
    )

}
export default InputGroup;