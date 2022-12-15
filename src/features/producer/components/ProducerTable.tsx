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
import { Producer } from 'models/producer';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ProducerTableProps {
  producerList: Producer[];
  onEdit?: (producer: Producer) => void;
  onRemove?: (producer: Producer) => void;
}

export default function ProducerTable({ producerList, onEdit, onRemove }: ProducerTableProps) {
  const classes = useStyles();
  const [open, toggle] = useToggle();
  const [selectedProducer, setSelectedProducer] = useState<Producer>();

  const handleRemoveClick = (producer: Producer) => {
    setSelectedProducer(producer);
    toggle(true);
  };

  const handleRemoveConfirm = (producer: Producer) => {
    onRemove?.(producer);
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
            {producerList?.length ? (
              producerList.map((producer, index) => (
                <TableRow key={producer.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{producer.header}</TableCell>
                  <TableCell align="center">{producer.img}</TableCell>
                  <TableCell align="center">{producer.desc}</TableCell>

                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => onEdit?.(producer)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(producer)}>
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
        item={selectedProducer}
        onConfirm={handleRemoveConfirm}
        mainMessage={'Xóa producer'}
        subMessage={'Bạn có muốn xóa producer không?'}
      />
    </>
  );
}
