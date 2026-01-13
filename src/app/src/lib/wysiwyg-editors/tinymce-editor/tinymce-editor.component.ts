import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BaseEditor, EditorOptions } from '../base-editor.interface';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

declare const tinymce: any;

@Component({
  selector: 'lib-tinymce-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tinymce-editor.component.html',
  styleUrls: ['./tinymce-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TinyMCEEditorComponent implements OnDestroy, AfterViewInit, BaseEditor {
  @Input() content = '';
  @Input() options: EditorOptions = {
    placeholder: 'Start typing...',
    readonly: false,
    minHeight: '200px',
  };

  @Output() contentChange = new EventEmitter<string>();
  @Output() editorReady = new EventEmitter<any>();
  @Output() focusChange = new EventEmitter<boolean>();

  @ViewChild('editorContainer') editorContainer!: ElementRef;

  editor: any;
  isEditorReady = false;
  isDisabled = false;
  isBrowser: boolean;
  editorId: string;
  private destroy$ = new Subject<void>();
  private loadingPromise: Promise<void> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.editorId = 'tinymce-editor-' + Math.random().toString(36).substring(2, 11);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadTinyMCE()
        .then(() => this.initEditor())
        .catch((err) => console.error('Failed to load TinyMCE:', err));
    }
  }

  setContent(content: string): void {
    if (this.editor) {
      this.editor.setContent(content);
      this.content = content;
    }
  }

  getContent(): string {
    return this.editor ? this.editor.getContent() : this.content;
  }

  isValid(): boolean {
    return !!this.editor && this.content.trim().length > 0;
  }

  focus(): void {
    this.editor?.focus();
  }

  blur(): void {
    this.editor?.getBody().blur();
  }

  clear(): void {
    this.editor?.setContent('');
  }

  enable(): void {
    if (this.editor) {
      this.editor.setMode('design');
      this.isDisabled = false;
    }
  }

  disable(): void {
    if (this.editor) {
      this.editor.setMode('readonly');
      this.isDisabled = true;
    }
  }

  insertImage(url: string, title?: string): void {
    this.editor?.insertContent(`<img src="${url}" alt="${title || 'Image'}" />`);
  }

  insertLink(url: string, text?: string): void {
    const selectedText = this.editor?.selection.getContent({ format: 'text' });
    const linkText = text || selectedText || url;
    this.editor?.insertContent(`<a href="${url}">${linkText}</a>`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.editor) {
      tinymce.remove(this.editor);
      this.editor = null;
    }
  }

  private async loadTinyMCE(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise<void>((resolve, reject) => {
      if (typeof tinymce !== 'undefined') {
        resolve();
        return;
      }

      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
        script.referrerPolicy = 'origin';

        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load TinyMCE editor from CDN'));

        document.head.appendChild(script);
      } catch (err) {
        reject(err);
      }
    });

    return this.loadingPromise;
  }

  private initEditor(): void {
    if (!this.isBrowser || !this.editorContainer) {
      return;
    }

    const editorConfig = {
      target: this.editorContainer.nativeElement,
      height: parseInt(this.options.minHeight || '200', 10),
      menubar: false,
      plugins:
        this.options.customToolbarOptions?.plugins ||
        'advlist autolink lists link image charmap preview anchor ' +
          'searchreplace visualblocks code fullscreen ' +
          'insertdatetime media table code help wordcount',
      toolbar:
        this.options.customToolbarOptions?.toolbar ||
        'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
      promotion: false,
      branding: false,
      statusbar: false,
      placeholder: this.options.placeholder || 'Start typing...',
      readonly: this.options.readonly || false,
      setup: (editor: any) => {
        this.editor = editor;

        editor.on('Change', () => {
          const content = editor.getContent();
          this.content = content;
          this.contentChange.emit(content);
        });

        editor.on('focus', () => this.focusChange.emit(true));
        editor.on('blur', () => this.focusChange.emit(false));

        editor.on('init', () => {
          if (this.content) {
            editor.setContent(this.content);
          }

          if (this.options.readonly) {
            editor.setMode('readonly');
          }

          this.isEditorReady = true;
          this.editorReady.emit(editor);
        });
      },
    };

    tinymce.init(editorConfig);
  }
}
