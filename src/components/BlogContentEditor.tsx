import { Plate, usePlateEditor } from 'platejs/react';
import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { ToolbarButton } from '@/components/ui/toolbar'; // Generic toolbar button
import { Value } from 'platejs';

const initialValue: Value = [
  {
    children: [{ text: 'Title' }],
    type: 'h3',
  },
  {
    children: [{ text: 'This is a quote.' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: 'With some ' },
      { bold: true, text: 'bold' },
      { text: ' text for emphasis!' },
    ],
    type: 'p',
  },
];

export default function BlogContentEditor(): React.ReactElement {
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
    ],
    value: () => {
      if (typeof window !== 'undefined') {
        const savedValue = localStorage.getItem('installation-next-demo');
        return savedValue ? JSON.parse(savedValue) : initialValue;
      }
      return initialValue;
    },
  });
  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('installation-next-demo', JSON.stringify(value));
        }
      }}
    >
      <FixedToolbar className="justify-start rounded-t-lg">
        {/* Element Toolbar Buttons */}
        <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>
          Quote
        </ToolbarButton>
        {/* Mark Toolbar Buttons */}
        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
          B
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
          I
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
          U
        </MarkToolbarButton>
        <div className="flex-1" />
        <ToolbarButton
          className="px-2"
          onClick={() => editor.tf.setValue(initialValue)}
        >
          Reset
        </ToolbarButton>
      </FixedToolbar>
      <EditorContainer>
        <Editor placeholder="Type your amazing content here..." />
      </EditorContainer>
    </Plate>
  );
}
