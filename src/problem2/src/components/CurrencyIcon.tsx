import { memo, useEffect, useState } from 'react';
import defaultIcon from '../assets/images/logo.svg';

const CurrencyIcon = ({ name }: { name: string }) => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    import(`../assets/tokenIcons/${name}.svg`).then((icon) =>
      setIcon(icon.default),
    );
  }, [name]); // eslint-disable-line

  return <img alt={name} src={icon || defaultIcon} width={20} height={20} />;
};

export default memo(CurrencyIcon);
