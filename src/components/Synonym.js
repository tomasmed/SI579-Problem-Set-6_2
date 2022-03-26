import './Synonym.css'

const Synonym = (props) =>{

    const {word,setSavedWords,index} = props;
   
    const savedWordsHandler = () => {
        
        setSavedWords( (previous) =>{
            console.log(previous)
            return [...previous, word];
        });

        

    }

    return(
       <li key={index}> 
            {word} <button className="green-button" onClick={savedWordsHandler}> Save </button> 
       </li>
    )
}

export default Synonym