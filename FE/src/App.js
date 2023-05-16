import { useState } from 'react';
import './App.css';

function App() {

  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [previousCopy, setPreviousCopy] = useState('');
  const [responseCopy, setResponseCopy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch response to the api combining the chat log arrayof messages and seinding it as a message to localhost:3000 as a post
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // message: chatLog.map((message) => message.message).join("")
        message: `I want you to act as an expert branding manager and marketing copywriter. Write the tone of voice for ${companyName}. ${companyName} does ${companyDescription}. Generate the brand tone of voice for ${companyName}. Keep the format as three points. Each point should be short and simple to understand. For your reference, here is one of their previous social media creative copy: ${previousCopy}.`
      })
    });
    const data = await response.json();
    if (data){
      setResponseCopy(data.data.choices[0].text)
    }
    console.log(data)
  }
  return (
    <div className="App">
      <h1>Generate Tone Of voice of your brand</h1>
      {/* <button onClick={() => handleClick()}>Click Me</button> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="company-name">Name of Company:</label>
        <input
          type="text"
          id="company-name"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />

        <label htmlFor="company-description">Description of Company:</label>
        <textarea
          id="company-description"
          value={companyDescription}
          onChange={(event) => setCompanyDescription(event.target.value)}
        />

        <label htmlFor="previous-copy">Previous Copy:</label>
        <textarea
          id="previous-copy"
          value={previousCopy}
          onChange={(event) => setPreviousCopy(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <div>
        {!!responseCopy && responseCopy}
      </div>
    </div>
  );
}

export default App;
