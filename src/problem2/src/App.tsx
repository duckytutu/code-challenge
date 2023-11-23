import usePrices from '@/hooks/usePrices.tsx';
import CurrencySelector from '@/components/CurrencySelector.tsx';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SwapForm from '@/components/SwapForm.tsx';

const App = () => {
  return (
    <div className="max-w-full bg-[#282c34] px-4 text-center  selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center text-white">
        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
          Swap Form
        </p>
        <div className="mt-4 flex w-[500px] max-w-full flex-col gap-6 rounded-xl border p-4 text-gray-900">
          <SwapForm />
        </div>
      </header>
    </div>
  );
};

export default App;
