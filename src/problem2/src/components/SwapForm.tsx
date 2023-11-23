import { FormControl, FormHelperText, TextField } from '@mui/material';
import CurrencySelector from '@/components/CurrencySelector.tsx';
import { memo } from 'react';
import usePrices from '@/hooks/usePrices.tsx';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  pay: yup.object({
    value: yup.number().min(0, 'Minimum input is 0'),
    currency: yup.string().required(),
  }),
  receive: yup.object({
    value: yup.number().min(0, 'Minimum input is 0  '),
    currency: yup.string().required(),
  }),
});
const SwapForm = () => {
  const { currencyList, getPrice } = usePrices();

  const formik = useFormik({
    initialValues: {
      pay: {
        value: 0,
        currency: 'BLUR',
      },
      receive: {
        value: 0,
        currency: 'USD',
      },
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handlePayChange = (event: any) => {
    const { name, value } = event.target;
    const currency = formik.values.pay.currency;
    const payValue = getPrice(currency) * value;
    const receiveValue = payValue / getPrice(formik.values.receive.currency);
    formik.setFieldValue(name, value);
    formik.setFieldValue('receive.value', receiveValue);
  };

  const handleReceiveChange = (event: any) => {
    const { name, value } = event.target;
    const currency = formik.values.receive.currency;
    const receiveValue = getPrice(currency) * value;
    const payValue = receiveValue / getPrice(formik.values.pay.currency);
    formik.setFieldValue(name, value);
    formik.setFieldValue('pay.value', payValue);
  };

  const handleSwitch = () => {
    const temp = { ...formik.values.pay };
    formik.setFieldValue('pay', formik.values.receive);
    formik.setFieldValue('receive', temp);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2 rounded-xl bg-gray-100 p-4">
        <div>You pay</div>
        <div className="flex w-full flex-wrap-reverse justify-between">
          <FormControl>
            <TextField
              size="small"
              placeholder="Input pay money"
              inputProps={{ type: 'number' }}
              name="pay.value"
              value={formik.values.pay.value}
              onChange={handlePayChange}
            />
            {formik.errors.pay?.value ? (
              <FormHelperText sx={{ color: 'red' }}>
                {formik.errors.pay.value}
              </FormHelperText>
            ) : null}
          </FormControl>
          <CurrencySelector
            size="small"
            placeholder="Choose currency"
            currencies={currencyList}
            name="pay.currency"
            value={formik.values.pay.currency}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handleSwitch}
          className="rounded bg-blue-400 px-3 py-2 text-white"
        >
          Switch
        </button>
      </div>
      <div className="flex flex-col items-start gap-2 rounded-xl bg-gray-100 p-4">
        <div>You receive</div>
        <div className="flex w-full flex-wrap-reverse justify-between">
          <FormControl>
            <TextField
              size="small"
              placeholder="Input pay money"
              inputProps={{ type: 'number' }}
              name="receive.value"
              value={formik.values.receive.value}
              onChange={handleReceiveChange}
            />
            {formik.errors.receive?.value ? (
              <FormHelperText sx={{ color: 'red' }}>
                {formik.errors.receive.value}
              </FormHelperText>
            ) : null}
          </FormControl>

          <CurrencySelector
            size="small"
            placeholder="Choose currency"
            currencies={currencyList}
            name="receive.currency"
            value={formik.values.receive.currency}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          className="mt-3 w-full rounded-xl bg-pink-400 p-6 font-bold uppercase"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default memo(SwapForm);
