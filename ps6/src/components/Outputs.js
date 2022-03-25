import './Outputs.css'

const Outputs = (props) =>{

    const {outputList,theWord,setSavedWords,savedWords} = props;

    const addToSavedWords = (word) =>{
        const prev = savedWords;
        var newWords = prev.append(word);
        console.log("The New Saved words is: " + newWords.join( ' ,'))
        setSavedWords(newWords)
    }


    const unpackOutputList = () => {

        if (Object.keys(outputList).length === 0){
            return (
            <div> 
                <p>(no results)</p>
            </div>)
        }

        for (const [key, value] of Object.entries(outputList)){

            //     wordOutput.innerHTML += ` <h3> Number of Syllables: ${key} <h3/> <ul>`
            for(var i =0; i<value.length; i++){
                if(value[i].numSyllables === key){
                return(
                    <div>
                        <li class="topmargin">  {value[i].word} 
                        <button className="btn btn-success" onClick={addToSavedWords(value[i].word)}>
                             Save </button> </li>`
                    </div>
                    )   
            }
            
            }
            //     wordOutput.innerHTML += '<ul/>'
        }

    }



    return (
        <div>
            <h1>Words that Rhyme with: {theWord} </h1>

           {unpackOutputList()}
        </div>
    )

}

export default Outputs;