import React from 'react';

const Options = ({ numParagraphs  }) => {
  return (
    <div className="options">
      <form>
        <input
          type="textbox"
          placeholder="# of paragraphs"
          value={numParagraphs || 3}
          onChange={(event) => {
            // setNumParagraphs(event.target.value)
          }}
        />
      </form>
      <button>Generate</button>
    </div>
  )
}

export default Options;