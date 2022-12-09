
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

const Card = (props) => {
  return (
    <div className='github-profile'>
      <img src={props.profile.avatar_url}></img>
      <div className='info'>
        <div className='name'>{props.profile.name}</div>
        <div className='company'>{props.profile.company}</div>
      </div>
    </div>
  )
}
const CardList = (props) => {

  return (
    <div>
      {
        props.pestInCardlist.map((item, index, Array) => {
          return (<Card profile={item}></Card>)
        })
      }


    </div>
  )
}

const Form = (props) => {
  const [userName, setUserName] = useState("")

  const onInputChange = (event) => {
    setUserName([event.target.value])
  }
  const handHolder = async (event) => {
    event.preventDefault();
    console.log("profile..", userName)

    const response = await axios.get(`https://api.github.com/users/${userName}`);
    props.onReciveNewProfile(response.data)
  }

  return (
    <form onClick={handHolder}>
      <input type={"test"}
        placeholder={"enter git hub username"}
        value={userName}
        onChange={onInputChange}></input>
      <button>Add Git-Hub Card</button>
    </form>
  )
}
const App = (props) => {
  const [profiles, setProfile] = useState([])

  const addNewProfile = (newProfile) => {
    setProfile([...profiles, newProfile])
  }
  return (
    <div>
      <div className="header">The Git hub App</div>
      <Form onReciveNewProfile={addNewProfile}></Form>
      <CardList pestInCardlist={profiles}></CardList>
    </div>
  )
}



export default App;
