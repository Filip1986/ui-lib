import { Injectable } from '@angular/core';
import { EditorType } from './base-editor.interface';

@Injectable({
  providedIn: 'root',
})
export class EditorFactoryService {
  private editorComponentMap = new Map<EditorType, string>([
    [EditorType.TIPTAP, 'TipTapEditorComponent'],
    [EditorType.QUILL, 'QuillEditorComponent'],
    [EditorType.CKEDITOR, 'CKEditorComponent'],
    [EditorType.TINYMCE, 'TinyMCEEditorComponent'],
  ]);

  private editorConfigMap = new Map<EditorType, any>([
    [
      EditorType.TIPTAP,
      {
        placeholder: 'Start typing...',
        minHeight: '200px',
      },
    ],
    [
      EditorType.QUILL,
      {
        placeholder: 'Start typing...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
        },
      },
    ],
    [
      EditorType.CKEDITOR,
      {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'link',
            'insertImage',
            'blockQuote',
            'insertTable',
            '|',
            'undo',
            'redo',
          ],
        },
        placeholder: 'Start typing...',
      },
    ],
    [
      EditorType.TINYMCE,
      {
        base_url: '/tinymce',
        suffix: '.min',
        plugins: 'lists link image table code help wordcount',
        toolbar:
          'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table | code',
        placeholder: 'Start typing...',
      },
    ],
  ]);

  /**
   * Get the appropriate editor component based on the editor type
   */
  getEditorComponentType(editorType: EditorType): string {
    const component: string | undefined = this.editorComponentMap.get(editorType);
    if (!component) {
      throw new Error(`Unknown editor type: ${editorType}`);
    }
    return component;
  }

  /**
   * Get the appropriate configuration for an editor type
   */
  getDefaultConfig(editorType: EditorType): any {
    const config: any = this.editorConfigMap.get(editorType);
    if (!config) {
      throw new Error(`No default configuration found for editor type: ${editorType}`);
    }
    return config;
  }
}
