import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEditor } from 'ckeditor4-react';
import { ChevronLeft } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import useNavigate from 'hooks/useNavigate';
const theme = createTheme({});
const useStyles = makeStyles(() => ({
  button: {
    padding: '20px!important 10px!important',
    marginBottom: '10px!important',
  },
}));

const DetailPage = () => {
  const classes = useStyles();

  const { handleRouterChange: content } = useNavigate('/content');

  return (
    <ThemeProvider theme={theme}>
      <Button startIcon={<ChevronLeft />} onClick={content}>
        {'Back to content list'}
      </Button>
      {/* <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            'heading',
            '|',
            'source',
            'fontfamily',
            'fontsize',
            '|',
            'alignment',
            '|',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            'subscript',
            'superscript',
            '|',
            'link',
            '|',
            'outdent',
            'indent',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'code',
            'codeBlock',
            '|',
            'insertTable',
            '|',
            'blockQuote',
            'ckfinder',
            '|',
            'undo',
            'redo',
            'link',
          ],
          shouldNotGroupWhenFull: true,
        }}
        data="<p>Hello from the first editor working with the context!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      /> */}
      <CKEditor initData="<p>Hello from the first editor working with the context!</p>" />
    </ThemeProvider>
  );
};

export default DetailPage;
