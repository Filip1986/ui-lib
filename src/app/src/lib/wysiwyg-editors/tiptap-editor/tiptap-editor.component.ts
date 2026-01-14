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
  forwardRef,
} from '@angular/core';

import { BaseEditor, EditorOptions } from '../base-editor.interface';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

@Component({
  selector: 'lib-tiptap-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tiptap-editor.component.html',
  styleUrls: ['./tiptap-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof TipTapEditorComponent => TipTapEditorComponent),
      multi: true,
    },
  ],
})
export class TipTapEditorComponent
  implements OnDestroy, AfterViewInit, BaseEditor, ControlValueAccessor
{
  @Input() content = '';
  @Input() options: EditorOptions = {
    placeholder: 'Start typing...',
    readonly: false,
    minHeight: '200px',
  };

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() editorReady: EventEmitter<void> = new EventEmitter<void>();
  @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('editorContainer') editorContainer!: ElementRef;

  editor!: Editor;
  isEditorReady = false;
  isDisabled = false;

  ngAfterViewInit(): void {
    this.initEditor();
  }

  writeValue(value: string): void {
    this.content = value || '';
    if (this.editor && this.content !== this.editor.getHTML()) {
      this.editor.commands.setContent(this.content);
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
      this.editor.setEditable(!isDisabled);
    }
  }

  setContent(content: string): void {
    this.writeValue(content);
  }

  getContent(): string {
    return this.editor ? this.editor.getHTML() : this.content;
  }

  isValid(): boolean {
    return !!this.editor && this.content.trim().length > 0;
  }

  focus(): void {
    this.editor?.commands.focus();
  }

  blur(): void {
    this.editor?.commands.blur();
  }

  clear(): void {
    this.editor?.commands.clearContent();
    this.onChange('');
    this.content = '';
  }

  enable(): void {
    this.setDisabledState(false);
  }

  disable(): void {
    this.setDisabledState(true);
  }

  formatText(command: string): void {
    const commandMap: Record<string, () => void> = {
      bold: (): boolean => this.editor.chain().focus().toggleBold().run(),
      italic: (): boolean => this.editor.chain().focus().toggleItalic().run(),
      strike: (): boolean => this.editor.chain().focus().toggleStrike().run(),
      h1: (): boolean => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
      h2: (): boolean => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
      h3: (): boolean => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
      bullet: (): boolean => this.editor.chain().focus().toggleBulletList().run(),
      ordered: (): boolean => this.editor.chain().focus().toggleOrderedList().run(),
      blockquote: (): boolean => this.editor.chain().focus().toggleBlockquote().run(),
      clear: (): boolean => this.editor.chain().focus().clearNodes().run(),
      link: (): void => {
        const url: string | null = this.promptUser('Enter the URL:');
        if (url) this.editor.chain().focus().toggleLink({ href: url }).run();
      },
      image: (): void => {
        const imageUrl: string | null = this.promptUser('Enter image URL:');
        if (imageUrl) this.editor.chain().focus().setImage({ src: imageUrl }).run();
      },
    };

    const executeCommand: () => void = commandMap[command];
    if (executeCommand) {
      executeCommand();
    } else {
      console.warn(`Unknown command: ${command}`);
    }
  }

  isActive(command: string): boolean {
    const activeMap: Record<string, () => boolean> = {
      bold: (): boolean => this.editor.isActive('bold'),
      italic: (): boolean => this.editor.isActive('italic'),
      strike: (): boolean => this.editor.isActive('strike'),
      h1: (): boolean => this.editor.isActive('heading', { level: 1 }),
      h2: (): boolean => this.editor.isActive('heading', { level: 2 }),
      h3: (): boolean => this.editor.isActive('heading', { level: 3 }),
      bullet: (): boolean => this.editor.isActive('bulletList'),
      ordered: (): boolean => this.editor.isActive('orderedList'),
      blockquote: (): boolean => this.editor.isActive('blockquote'),
      link: (): boolean => this.editor.isActive('link'),
    };

    return activeMap[command]?.() || false;
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  private onChange: (value: string) => void = (): void => {
    console.log('onChange');
  };

  private onTouched: () => void = (): void => {
    console.log('onTouched');
  };

  private promptUser(message: string): string | null {
    try {
      return prompt(message);
    } catch (error) {
      console.error('Prompt failed:', error);
      return null;
    }
  }

  private initEditor(): void {
    try {
      this.editor = new Editor({
        element: this.editorContainer.nativeElement,
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: this.options.placeholder || 'Start typing...',
          }),
          Link.configure({ openOnClick: false }),
          Image,
          Table.configure({ resizable: true }),
          TableRow,
          TableCell,
          TableHeader,
        ],
        content: this.content,
        editable: !this.options.readonly && !this.isDisabled,
        onUpdate: ({ editor }): void => {
          const htmlContent = editor.getHTML();
          this.content = htmlContent;
          this.contentChange.emit(htmlContent);
          this.onChange(htmlContent);
        },
        onFocus: (): void => {
          this.onTouched();
          this.focusChange.emit(true);
        },
        onBlur: (): void => {
          this.focusChange.emit(false);
        },
      });

      this.applyStyles();
      this.isEditorReady = true;
      this.editorReady.emit();
    } catch (error) {
      console.error('Editor initialization failed:', error);
    }
  }

  private applyStyles(): void {
    if (this.options.minHeight) {
      this.editorContainer.nativeElement.style.minHeight = this.options.minHeight;
    }
    if (this.options.maxHeight) {
      this.editorContainer.nativeElement.style.maxHeight = this.options.maxHeight;
      this.editorContainer.nativeElement.style.overflow = 'auto';
    }
  }
}
