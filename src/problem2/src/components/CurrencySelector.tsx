import { memo } from 'react';
import CurrencyIcon from '@/components/CurrencyIcon.tsx';
import { Box, MenuItem, Select } from '@mui/material';

const CurrencySelector = ({ currencies, placeholder, ...rest }: any) => {
  return (
    <>
      <Select
        size="small"
        sx={{
          border: 'none',
        }}
        placeholder="Select currency"
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }
          return (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <CurrencyIcon name={selected} />
              &nbsp;&nbsp;
              <span>{selected}</span>
            </Box>
          );
        }}
        {...rest}
      >
        {currencies.map((name: string) => (
          <MenuItem key={name} value={name}>
            <CurrencyIcon name={name} />
            &nbsp;&nbsp;
            <span>{name}</span>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default memo(CurrencySelector);
