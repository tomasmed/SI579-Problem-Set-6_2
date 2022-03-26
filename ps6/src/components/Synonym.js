import './Synonym.css'

const Synonym = (props) =>{

    const {word,setSavedWords,index} = props;
   
    const savedWordsHandler = () => {
        
        setSavedWords( (previous) =>{
            console.log(previous)
            return [...previous, word];
        });

        //setSavedWords([...savedWords,word]);

    }

    return(
       <li key={index}> 
            {word} <button className="btn btn-success" onClick={savedWordsHandler}> Save </button> 
       </li>
    )
}

export default Synonym