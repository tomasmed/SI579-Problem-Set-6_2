import './Outputs.css'
import Synonym from './Synonym';
import RhymeElement from './RhymeElement';

const Outputs = (props) =>{

    const {outputList,theWord,setSavedWords,rhymeMode} = props;

 
    const unpackOutputList = () => {

        var inner_wordlist = []
        if (Object.keys(outputList).length === 0){
            return (
            <div> 
                <p>(no results)</p>
            </div>)
        }
        
        //return it as JSX
        if (rhymeMode === 1){
            inner_wordlist =[];
            for (const [key, value] of Object.entries(outputList)){

                inner_wordlist.push(<RhymeElement
                    numSyllables = {key}
                    setSavedWords = {setSavedWords}
                    elts = {value}/>)
            }
            return(
                <div>
                    <h1>Words that rhyme with: {theWord} </h1>
                    {inner_wordlist}
                </div>
            )
        }
        
        else{ //Rhymemode === 0
            inner_wordlist =[];
            outputList.forEach((elt,index) =>{
                inner_wordlist.push(
                    <Synonym word= {elt.word}
                        setSavedWords={setSavedWords}
                        index = {index}/>
                )
            })

            return(
                <div>
                <h1>Words that are synonyms to: {theWord} </h1>
                    <ul>{inner_wordlist}</ul>
            </div>
            )
        }
    }


    return (
        <div>
            {unpackOutputList()}
        </div>
    )

}

export default Outputs;