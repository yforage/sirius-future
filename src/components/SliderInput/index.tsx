import { css } from '@emotion/react';
import React, { useCallback, useState } from 'react';

type SliderInputProps = {
  title: string;
  range: string[];
  onChange: (value: string) => void;
};

const sliderInputCss = {
  container: css({
    fontWeight: '700',
  }),
  title: css({
    marginBottom: 20,
    fontSize: 20,
  }),
  inputContainer: css({
    position: 'relative',
    margin: '0 auto',
  }),
  input: css({
    width: '100%',
    height: 12,
    WebkitAppearance: 'none',
    appearance: 'none',
    background: '#FFD748',
    outline: 'none',
    borderRadius: 10,
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#104987',
      cursor: 'pointer',
      marginTop: -10,
    },
  }),
  datalist: css({
    width: '100%',
    position: 'absolute',
    top: -10,
    display: 'flex',
    justifyContent: 'space-between',
    '& > option': {
      fontSize: '12px',
    },
  }),
};

const SliderInput: React.FC<SliderInputProps> = ({
  title,
  range,
  onChange,
}) => {
  const [value, setValue] = useState('0');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange(range[Number(e.target.value)]);
    },
    [range, onChange],
  );

  return (
    <div css={sliderInputCss.container}>
      <div css={sliderInputCss.title}>{title}</div>
      <div
        css={sliderInputCss.inputContainer}
        style={{ maxWidth: range.length * 60 }}
      >
        <input
          css={sliderInputCss.input}
          type="range"
          value={value}
          step={1}
          min={0}
          max={range.length - 1}
          onChange={handleChange}
          list="marks"
        />
        <datalist id="marks" css={sliderInputCss.datalist}>
          {range.map((label, index) => (
            <option key={label} value={index} label={label} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default React.memo(SliderInput);
