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
  forwardRef,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { BaseEditor } from '../base-editor.interface';

declare const ClassicEditor: any;

@Component({
  selector: 'lib-ckeditor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ckeditor-editor.component.html',
  styleUrls: ['./ckeditor-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CKEditorComponent),
      multi: true,
    },
  ],
})
export class CKEditorComponent
  implements BaseEditor, OnDestroy, AfterViewInit, ControlValueAccessor
{
  @Input() content = '';
  @Input() options: {
    placeholder?: string;
    readonly?: boolean;
    minHeight?: string;
    maxHeight?: string;
  } = {
    placeholder: 'Start typing...',
    readonly: false,
    minHeight: '200px',
  };

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() editorReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('editorContainer') editorContainer!: ElementRef;

  editor: any;
  isEditorReady = false;
  isDisabled = false;
  isBrowser: boolean;
  private destroy$ = new Subject<void>();
  private loadingPromise: Promise<void> | null = null;
  private editorInstance: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  writeValue(value: string): void {
    this.content = value || '';
    if (this.editor) {
      this.editor.setData(this.content);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.editor) {
      this.editor.isReadOnly = isDisabled;
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadEditor()
        .then((): Promise<void> => this.initEditor())
        .catch((err: any): void => console.error('Failed to load CKEditor:', err));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.editor) {
      this.editor
        .destroy()
        .catch((error: any) => console.error('Error during CKEditor destroy:', error));
      this.editor = null;
    }
  }

  async initializeEditor(): Promise<void> {
    // Initialize CKEditor instance here
    this.editorReady.emit();
  }

  setContent(content: string): void {
    this.content = content;
    if (this.editorInstance) {
      this.editorInstance.setData(content);
    }
  }

  getContent(): string {
    return this.editorInstance ? this.editorInstance.getData() : this.content;
  }

  isValid(): boolean {
    // Add validation logic if needed
    return true;
  }

  focus(): void {
    this.editorInstance?.focus();
  }

  clear(): void {
    this.setContent('');
  }

  blur(): void {
    this.editorInstance?.editing.view.focusTracker.blur();
  }

  enable(): void {
    if (this.editorInstance) {
      this.editorInstance.isReadOnly = false;
    }
  }

  disable(): void {
    if (this.editorInstance) {
      this.editorInstance.isReadOnly = true;
    }
  }

  private async loadEditor(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise<void>((resolve, reject: (reason?: any) => void): void => {
      if (typeof ClassicEditor !== 'undefined') {
        resolve();
        return;
      }

      try {
        const script: any = this.renderer.createElement('script');
        script.src = 'https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js';
        script.onload = () => resolve();
        script.onerror = (error: any) => reject(new Error(`Failed to load CKEditor: ${error}`));
        this.renderer.appendChild(document.head, script);
      } catch (err) {
        reject(err);
      }
    });

    return this.loadingPromise;
  }

  private async initEditor(): Promise<void> {
    if (!this.isBrowser || !this.editorContainer) {
      return;
    }

    try {
      this.editor = await ClassicEditor.create(this.editorContainer.nativeElement, {
        placeholder: this.options.placeholder || 'Start typing...',
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
            'blockQuote',
            'insertTable',
            '|',
            'undo',
            'redo',
          ],
        },
      });

      if (this.content) {
        this.editor.setData(this.content);
      }

      this.editor.model.document.on('change:data', (): void => {
        const data = this.editor.getData();
        this.content = data;
        this.contentChange.emit(data);
        this.onChange(data);
      });

      this.editor.editing.view.document.on('focus', (): void => {
        this.focusChange.emit(true);
        this.onTouched();
      });

      this.editor.editing.view.document.on('blur', (): void => {
        this.focusChange.emit(false);
      });

      if (this.options.readonly || this.isDisabled) {
        this.editor.isReadOnly = true;
      }

      const editorElement: any =
        this.editorContainer.nativeElement.querySelector('.ck-editor__editable');
      if (editorElement) {
        if (this.options.minHeight) {
          editorElement.style.minHeight = this.options.minHeight;
        }
        if (this.options.maxHeight) {
          editorElement.style.maxHeight = this.options.maxHeight;
          editorElement.style.overflow = 'auto';
        }
      }

      this.isEditorReady = true;
      this.editorReady.emit(this.editor);
    } catch (error) {
      console.error('CKEditor initialization error:', error);
    }
  }

  private onChange: (value: string) => void = (): void => {
    console.log('onChange');
  };

  private onTouched: () => void = (): void => {
    console.log('onTouched');
  };
}
