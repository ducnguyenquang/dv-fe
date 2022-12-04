import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import './Editor.less';

const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta: any, oldContents: any) => {
        console.log('Text change!');
        console.log(delta);

        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
