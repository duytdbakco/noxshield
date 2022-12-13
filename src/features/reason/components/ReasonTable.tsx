import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, TableSortLabel, Theme } from '@mui/material';
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
import { Reason } from 'models/reason';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ReasonTableProps {
  reasonList: Reason[];
  onEdit?: (reason: Reason) => void;
  onRemove?: (reason: Reason) => void;
}

export default function ReasonTable({ reasonList, onEdit, onRemove }: ReasonTableProps) {
  const classes = useStyles();
  const [open, toggle] = useToggle();
  const [selectedReason, setSelectedReason] = useState<Reason>();

  const handleRemoveClick = (reason: Reason) => {
    setSelectedReason(reason);
    toggle(true);
  };

  const handleRemoveConfirm = (reason: Reason) => {
    onRemove?.(reason);
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
            {reasonList?.length ? (
              reasonList.map((reason, index) => (
                <TableRow key={reason.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{reason.header}</TableCell>
                  <TableCell align="center">{reason.img}</TableCell>
                  <TableCell align="center">{reason.desc}</TableCell>

                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(reason)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(reason)}>
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
        item={selectedReason}
        onConfirm={handleRemoveConfirm}
        mainMessage={'Xóa lý do'}
        subMessage={'Bạn có muốn xóa lý do không?'}
      />
    </>
  );
}
