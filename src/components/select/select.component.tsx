import Select, { StylesConfig } from 'react-select';
import { InputContainer, Label } from './select.styled';
import { colors, variables } from '../../constants';
import { SelectFieldProps } from './select.type';

const colorOptions = {
  default: {
    hoverColor: colors.default.fillColor,
    fillColor: `transparent`,
    color: `${colors.default.color}`,
    active: `${colors.default.active}`,
  },
  primary: {
    hoverColor: colors.primary.fillColor,
    fillColor: 'transparent',
    color: `${colors.primary.color}`,
    active: `${colors.primary.active}`,
  },
  secondary: {
    hoverColor: colors.secondary.fillColor,
    fillColor: 'transparent',
    color: `${colors.secondary.color}`,
    active: `${colors.secondary.active}`,
  },
  info: {
    hoverColor: colors.info.fillColor,
    fillColor: 'transparent',
    color: `${colors.info.color}`,
    rippleColor: `${colors.info.rippleColor}`,
    active: `${colors.info.active}`,
  },
  success: {
    hoverColor: colors.success.fillColor,
    fillColor: 'transparent',
    color: `${colors.success.color}`,
    active: `${colors.success.active}`,
  },
  warning: {
    hoverColor: colors.warning.fillColor,
    fillColor: 'transparent',
    color: `${colors.warning.color}`,
    active: `${colors.warning.active}`,
  },
  error: {
    hoverColor: colors.error.fillColor,
    fillColor: 'transparent',
    color: `${colors.error.color}`,
    active: `${colors.error.active}`,
  },
  defaultFill: {
    hoverColor: colors.default.fillColor,
    fillColor: `${colors.default.fillColor}`,
    color: `${colors.default.color}`,
    active: `${colors.default.active}`,
  },
  primaryFill: {
    hoverColor: colors.primary.fillColor,
    fillColor: `${colors.primary.fillColor}`,
    color: `${colors.primary.color}`,
    active: `${colors.primary.active}`,
  },
  secondaryFill: {
    hoverColor: colors.secondary.fillColor,
    fillColor: `${colors.secondary.fillColor}`,
    color: `${colors.secondary.color}`,
    active: `${colors.secondary.active}`,
  },
  infoFill: {
    hoverColor: colors.info.fillColor,
    fillColor: `${colors.info.fillColor}`,
    color: `${colors.info.color}`,
    rippleColor: `${colors.info.rippleColor}`,
    active: `${colors.info.active}`,
  },
  successFill: {
    hoverColor: colors.success.fillColor,
    fillColor: `${colors.success.fillColor}`,
    color: `${colors.success.color}`,
    active: `${colors.success.active}`,
  },
  warningFill: {
    hoverColor: colors.warning.fillColor,
    fillColor: `${colors.warning.fillColor}`,
    color: `${colors.warning.color}`,
    active: `${colors.warning.active}`,
  },
  errorFill: {
    hoverColor: colors.error.fillColor,
    fillColor: `${colors.error.fillColor}`,
    color: `${colors.error.color}`,
    active: `red`,
  },
};

export const SelectField = ({
  name,
  // value,
  onInputChange,
  label,
  width = '600px',
  height = '40px',
  options,
  placeholder = 'Select...',
  fontStyle,
  containerStyle,
  labelStyle,
  controlStyle,
  optionStyle,
  inputStyle,
  placeholderStyle,
  singleValueStyle,
  multiValueStyle,
  multiValueLabelStyle,
  menuStyle,
  menuListStyle,
  isMulti,
  isLoading,
  color = 'infoFill',
}: SelectFieldProps) => {
  // type ControlType = typeof options;
  const basicStyles: StylesConfig = {
    container: (styles) => ({
      ...styles,
      ...containerStyle,
      height: isMulti ? 'auto' : height,
      width,
    }),
    control: (styles) => ({
      ...styles,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5,
      position: 'relative',
      ...fontStyle,
      backgroundColor: colorOptions[color].fillColor,
      border: `1px solid ` + colorOptions[color].color,
      '&:hover': {
        border: `1px solid ` + colorOptions[color].active,
      },
      '&:focus': {
        outline: 'none',
        border: `1px solid ` + colorOptions[color].active,
      },
      height: isMulti ? 'auto' : height,
      width,
      ...controlStyle,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        ...fontStyle,
        ...optionStyle,
      };
    },
    input: (styles) => ({
      ...styles,
      ...inputStyle,
      resize: 'none',
      width: '100%',
      outline: 'none',
      border: 'none',
      fontFamily: variables.avertaSemiBold,
      ...fontStyle,
    }),
    placeholder: (styles) => ({
      ...styles,
      ...placeholderStyle,
      ...fontStyle,
      color: variables.grey100,
      fontSize: variables.text,
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: colorOptions[color].fillColor,
      border: `1px solid ` + colorOptions[color].color,
      marginLeft: 4,
      ...fontStyle,
      ...menuStyle,
    }),
    menuList: (styles) => ({ ...styles, ...menuListStyle }),
    singleValue: (styles, { data, isDisabled }) => {
      const opacity = isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...styles,
        ...singleValueStyle,
        ...fontStyle,
        opacity,
        transition,
      };
    },
    multiValue: (styles, { data, isDisabled }) => {
      const opacity = isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...styles,
        ...multiValueStyle,
        ...fontStyle,
        opacity,
        transition,
      };
    },
    multiValueLabel: (styles, { data, isDisabled }) => {
      const opacity = isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...styles,
        ...multiValueLabelStyle,
        ...fontStyle,
        opacity,
        transition,
      };
    },
  };

  const handleChange = (e: any) => {
    if (isMulti) {
      const arrayBuffer: Array<any> = [];
      e.forEach((option: any, index: any) => arrayBuffer.push(option.value));
      console.log('Array buffers', arrayBuffer);
      onInputChange(arrayBuffer);
    } else onInputChange(e.value);
  };

  return (
    <InputContainer>
      {true && (
        <Label style={labelStyle}>
          <label>{label}</label>
        </Label>
      )}
      <Select
        name={name}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        styles={basicStyles}
        isLoading={isLoading}
        isMulti={isMulti}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary25: colorOptions[color].hoverColor,
            primary: colorOptions[color].color,
          },
        })}
      />
    </InputContainer>
  );
};
