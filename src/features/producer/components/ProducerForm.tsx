import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Producer } from 'models/producer';
import producerApi from 'api/producerApi';
import { producerActions, selectProducerFilter } from '../producerSlice';
export interface ProducerFormProps {
  initialValues?: Producer;
  onClose: () => void;
}

const schema = yup.object().shape({
  header: yup.string().required('Vui lòng nhập tiêu đề'),
  img: yup.string().required('Vui lòng chèn thêm ảnh'),
  desc: yup.string().required('Vui lòng nhập mô tả'),
});

export default function ProducerForm({ initialValues, onClose }: ProducerFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectProducerFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Producer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleProducerFormSubmit = async (formValues: Producer) => {
    if (isEdit) {
      await producerApi.update(formValues);
      toast.success('Cập nhật Producer thành công!');
    } else {
      await producerApi.add(formValues);
      toast.success('Thêm Producer thành công!');
    }
    dispatch(producerActions.fetchProducerList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleProducerFormSubmit)}>
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
