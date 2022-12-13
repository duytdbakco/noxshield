import { createTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { profileActions, selectListServicesForm } from '../profileSlice';

import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import { useHistory } from 'react-router-dom';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  // gọi api
  useEffect(() => {
    //console.log('Pre_start');
    dispatch(profileActions.get());
    //dispatch(loginA);
    // console.log('start');
  }, [dispatch]);
  // hứng data
  const listServicesForm = useAppSelector(selectListServicesForm);

  // console.log(listServicesForm);
  // xóa
  function handleDelete() {
    const isDelete = window.confirm('Xóa nhá');
    if (isDelete == true) {
      alert('dang xóa');
    }
  }
  // console.log('|');
  const rows = listServicesForm;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Button
                  onClick={() => {
                    history.push(`/profile/update/${row.id}`);
                  }}>
                  Sửa
                </Button>
                <Button onClick={handleDelete}>Xóa</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
