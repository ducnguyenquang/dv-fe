import { Component } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
import ReactQuill, { Quill } from 'react-quill-with-table';

// import 'react-quill/dist/quill.snow.css';
import "react-quill-with-table/dist/quill.snow.css";
import "react-quill-with-table/dist/quill.bubble.css";
import ImageResize from 'quill-image-resize-module-react';
import QuillBetterTable from "quill-better-table";

import './Editor.less';

Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/better-table", QuillBetterTable);

/*
 * Simple editor component that takes placeholder text as a prop
 */
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(html);
  }

  render() {
    return (
      <ReactQuill
        theme={this.state.theme}
        onChange={this.props.onChange}
        value={this.props.value}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'#root'}
        placeholder={this.props.placeholder}
      />
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  'better-table': {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Another unmerge cells name"
        }
      }
    }
  },
  // keyboard: {
  //   bindings: QuillBetterTable.keyboardBindings,
  // }
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
  'video'
];

export default Editor;
