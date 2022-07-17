import React, { useState, useMemo, useEffect } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSearch,
} from 'react-icons/ai';
import { TiBackspace } from 'react-icons/ti';
// import { GiBeveledStar } from 'react-icons/gi';
import { FaStarOfLife } from 'react-icons/fa';

import {
  InputContainer,
  Label,
  Box,
  LeftAdornment,
  RightAdornment,
  EndAdornment,
  InputLength,
  RequiredSign,
  Loader,
} from './inputField.styled';
import {
  InputFieldProps,
  SearchFieldProps,
  TextAreaProps,
} from './inputField.type';

import {
  makeAnimatedComponent,
  useAnimatedValue,
  AnimationConfigUtils,
  interpolate,
} from 'react-ui-animate';

const InputLengthAnimated = makeAnimatedComponent(InputLength);
const BoxAnimated = makeAnimatedComponent(Box);
const RequiredSignAnimated = makeAnimatedComponent(RequiredSign);

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    let {
      label,
      labelStyle,
      loaderStyle,
      value,
      name,
      defaultValue,
      placeholder,
      style,
      onChange,
      className,
      type = 'text',
      disabled,
      leftAdorn,
      rightAdorn,
      inputCount,
      loading,
      leftStyle,
      rightStyle,
      borderless,
      color = 'default',
      min = '0',
      max,
      clear,
      required,
      ...rest
    } = props;

    const [inputLength, setInputLength] = useState(0);
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    const translateX = useAnimatedValue(0, {
      ...AnimationConfigUtils.WOOBLE,
    });
    const translateY = useAnimatedValue(1, {
      ...AnimationConfigUtils.BOUNCE,
    });

    const [border, setBorder] = useState('');

    const lengths = useMemo(() => {
      if (typeof min === 'string' && typeof max === 'string') {
        return {
          minLength: +min,
          maxLength: +max,
        };
      }
    }, [min, max]);

    //* checks input length with respect to maxlength
    useEffect(() => {
      const lengthss = value!.length | 0;
      setInputLength(lengthss);
      inputLength === lengths?.maxLength && (translateX.value = 4);

      inputLength !== 0 ? setBorder('') : (translateY.value = -4);
      return () => {
        translateX.value = 0;
        translateY.value = 1;
      };
    }, [
      border,
      inputLength,
      lengths?.maxLength,
      lengths?.minLength,
      translateX,
      translateY,
      value,
    ]);

    const isPassword = (e: any) => {
      e.preventDefault();
      if (inputType === 'password') {
        setInputType('text');
        setShowPassword(true);
      } else if (inputType === 'text') {
        setInputType('password');
        setShowPassword(false);
      }
    };

    return (
      <InputContainer>
        {label && (
          <Label style={labelStyle}>
            <label>{label}</label>
          </Label>
        )}
        <BoxAnimated
          style={{
            border: `${
              borderless
                ? 'none'
                : `${
                    (disabled && `1px solid #c1c1c1`) ||
                    (required && `${border}`)
                  }`
            }`,
            color: `${(loading || disabled) && `1px solid #c1c1c1`}`,
            ...style,
          }}
          className={className}
          onBlur={() => {
            if (inputLength === 0) {
              setBorder('1px solid #ff0000');
            }
          }}
          color={color}
        >
          {leftAdorn && (
            <LeftAdornment style={leftStyle}>{leftAdorn}</LeftAdornment>
          )}
          {required && (
            <RequiredSignAnimated
              style={{
                translateY: translateY.value,
                color: interpolate(
                  translateY.value,
                  [-4, 1],
                  ['#ff0000', '#a1a1a1']
                ),
              }}
            >
              <FaStarOfLife size={7} />
            </RequiredSignAnimated>
          )}
          <input
            type={inputType}
            ref={ref}
            name={name}
            defaultValue={defaultValue}
            onChange={(e: any) => {
              onChange(e);
            }}
            style={{ cursor: `${disabled ? `not-allowed` : ``}` }}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            min={min}
            max={max}
            minLength={lengths?.minLength}
            maxLength={lengths?.maxLength}
            required={required}
            {...rest}
          />
          {rightAdorn && (
            <RightAdornment style={rightStyle}>{rightAdorn}</RightAdornment>
          )}
          {type === 'password' && (
            <EndAdornment
              onClick={(e: any) => {
                isPassword(e);
              }}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </EndAdornment>
          )}
          {clear ? (
            <EndAdornment>
              {loading ? (
                <Loader style={loaderStyle} />
              ) : (
                <TiBackspace onClick={clear} />
              )}
            </EndAdornment>
          ) : (
            loading && (
              <EndAdornment>
                <Loader style={loaderStyle} />
              </EndAdornment>
            )
          )}
          {inputCount && (
            <InputLengthAnimated
              style={{
                translateX: translateX.value,
                color: interpolate(
                  translateX.value,
                  [0, 4],
                  ['#717171', '#ff0000']
                ),
              }}
            >
              {inputLength}
              {max && <> / {max}</>}
            </InputLengthAnimated>
          )}
        </BoxAnimated>
      </InputContainer>
    );
  }
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      name,
      label,
      labelStyle,
      loaderStyle,
      defaultValue,
      placeholder,
      style,
      onChange,
      className,
      value,
      required,
      minLength,
      maxLength,
      borderless,
      disabled,
      inputCount,
      loading,
      cols = 40,
      rows = 5,
      color = 'default',
      clear,
      ...rest
    } = props;

    const [inputLength, setInputLength] = useState(0);

    const translateX = useAnimatedValue(0, {
      ...AnimationConfigUtils.WOOBLE,
    });
    const translateY = useAnimatedValue(0, {
      ...AnimationConfigUtils.BOUNCE,
    });

    const [border, setBorder] = useState('');

    //* checks input length with respect to maxlength
    useEffect(() => {
      const lengths = value!.length | 0;
      setInputLength(lengths);
      inputLength === maxLength && (translateX.value = 4);

      inputLength !== 0 ? setBorder('') : (translateY.value = -4);
      return () => {
        translateX.value = 0;
        translateY.value = 0;
      };
    }, [border, inputLength, maxLength, translateX, translateY, value]);

    return (
      <InputContainer>
        {label && (
          <Label style={labelStyle}>
            <label>{label}</label>
          </Label>
        )}
        <BoxAnimated
          style={{
            border: `${
              borderless
                ? 'none'
                : `${
                    (disabled && `1px solid #c1c1c1`) ||
                    (required && `${border}`)
                  }`
            }`,
            color: `${(loading || disabled) && `1px solid #c1c1c1`}`,
            ...style,
          }}
          className={className}
          onBlur={() => {
            if (inputLength === 0) {
              setBorder('1px solid #ff0000');
            }
          }}
          color={color}
        >
          {required && (
            <RequiredSignAnimated
              style={{
                translateY: translateY.value,
                color: interpolate(
                  translateY.value,
                  [-4, 0],
                  ['#ff0000', '#818181']
                ),
              }}
            >
              <FaStarOfLife size={7} />
            </RequiredSignAnimated>
          )}
          <textarea
            name={name}
            value={value}
            ref={ref}
            cols={cols}
            rows={rows}
            defaultValue={defaultValue}
            onChange={(e: any) => {
              onChange(e);
            }}
            style={{ cursor: `${disabled ? `not-allowed` : ``}` }}
            placeholder={placeholder}
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
            {...rest}
          />
          {clear ? (
            <EndAdornment
              style={{ position: 'absolute', top: '5px', right: '5px' }}
            >
              {loading ? (
                <Loader style={loaderStyle} />
              ) : (
                <TiBackspace onClick={clear} />
              )}
            </EndAdornment>
          ) : (
            loading && (
              <EndAdornment
                style={{ position: 'absolute', top: '5px', right: '5px' }}
              >
                <Loader style={loaderStyle} />
              </EndAdornment>
            )
          )}
          {inputCount && (
            <InputLengthAnimated
              style={{
                fontSize: '10px',
                translateX: translateX.value,
                color: interpolate(
                  translateX.value,
                  [0, 4],
                  ['#818181', '#ff0000']
                ),
              }}
            >
              {inputLength}
              {maxLength && <> / {maxLength}</>}
            </InputLengthAnimated>
          )}
        </BoxAnimated>
      </InputContainer>
    );
  }
);

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    let {
      label,

      labelStyle,
      loaderStyle,
      value,
      name,
      defaultValue,
      placeholder,
      style,
      onChange,
      className,
      type = 'text',
      disabled,
      right,
      inputCount,
      loading,
      leftStyle,
      rightStyle,
      borderless,
      min,
      max,
      color = 'default',
      clear,
      ...rest
    } = props;

    const [inputLength, setInputLength] = useState(0);

    const translateX = useAnimatedValue(0, {
      ...AnimationConfigUtils.WOOBLE,
    });
    const translateY = useAnimatedValue(1, {
      ...AnimationConfigUtils.BOUNCE,
    });

    const lengths = useMemo(() => {
      if (typeof min === 'string' && typeof max === 'string') {
        return {
          minLength: +min,
          maxLength: +max,
        };
      }
    }, [min, max]);

    //* checks input length with respect to maxlength
    useEffect(() => {
      const lengthss = value!.length | 0;
      setInputLength(lengthss);
      inputLength === lengths?.maxLength && (translateX.value = 4);

      return () => {
        translateX.value = 0;
      };
    }, [inputLength, lengths?.maxLength, translateX, translateY, value]);

    return (
      <InputContainer>
        {label && (
          <Label style={labelStyle}>
            <label>{label}</label>
          </Label>
        )}
        <BoxAnimated
          style={{
            border: `${
              borderless ? 'none' : `${disabled && `1px solid #c1c1c1`}`
            }`,
            color: `${(loading || disabled) && `1px solid #c1c1c1`}`,
            ...style,
          }}
          className={className}
          color={color ? color : 'default'}
        >
          {!right && (
            <LeftAdornment
              style={{ ...leftStyle, width: 40, aspectRatio: '1/1' }}
            >
              {loading ? <Loader style={loaderStyle} /> : <AiOutlineSearch />}
            </LeftAdornment>
          )}

          <input
            type={type}
            ref={ref}
            name={name}
            defaultValue={defaultValue}
            onChange={(e: any) => {
              onChange(e);
            }}
            style={{ cursor: `${disabled ? `not-allowed` : ``}` }}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            min={min}
            max={max}
            minLength={lengths?.minLength}
            maxLength={lengths?.maxLength}
            {...rest}
          />
          {right && (
            <RightAdornment
              style={{ ...rightStyle, width: 40, aspectRatio: '1/1' }}
            >
              {loading ? <Loader style={loaderStyle} /> : <AiOutlineSearch />}
            </RightAdornment>
          )}

          {clear && (
            <EndAdornment>
              <TiBackspace onClick={clear} />
            </EndAdornment>
          )}
          {inputCount && (
            <InputLengthAnimated
              style={{
                translateX: translateX.value,
                color: interpolate(
                  translateX.value,
                  [0, 4],
                  ['#717171', '#ff0000']
                ),
              }}
            >
              {inputLength}
              {max && <> / {max}</>}
            </InputLengthAnimated>
          )}
        </BoxAnimated>
      </InputContainer>
    );
  }
);
