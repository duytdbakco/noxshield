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
import { Banner } from 'models/banner';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface BannerTableProps {
  bannerList: Banner[];
  onEdit?: (banner: Banner) => void;
  onRemove?: (banner: Banner) => void;
}

export default function BannerTable({ bannerList, onEdit, onRemove }: BannerTableProps) {
  const classes = useStyles();
  const [open, toggle] = useToggle();
  const [selectedBanner, setSelectedBanner] = useState<Banner>();

  const handleRemoveClick = (banner: Banner) => {
    setSelectedBanner(banner);
    toggle(true);
  };

  const handleRemoveConfirm = (banner: Banner) => {
    onRemove?.(banner);
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
            {bannerList?.length ? (
              bannerList.map((banner, index) => (
                <TableRow key={banner.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{banner.header}</TableCell>
                  <TableCell align="center">{banner.img}</TableCell>
                  <TableCell align="center">{banner.desc}</TableCell>

                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(banner)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(banner)}>
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
        item={selectedBanner}
        onConfirm={handleRemoveConfirm}
        mainMessage={'Xóa banner'}
        subMessage={'Bạn có muốn xóa banner không?'}
      />
    </>
  );
}
