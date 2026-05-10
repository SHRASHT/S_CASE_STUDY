import React,{useState} from 'react'
import './chat.css'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'

const ChatUI: React.FC = () => {

const [aioutput,setAiOutput]=useState<string|null>('');

  return (
    <div className="llm-app">
      <aside className="llm-sidebar">
        <div className="llm-brand">LLM UI</div>
        <nav className="llm-nav">
          <button className="llm-nav-btn active">New chat</button>
          <button className="llm-nav-btn">Examples</button>
        </nav>
      </aside>

      <main className="llm-main">
        <header className="llm-header">Interactive Assistant</header>

        <section className="llm-messages" aria-live="polite">
        
            <MessageBubble aioutput={aioutput} />
       
        </section>

        <InputBar setAiOutput={setAiOutput}/>
      </main>
    </div>
  )
}

export default ChatUI
