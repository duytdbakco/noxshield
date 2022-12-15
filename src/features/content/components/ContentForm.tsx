import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import contentApi from 'api/contentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Content } from 'models/content';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { contentActions, selectContentFilter } from '../contentSlice';
export interface ContentFormProps {
  initialValues?: Content;
  onClose: () => void;
}

const schema = yup.object().shape({
  header: yup.string().required('Vui lòng nhập tiêu đề'),
  img: yup.string().required('Vui lòng chèn thêm ảnh'),
  desc: yup.string().required('Vui lòng nhập mô tả'),
});

export default function ContentForm({ initialValues, onClose }: ContentFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectContentFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Content>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleContentFormSubmit = async (formValues: Content) => {
    if (isEdit) {
      await contentApi.update(formValues);
      toast.success('Cập nhật content thành công!');
    } else {
      await contentApi.add(formValues);
      toast.success('Thêm content thành công!');
    }
    dispatch(contentActions.fetchContentList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleContentFormSubmit)}>
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
