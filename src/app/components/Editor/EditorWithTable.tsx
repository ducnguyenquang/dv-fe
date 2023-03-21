import { useEffect, useRef, useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
import ReactQuill, { Quill } from 'react-quill-with-table';
// import ReactQuill, { Quill } from 'react-quilljs';

// import { QuillConfig, QuillModule } from "ngx-quill";
// import * as Quill from "quill";

// import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import QuillBetterTable from 'quill-better-table';
// import { Parser as HtmlToReactParser } from 'html-to-react';
// import * as QuillTableUI from "quill-table-ui";

import 'react-quill-with-table/dist/quill.snow.css';
import 'react-quill-with-table/dist/quill.bubble.css';
import 'react-quill-with-table/dist/quill.core.css';
// import './Editor.less';

// var htmlToReactParser = new HtmlToReactParser();

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/better-table', QuillBetterTable);
// Quill.register(
//   {
//     "modules/better-table": QuillBetterTable
//   },
//   true
// );
/*
 * Simple editor component that takes placeholder text as a prop
 */

interface IProps {
  value?: string;
  onChange?: any;
  placeholder?: string;

  // categories?: Category[];
}

const Editor = ({ value, onChange, placeholder }: IProps) => {
  const editor = useRef<any>();
  const [text, setText] = useState('');
  // var reactElement = htmlToReactParser.parse(text);

  useEffect(() => {
    const editon = editor?.current?.getEditor();
    // console.log(editon?.getModule("toolbar"));
    let tableModule = editon?.getModule("better-table");
    tableModule.insertTable(3, 3);
  }, []);

  return (
    <>
      <ReactQuill
        ref={editor}
        // theme={this.state.theme}
        theme="snow"
        // onChange={onChange}
        onChange={(value) => setText(value)}
        value={text}
        modules={Editor.modules}
        // formats={Editor.formats}
        // bounds={'#table'}
        placeholder={placeholder}
        // id={'table'}
      />
      {/* {reactElement} */}
    </>
  );
  // }
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  // clipboard: {
  //   // toggle to add extra line breaks when pasting HTML:
  //   matchVisual: false,
  // },
  // imageResize: {
  //   parchment: Quill.import('parchment'),
  //   modules: ['Resize', 'DisplaySize'],
  // },
  table: false,
  'better-table': {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Another unmerge cells name"
        }
      },
      color: {
        colors: ["#fff", "red", "rgb(0, 0, 0)"], // colors in operationMenu
        text: "Background Colors" // subtitle
      }
    }
    // operationMenu: {
    //   items: {
    //     unmergeCells: {
    //       text: 'Another unmerge cells name',
    //     },
    //   },
    // },
  },
  keyboard: {
    bindings: QuillBetterTable.keyboardBindings,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default Editor;
