// import React, { Component } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditorPlugin from '@ckeditor/ckeditor5-build-classic';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import Context from '@ckeditor/ckeditor5-core/src/context';

// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// import Font from '@ckeditor/ckeditor5-font/src/font';

interface IProps {
  value?: string;
  onChange?: any;
  placeholder?: string;
}

// ClassicEditor.builtinPlugins = [
//   Font,
// ];

const editorConfig = {
  // plugins: [ Font, /* ... */ ],
  // toolbar: ['heading', 'bulletedList', 'numberedList', 'fontFamily', 'undo', 'redo'],
  toolbar: {
    items: [
      'exportPDF',
      'exportWord',
      '|',
      'findAndReplace',
      'selectAll',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'code',
      'subscript',
      'superscript',
      'removeFormat',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo',
      '-',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'alignment',
      '|',
      'link',
      'insertImage',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'codeBlock',
      'htmlEmbed',
      '|',
      'specialCharacters',
      'horizontalLine',
      'pageBreak',
      '|',
      'textPartLanguage',
      '|',
      'sourceEditing',
    ],
    shouldNotGroupWhenFull: true,
  },
  // Changing the language of the interface requires loading the language file using the <script> tag.
  // language: 'es',
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
    ],
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
  placeholder: 'Welcome to CKEditor 5!',
  // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
    ],
    supportAllValues: true,
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true,
  },
  // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
  // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  // Be careful with enabling previews
  // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
  htmlEmbed: {
    showPreviews: true,
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
  link: {
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
  mention: {
    feeds: [
      {
        marker: '@',
        feed: [
          '@apple',
          '@bears',
          '@brownie',
          '@cake',
          '@cake',
          '@candy',
          '@canes',
          '@chocolate',
          '@cookie',
          '@cotton',
          '@cream',
          '@cupcake',
          '@danish',
          '@donut',
          '@dragée',
          '@fruitcake',
          '@gingerbread',
          '@gummi',
          '@ice',
          '@jelly-o',
          '@liquorice',
          '@macaroon',
          '@marzipan',
          '@oat',
          '@pie',
          '@plum',
          '@pudding',
          '@sesame',
          '@snaps',
          '@soufflé',
          '@sugar',
          '@sweet',
          '@topping',
          '@wafer',
        ],
        minimumCharacters: 1,
      },
    ],
  },
  // The "super-build" contains more premium features that require additional configuration, disable them below.
  // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
  removePlugins: [
    'CKBox',
    'CKFinder',
    'EasyImage',
    'RealTimeCollaborativeComments',
    'RealTimeCollaborativeTrackChanges',
    'RealTimeCollaborativeRevisionHistory',
    'PresenceList',
    'Comments',
    'TrackChanges',
    'TrackChangesData',
    'RevisionHistory',
    'Pagination',
    'WProofreader',
    'MathType',
  ],
};

const ClassicEditor = ({ value, onChange, placeholder }: IProps) => {
  return (
    // <CKEditorContext context={ Context }>
      <CKEditor
        editor={Editor}
        // editor={ClassicEditorPlugin}
        data={value}
      //   config={ {
      //     plugins: [ Font ],
      //       toolbar: [ 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor' ]

      // } }
        config={editorConfig}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          onChange(data);
        }}
        onBlur={(event: any, editor: any) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          // console.log('Focus.', editor);
        }}
      />
    // </CKEditorContext>
  );
  // }
};

export default ClassicEditor;
