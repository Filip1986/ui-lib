import { EventEmitter } from '@angular/core';

export interface EditorOptions {
  placeholder?: string;
  readonly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  defaultFontSize?: string;
  customToolbarOptions?: any;
  customCSS?: string;
  modules?: any;
}

export interface BaseEditor {
  content: string;
  contentChange: EventEmitter<string>;
  options: EditorOptions;
  editorReady: EventEmitter<void>;

  // Methods
  setContent(content: string): void;
  getContent(): string;
  isValid(): boolean;
  focus(): void;
  blur(): void;
  clear(): void;
  enable(): void;
  disable(): void;
}

export enum EditorType {
  TIPTAP = 'tiptap',
  QUILL = 'quill',
  CKEDITOR = 'ckeditor',
  TINYMCE = 'tinymce',
}
