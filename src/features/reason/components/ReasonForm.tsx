import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Reason } from 'models/reason';
import reasonApi from 'api/reasonApi';
import { reasonActions, selectReasonFilter } from '../reasonSlice';
export interface ReasonFormProps {
  initialValues?: Reason;
  onClose: () => void;
}

const schema = yup.object().shape({
  header: yup.string().required('Vui lòng nhập tiêu đề'),
  img: yup.string().required('Vui lòng chèn thêm ảnh'),
  desc: yup.string().required('Vui lòng nhập mô tả'),
});

export default function ReasonForm({ initialValues, onClose }: ReasonFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectReasonFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Reason>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleReasonFormSubmit = async (formValues: Reason) => {
    if (isEdit) {
      await reasonApi.update(formValues);
      toast.success('Cập nhật lý do thành công!');
    } else {
      await reasonApi.add(formValues);
      toast.success('Thêm lý do thành công!');
    }
    dispatch(reasonActions.fetchReasonList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleReasonFormSubmit)}>
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
