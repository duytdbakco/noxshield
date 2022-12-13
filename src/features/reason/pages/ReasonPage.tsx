import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Pagination } from '@mui/lab';
import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  TablePagination,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import reasonApi from 'api/reasonApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { FileUploaded } from 'components/Common';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { ListParams } from 'models';
import { Reason } from 'models/reason';
import React, { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReasonFilter from '../components/ReasonFilter';
import ReasonForm from '../components/ReasonForm';
import ReasonTable from '../components/ReasonTable';
import {
  reasonActions,
  selectReasonFilter,
  selectReasonList,
  selectReasonLoading,
  selectReasonPageCount,
} from '../reasonSlice';

const theme = createTheme({});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 16,
    },

    loading: {
      position: 'absolute',
      top: -8,
      width: '100%',
    },
    filter: {
      width: '100%',
      display: 'flex',
      justifyItems: 'space-between',
      alignItems: 'center',
    },
  })
);

export default function ReasonPage() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const reasonList = useAppSelector(selectReasonList);
  const pageCount = useAppSelector(selectReasonPageCount);

  const filter = useAppSelector(selectReasonFilter);
  const loading = useAppSelector(selectReasonLoading);

  const [openPopup, setOpenPopup] = useState(false);
  const [reason, setReason] = useState<Reason>();

  const initialValues: Reason = {
    header: '',
    img: '',
    desc: '',
    ...reason,
  } as Reason;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(reasonActions.fetchReasonList(filter));
  }, [dispatch, filter]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reasonActions.setFilter({
        ...filter,
        _limit: parseInt(event.target.value, 10),
      })
    );
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(reasonActions.setFilter(newFilter));
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(reasonActions.setFilterWithDebounce(newFilter));
  };
  const handlePageChange = (_page: number) => {
    dispatch(
      reasonActions.setFilter({
        ...filter,
        _page,
      })
    );
  };

  const handleRemoveReason = async (reason: Reason) => {
    try {
      // Remove pri API
      await reasonApi.remove(reason?.id || '');

      toast.success(' Xóa lý do thành công!');

      const newFilter = { ...filter };
      dispatch(reasonActions.fetchReasonList(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch reason', error);
    }
  };
  const handleEditReason = async (reason: Reason) => {
    setReason(reason);
    setOpenPopup(true);
  };
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedFile(undefined);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Danh Sách Lý Do
          </Typography>
        </Box>
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <ReasonFilter
              filter={filter}
              onChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid
            width="100%"
            xs={4}
            md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center">
            <Toolbar>
              <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Tooltip title={'Import image'.toString()}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenDrawer(true);
                      }}>
                      <UploadFileIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
            <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>
        {loading && <LinearProgress className={classes.loading} />}

        <ReasonTable
          reasonList={reasonList}
          onEdit={handleEditReason}
          onRemove={handleRemoveReason}
        />
        {console.log(pageCount)}
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            count={Math.ceil(pageCount / filter._limit)}
            page={filter._page}
            onChange={(e: any, _page: number) => {
              handlePageChange(_page);
            }}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pageCount}
            rowsPerPage={filter._limit}
            page={filter._page - 1}
            onPageChange={(e: any, _page: number) => {
              handlePageChange(_page + 1);
            }}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => {
            handleCloseDrawer();
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-between',
              justifyContent: 'space-between',
              height: '100%',
              width: '450px',
            }}>
            <div>
              <div
                style={{
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px',
                }}>
                <Typography>{'Import file'}</Typography>
                <IconButton
                  onClick={() => {
                    handleCloseDrawer();
                  }}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider />
              {!loading && (
                <Typography
                  variant="h6"
                  style={{
                    marginTop: '25px',
                    marginLeft: '15px',
                  }}>
                  {'Select a file to import'}
                </Typography>
              )}

              {!loading && (
                <div
                  style={{
                    border: '1px solid #e2e6f0',
                    height: '152px',
                    margin: '15px',
                    backgroundColor: '#fbfcfd',
                  }}>
                  <FileUploaded
                    width="420px"
                    height="150px"
                    hoverLabel={'Click or drag to upload file'.toString()}
                    dropLabel={'Drop file here'.toString()}
                    accept={'image/x-png'}
                    onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                      if (event.target.files !== null && event.target?.files?.length > 0) {
                        setSelectedFile(event.target.files[0]);
                      }
                    }}
                    onDrop={function (event: DragEvent<HTMLElement>): void {
                      setSelectedFile(event.dataTransfer.files[0]);
                    }}
                  />
                </div>
              )}
              {loading && <LinearProgress />}
              {selectedFile && !loading && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    margin: '15px',
                    textAlign: 'center',
                  }}>
                  <Typography variant="body1" align="center">
                    {`${'Filename: '}${selectedFile.name}`}
                  </Typography>
                  <CloseIcon
                    onClick={() => {
                      setSelectedFile(undefined);
                    }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                height: '60px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f4f7fa',
              }}>
              <Button
                style={{
                  marginLeft: '25px',
                }}
                onClick={() => {
                  handleCloseDrawer();
                }}
                disabled={loading}>
                {'Cancel'}
              </Button>
              <Button
                style={{
                  marginRight: '25px',
                }}
                disabled={!selectedFile || loading}
                variant="contained"
                onClick={async () => {
                  if (selectedFile) {
                    dispatch(reasonActions.setLoading(true));
                    try {
                      const response = await reasonApi.importFile(selectedFile);
                      if (response.succeed) {
                        setOpenDrawer(false);
                        toast.success('Import Succeed'.toString());
                      } else {
                      }
                    } catch (error) {
                      console.log(error);
                      toast.error('Import fail'.toString());
                    }
                    dispatch(reasonActions.setLoading(false));
                  }
                }}>
                {'Upload'}
              </Button>
            </div>
          </div>
        </Drawer>

        <Popup
          title={initialValues?.id ? 'Cập nhật nội dung lý do' : 'Thêm nội dung lý do'}
          subtitle="Vui lòng nhập đầy đủ các thông tin vào ô bên dưới"
          openPopUp={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setReason(undefined);
          }}>
          <ReasonForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
