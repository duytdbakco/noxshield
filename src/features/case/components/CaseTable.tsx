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
import { useState } from 'react';
import { Case } from 'models/case';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface CaseTableProps {
  caseList: Case[];
  onEdit?: (cases: Case) => void;
  onRemove?: (cases: Case) => void;
}

export default function CaseTable({ caseList, onEdit, onRemove }: CaseTableProps) {
  const classes = useStyles();
  const [open, toggle] = useToggle();
  const [selectedCase, setSelectedCase] = useState<Case>();

  const handleRemoveClick = (cases: Case) => {
    setSelectedCase(cases);
    toggle(true);
  };

  const handleRemoveConfirm = (cases: Case) => {
    onRemove?.(cases);
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
            {caseList?.length ? (
              caseList.map((cases, index) => (
                <TableRow key={cases.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{cases.header}</TableCell>
                  <TableCell align="center">{cases.img}</TableCell>
                  <TableCell align="center">{cases.desc}</TableCell>

                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(cases)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(cases)}>
                      <DeleteIcon />
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
        item={selectedCase}
        onConfirm={handleRemoveConfirm}
        mainMessage={'Xóa case'}
        subMessage={'Bạn có muốn xóa case không?'}
      />
    </>
  );
}
