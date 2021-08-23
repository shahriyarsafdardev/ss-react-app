import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { BoxProps } from '@material-ui/core';
//
import { toolbarFull, toolbarSimple } from './DraftEditorToolbar';
import DraftEditorStyle from './DraftEditorStyle';

// ----------------------------------------------------------------------

interface DraftEditorProps extends EditorProps {
  simple?: boolean;
  sx?: BoxProps;
}

export default function DraftEditor({ simple = false, sx, ...other }: DraftEditorProps) {
  return (
    <DraftEditorStyle sx={sx}>
      <Editor
        toolbar={simple ? toolbarSimple : toolbarFull}
        placeholder="Write something awesome..."
        {...other}
      />
    </DraftEditorStyle>
  );
}
