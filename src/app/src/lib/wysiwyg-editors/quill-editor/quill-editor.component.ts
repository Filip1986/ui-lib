import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  forwardRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BaseEditor, EditorOptions } from '../base-editor.interface';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';

declare const Quill: any;

@Component({
  selector: 'lib-quill-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true,
    },
  ],
})
export class QuillEditorComponent
  implements OnDestroy, AfterViewInit, BaseEditor, ControlValueAccessor
{
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
  @ViewChild('toolbarContainer') toolbarContainer!: ElementRef;

  private editorInstance: any;
  private destroy$ = new Subject<void>();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  writeValue(value: string): void {
    this.content = value || '';
    if (this.editorInstance) {
      this.editorInstance.root.innerHTML = this.content;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.editorInstance) {
      return isDisabled ? this.editorInstance.disable() : this.editorInstance.enable();
    }
  }

  setContent(content: string): void {
    this.writeValue(content);
  }

  getContent(): string {
    return this.editorInstance?.root.innerHTML || this.content;
  }

  isValid(): boolean {
    return !!this.editorInstance && this.content.trim().length > 0;
  }

  focus(): void {
    this.editorInstance?.focus();
  }

  blur(): void {
    if (this.editorInstance?.hasFocus()) {
      this.editorInstance.blur();
    }
  }

  clear(): void {
    if (this.editorInstance) {
      this.editorInstance.setText('');
      this.onChange('');
      this.content = '';
    }
  }

  enable(): void {
    this.setDisabledState(false);
  }

  disable(): void {
    this.setDisabledState(true);
  }

  insertImage(url: string): void {
    const range = this.editorInstance?.getSelection();
    if (range) {
      this.editorInstance.insertEmbed(range.index, 'image', url);
    }
  }

  insertLink(url: string, text: string): void {
    const range = this.editorInstance?.getSelection();
    if (range) {
      if (range.length > 0) {
        this.editorInstance.formatText(range.index, range.length, 'link', url);
      } else {
        this.editorInstance.insertText(range.index, text, 'link', url);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.editorInstance = null;
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadQuill()
        .then(() => this.initEditor())
        .catch((err) => console.error('Failed to load Quill:', err));
    }
  }

  private onChange: (value: string) => void = () => {
    console.log('onChange');
  };
  private onTouched: () => void = () => {
    console.log('onTouched');
  };

  private async loadQuill(): Promise<void> {
    if (typeof Quill === 'undefined') {
      try {
        const QuillModule = await import('quill');
        (window as any).Quill = QuillModule.default;
      } catch (err) {
        throw new Error('Failed to load Quill library');
      }
    }
  }

  private initEditor(): void {
    if (!this.editorContainer || !this.toolbarContainer) {
      console.error('Editor container or toolbar container is missing');
      return;
    }

    const Quill = (window as any).Quill;
    if (!Quill) {
      console.error('Quill is not loaded');
      return;
    }

    this.editorInstance = new Quill(this.editorContainer.nativeElement, {
      modules: this.options.modules || {
        toolbar: this.toolbarContainer.nativeElement,
      },
      placeholder: this.options.placeholder || 'Start typing...',
      readOnly: this.options.readonly || false,
      theme: 'snow',
    });

    if (this.content) {
      this.editorInstance.root.innerHTML = this.content;
    }

    this.editorInstance.on('text-change', () => {
      const htmlContent = this.editorInstance.root.innerHTML;
      this.content = htmlContent;
      this.contentChange.emit(htmlContent);
      this.onChange(htmlContent);
    });

    this.editorInstance.on('selection-change', (range: any) => {
      this.focusChange.emit(!!range);
      if (range) {
        this.onTouched();
      }
    });

    if (this.options.minHeight) {
      this.editorContainer.nativeElement.style.minHeight = this.options.minHeight;
    }

    if (this.options.maxHeight) {
      this.editorContainer.nativeElement.style.maxHeight = this.options.maxHeight;
      this.editorContainer.nativeElement.style.overflow = 'auto';
    }

    this.editorReady.emit(this.editorInstance);
  }
}
