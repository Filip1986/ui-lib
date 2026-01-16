import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ComponentRef,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseEditor, EditorOptions, EditorType } from '../base-editor.interface';
import { TipTapEditorComponent } from '../tiptap-editor/tiptap-editor.component';
import { QuillEditorComponent } from '../quill-editor/quill-editor.component';
import { TinyMCEEditorComponent } from '../tinymce-editor/tinymce-editor.component';
import { CKEditorComponent } from '../ckeditor-editor/ckeditor-editor.component';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

interface EditorOption {
  name: string;
  value: EditorType;
  icon: string;
}

@Component({
  selector: 'lib-editor-selection',
  templateUrl: './editor-selection.component.html',
  styleUrls: ['./editor-selection.component.scss'],
  standalone: true,
  imports: [SelectButton, FormsModule],
})
export class EditorSelectionComponent implements AfterViewInit, OnDestroy {
  @Input() content = '';
  @Input() options: EditorOptions = {};
  @Input() selectedEditor: EditorType = EditorType.TIPTAP;

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() editorChange: EventEmitter<EditorType> = new EventEmitter<EditorType>();
  @Output() editorReady: EventEmitter<BaseEditor> = new EventEmitter<BaseEditor>();

  @ViewChild('editorContainer', { read: ViewContainerRef })
  editorContainer!: ViewContainerRef;

  editorOptions: EditorOption[] = [
    { name: 'TipTap', value: EditorType.TIPTAP, icon: 'pi pi-pencil' },
    { name: 'Quill', value: EditorType.QUILL, icon: 'pi pi-file-edit' },
    { name: 'CKEditor', value: EditorType.CKEDITOR, icon: 'pi pi-align-left' },
    { name: 'TinyMCE', value: EditorType.TINYMCE, icon: 'pi pi-palette' },
  ];
  currentEditor: BaseEditor | null = null;
  private editorRef: ComponentRef<BaseEditor> | null = null;
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.createEditor(this.selectedEditor);
  }

  onEditorTypeChange(editorType: EditorType): void {
    this.selectedEditor = editorType;
    this.editorChange.emit(editorType);

    const currentContent = this.getContent();
    this.createEditor(editorType, currentContent);
  }

  getContent(): string {
    return this.currentEditor?.getContent() || this.content;
  }

  setContent(content: string): void {
    this.currentEditor?.setContent(content);
    this.content = content;
  }

  focus(): void {
    this.currentEditor?.focus();
  }

  clear(): void {
    this.currentEditor?.clear();
    this.content = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.editorRef?.destroy();
  }

  private createEditor(editorType: EditorType, content?: string): void {
    this.editorRef?.destroy();
    this.editorRef = null;
    this.currentEditor = null;

    this.editorContainer.clear();

    const editorComponent = this.getEditorComponent(editorType);
    if (!editorComponent) {
      console.error(`Unsupported editor type: ${editorType}`);
      return;
    }

    this.editorRef = this.editorContainer.createComponent(editorComponent as Type<BaseEditor>);

    const editor = this.editorRef.instance;
    editor.content = content || this.content;
    editor.options = this.options;

    editor.contentChange.pipe(takeUntil(this.destroy$)).subscribe((newContent: string) => {
      this.content = newContent;
      this.contentChange.emit(newContent);
    });

    editor.editorReady.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.currentEditor = editor;
      this.editorReady.emit(editor);
    });

    this.editorRef.changeDetectorRef.detectChanges();
  }

  private getEditorComponent(editorType: EditorType): Type<BaseEditor> | null {
    switch (editorType) {
      case EditorType.TIPTAP:
        return TipTapEditorComponent;
      case EditorType.QUILL:
        return QuillEditorComponent;
      case EditorType.CKEDITOR:
        return CKEditorComponent;
      case EditorType.TINYMCE:
        return TinyMCEEditorComponent;
      default:
        return null;
    }
  }
}
