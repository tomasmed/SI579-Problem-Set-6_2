import './RhymeElement.css'

const RhymeElement = (props) => {
const {numSyllables,elts,setSavedWords} = props;

const savedWordsHandler = (e) => {
        
    setSavedWords( (previous) =>{
        console.log(e)
        return [...previous, e];
    });

    //setSavedWords([...savedWords,word]);

}

const unpackelts = () =>{
    var rhymesPerSyllable = [];
    elts.forEach(element => {
        rhymesPerSyllable.push(
            <li key={element.word}>{element.word} <button className="green-button" onClick={()=>savedWordsHandler(element.word)}> Save </button> 
       </li>
        )
    });
    return rhymesPerSyllable;
}

    return (
        <div>
            <h3>Number of Syllables: {numSyllables}</h3>
            <ul>{unpackelts()}</ul>
        </div>
    )
}

export default RhymeElement;
