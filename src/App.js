import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  useEffect(() => {
   
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
    <>
         <div class="header-right">
  <a href="https://ko-fi.com/adarshtripathi123">
    <button class="button"><span>☕ </span>Buy me a coffee</button></a>
  </div>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Question Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Enter Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn"><span>❓</span> Tap Here to Generate Question</button>
        </div>
      </form>
      <div className="container">
        <div className="listsection">
        <FlashcardList flashcards={flashcards} />

        </div>
      </div>
      <footer class="footer">
        <h4>Develop and design by <span>👨‍💻 🧡 </span>Adarsh Tripathi</h4>
      <h4>Contact us <span>👇</span></h4>
  <p>Number: <a href="tel:+918595432208">+918595432208</a></p>
  <p>Email us : <a href="mailto:tiwari1998adarsh@gmail.com">tiwari1998adarsh@gmail.com</a></p>
  <p className="moreapp">👉 More Apps <a href="https://facebook-web-app-fe4ec.web.app/">Facebook-web-app</a>,  
  <a href="https://covid-19-tracker-web-app-8b400.web.app/"> covid-19-tracker web app</a>,
  <a href="https://whatsapp-web-chat.web.app/"> whatsapp-web-chat</a>, <a href="https://zoom-web-app.herokuapp.com/b3f5ae2b-2207-4ced-a30a-973f5aac5b48">zoom-web-app</a> More coming soon 👈</p>
</footer>
    </>
  );
}

export default App;
