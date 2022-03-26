import './WordList.css'

const WordList = (props) =>{

const wlist = props.savedWords

    return <p>{wlist.join(', ')}</p>
}

export default WordList;