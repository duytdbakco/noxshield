import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import CommonDialog from 'components/Common/CommonDialog';
import { useToggle } from 'hooks';
import { Content } from 'models/content';
import { useState } from 'react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ContentTableProps {
  contentList: Content[];
  onEdit?: (content: Content) => void;
  onRemove?: (content: Content) => void;
  onSelectContent?: (content: Content) => void;
}

export default function ContentTable({
  contentList,
  onEdit,
  onRemove,
  onSelectContent,
}: ContentTableProps) {
  const classes = useStyles();
  const [open, toggle] = useToggle();
  const [selectedContent, setSelectedContent] = useState<Content>();

  const handleRemoveClick = (content: Content) => {
    setSelectedContent(content);
    toggle(true);
  };

  const handleRemoveConfirm = (content: Content) => {
    onRemove?.(content);
    toggle(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Tiêu đề</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="center">Mô tả</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {contentList?.length ? (
              contentList.map((content, index) => (
                <TableRow key={content.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{content.header}</TableCell>
                  <TableCell align="center">{content.img}</TableCell>
                  <TableCell align="center">{content.desc}</TableCell>

                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(content)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(content)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        onSelectContent?.(content as Content);
                      }}>
                      <ReadMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  {'No data to display'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Remove dialog */}
      <CommonDialog
        open={open}
        onClose={toggle}
        item={selectedContent}
        onConfirm={handleRemoveConfirm}
        mainMessage={'Xóa content'}
        subMessage={'Bạn có muốn xóa content không?'}
      />
    </>
  );
}
