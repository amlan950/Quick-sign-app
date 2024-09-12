import React, { useState } from 'react'

const Form = () => {
    const [name,setName] = useState('');
    const [email,SetEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleName = (e)=>
    {
        console.log(e.target.value);
        setName(e.target.value);
    }
    const handleEmail =(e)=>{
        console.log(e.target.value);
        SetEmail(e.target.value);
    }
    const handlePassword=(e)=>{
        console.log(e.target.value);
        setPassword(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>

      <label>
        Name:
        <input type="text" onChange={handleName} value={name}/>
      </label>
      <br/>
      <label>
        Email:
        <input type="text" onChange={handleEmail} value={email}/>
      </label>
      <br/>
      <label>
        Password:
        <input type="text" onChange={handlePassword} value={password}/>
      </label>
      <br/>
      <button type='submit' >submit</button>
    </form>
    </div>
  )
}

export default Form
