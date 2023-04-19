/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './inputTextBox.css';

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }

  return '';
}

export default function InputTextBox({ setQueryText, readOnly }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  function getInputText(neweditorState) {
    return setQueryText(
      neweditorState.getCurrentContent().getPlainText('\u0001'),
    );
  }

  return (
    <div className="text-box">
      <Editor
        editorState={editorState}
        onChange={(newEditorState) => {
          setEditorState(newEditorState);
          getInputText(newEditorState);
        }}
        blockStyleFn={myBlockStyleFn}
        readOnly={readOnly}
      />
    </div>
  );
}
