import React from 'react'

type Props = {
  aioutput:string|null;
}

const MessageBubble: React.FC<Props> = ({ aioutput }) => {
  return (
    <div className={`msg-row ${'assistant'}`}>
      <div className="msg-bubble">
        <div className="msg-text">{aioutput}</div>
      </div>
    </div>
  )
}

export default MessageBubble
