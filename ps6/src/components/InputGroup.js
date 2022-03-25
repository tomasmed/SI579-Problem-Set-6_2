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

    const {setsavedWords,setOutputList,theWord,setTheWord} = props;

    const getRhymes = () =>{
        console.log("getRHymes");
        const rhymeUrl = getDatamuseRhymeUrl(theWord);
        console.log(rhymeUrl)

        datamuseRequest(rhymeUrl, (resp)=>{
            setOutputList(groupBy(resp,'numSyllables'))

        })

    }


    const getSynonyms = () =>{
        setsavedWords([theWord, theWord])
        const similarToUrl = getDatamuseSimilarToUrl(theWord);
        
        datamuseRequest(similarToUrl, (resp)=>{
            setOutputList(resp)
        })

    }

    return(
        <div className="input-group col">
             <input
                        type='text'
                        value={theWord}
                        onChange={(e) => setTheWord(e.target.value)}
                    />
            <input className="form-control" type="text" placeholder="Enter a word" id="word_input"/>
            <button id="show_rhymes" type="button" onClick = {getRhymes} className="btn btn-primary">Show rhyming words</button>
            <button id="show_synonyms" type="button" onClick = {getSynonyms} className="btn btn-secondary">Show synonyms</button>
        </div>
    )

}
export default InputGroup;