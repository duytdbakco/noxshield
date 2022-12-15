import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Banner } from 'models/banner';
import bannerApi from 'api/bannerApi';
import { bannerActions, selectBannerFilter } from '../bannerSlice';
import { useParams } from 'react-router-dom';
export interface BannerFormProps {
  initialValues?: Banner;
  onClose: () => void;
}

const schema = yup.object().shape({
  header: yup.string().required('Vui lòng nhập tiêu đề'),
  img: yup.string().required('Vui lòng chèn thêm ảnh'),
  desc: yup.string().required('Vui lòng nhập mô tả'),
});

export default function BannerForm({ initialValues, onClose }: BannerFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectBannerFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Banner>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleBannerFormSubmit = async (formValues: any) => {
    if (isEdit) {
      await bannerApi.update(formValues);
      toast.success('Cập nhật banner thành công!');
    } else {
      await bannerApi.add(formValues);
      toast.success('Thêm banner thành công!');
      console.log(formValues);
    }
    dispatch(bannerActions.fetchBannerList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleBannerFormSubmit)}>
        <InputField name="header" control={control} placeholder="Nhập tiêu đề" label="Tiêu đề" />

        <InputField name="img" control={control} placeholder="Upload ảnh" label="Ảnh*" />

        <InputField name="desc" control={control} placeholder="Nhập mô tả" label="Mô tả*" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;{'Xác nhận'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
