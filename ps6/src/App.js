import logo from './logo.svg';
import './App.css';
import WordList from './components/WordList';
import InputGroup from './components/InputGroup';
import {useState} from "react"
import Outputs from './components/Outputs';

function App() {

const testwords = ['a', 'b']
const [savedWords , setSavedWords] = useState([])
const [outputList, setOutputList] = useState('')
const [theWord, setTheWord] = useState('')
const [rhymeMode, setRhymeMode] = useState('')

  return (
      <main className="container">
          <h1 className="row">Rhyme Finder (579 Problem Set 6)</h1>
          <div className="row">
              <div className="col">Saved words: <span id="saved_words"></span></div>
              <WordList 
                  savedWords = {savedWords}/>
          </div>


          <div className="row">
              <div className="input-group col">
                  <InputGroup
                    setOutputList = {setOutputList}
                    setTheWord = {setTheWord}
                    setRhymeMode = {setRhymeMode}                    
                    theWord = {theWord}/>
              </div>
          </div>


          <div className="row">
              <h2 className="col" id="output_description"></h2>
          </div>
          <div className="output row">
              <Outputs
                outputList = {outputList}
                setSavedWords = {setSavedWords}
                savedWords = {savedWords}
                rhymeMode = {rhymeMode}
                theWord = {theWord}/>
          </div>
      </main>
  );
}

export default App;