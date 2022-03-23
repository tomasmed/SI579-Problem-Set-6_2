import './InputGroup.css'

const InputGroup= (props) =>{

    const {setsavedWords} = props;


    const getRhymes = () =>{
        console.log("getRHymes");
    }


    const getSynonyms = () =>{
        setsavedWords( ['vy','das'])
        console.log("getSynonyms")
    }

    return(
        <div className="input-group col">
            <input className="form-control" type="text" placeholder="Enter a word" id="word_input"/>
            <button id="show_rhymes" type="button" onClick = {getRhymes} className="btn btn-primary">Show rhyming words</button>
            <button id="show_synonyms" type="button" onClick = {getSynonyms} className="btn btn-secondary">Show synonyms</button>
        </div>
    )

}
export default InputGroup;