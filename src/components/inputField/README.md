# Input Fields

React UI component for Input Fields i.e. input and textarea along with search input field.

---

## Props

The available `props`, you can work with:

---

### InputField Component

The simple and customisable option for input field.

| Props                   | Type                 | Description                                                                                                                             | Default |
| ----------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| name                    | string               | name of the input element                                                                                                               | -       |
| style _optional_        | style                | style object for styling input container.                                                                                               | -       |
| label _optional_        | string               | label for the input element                                                                                                             | -       |
| value _optional_        | string               | value for the input element                                                                                                             | -       |
| defaultValue _optional_ | string               | default value for the input element                                                                                                     | -       |
| placeholder _optional_  | string               | placeholder value for the input element                                                                                                 | -       |
| type _optional_         | string               | input type of the input element [`'number'`,`'text'`,`'email'`,`'date'`]                                                                | text    |
| className _optional_    | string               | takes classnames for the input container as string.                                                                                     | -       |
| labelStyle _optional_   | style                | style object for styling input label container.                                                                                         | -       |
| loaderStyle _optional_  | style                | style object for styling loader in the input.                                                                                           | -       |
| color _optional_        | string               | color options `['success', 'error', 'default', 'warning', 'info','successFill', 'errorFill', 'defaultFill', 'warningFill', 'infoFill']` | default |
| onChange _optional_     | function             | function to handle any change event in input.                                                                                           | -       |
| leftAdorn _optional_    | ReactNode            | contains adornment which is placed left to input                                                                                        | -       |
| leftStyle _optional_    | style                | style object for styling left adornment of the input.                                                                                   | -       |
| rightAdorn _optional_   | ReactNode            | contains adornment which is placed right to input                                                                                       | -       |
| rightStyle _optional_   | style                | style object for styling right adornment of the input.                                                                                  | -       |
| inputCount _optional_   | boolean              | state of the input to show input count                                                                                                  | false   |
| clear _optional_        | function             | function to handle clearing input on click.                                                                                             | -       |
| loading _optional_      | boolean              | state of the input to show loader                                                                                                       | false   |
| disabled _optional_     | boolean              | renders state of the input disabled                                                                                                     | false   |
| required _optional_     | boolean              | renders state of the input required                                                                                                     | false   |
| borderless _optional_   | boolean              | renders the input container borderless                                                                                                  | false   |
| max _optional_          | `string` or `number` | state of the input to show maximum input count                                                                                          | -       |
| min _optional_          | `string` or `number` | state of the input to show minimum input count                                                                                          | -       |

---

---

### TextArea Component

The simple and customisable text area component similar to InputField Component.

| Props                   | Type      | Description                                                                                                                             | Default |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| name                    | string    | name of the textArea element                                                                                                            | -       |
| style _optional_        | style     | style object for styling textArea container.                                                                                            | -       |
| label _optional_        | string    | label for the textArea element                                                                                                          | -       |
| value _optional_        | string    | value for the textArea element                                                                                                          | -       |
| defaultValue _optional_ | string    | default value for the textArea element                                                                                                  | -       |
| placeholder _optional_  | string    | placeholder value for the textArea element                                                                                              | -       |
| className _optional_    | string    | takes classnames for the textArea container as string.                                                                                  | -       |
| cols _optional_         | number    | number of columns in the textarea                                                                                                       | 40      |
| rows _optional_         | number    | number of rows in the textarea                                                                                                          | 5       |
| labelStyle _optional_   | style     | style object for styling textArea label container.                                                                                      | -       |
| loaderStyle _optional_  | style     | style object for styling loader in the textArea.                                                                                        | -       |
| color _optional_        | string    | color options `['success', 'error', 'default', 'warning', 'info','successFill', 'errorFill', 'defaultFill', 'warningFill', 'infoFill']` | default |
| leftAdorn _optional_    | ReactNode | contains adornment which is placed left to textArea                                                                                     | -       |
| leftStyle _optional_    | style     | style object for styling left adornment of the textArea.                                                                                | -       |
| rightAdorn _optional_   | ReactNode | contains adornment which is placed right to textArea                                                                                    | -       |
| rightStyle _optional_   | style     | style object for styling right adornment of the textArea.                                                                               | -       |
| onChange _optional_     | function  | function to handle any change event in textArea.                                                                                        | -       |
| inputCount _optional_   | boolean   | state of the textArea to show textArea count                                                                                            | false   |
| clear _optional_        | function  | function to handle clearing textArea on click.                                                                                          | -       |
| loading _optional_      | boolean   | state of the textArea to show loader                                                                                                    | false   |
| disabled _optional_     | boolean   | renders state of the textArea disabled                                                                                                  | false   |
| required _optional_     | boolean   | renders state of the textArea required                                                                                                  | false   |
| borderless _optional_   | boolean   | renders the textArea container borderless                                                                                               | false   |
| maxLength _optional_    | number    | state of the textArea to show maximum textArea count                                                                                    | -       |
| minLength _optional_    | number    | state of the textArea to show minimum textArea count                                                                                    | -       |

---

### SearchField Component

The simple and customisable search input component similar to InputField Component.

| Props                   | Type                 | Description                                                                                                                             | Default |
| ----------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| name                    | string               | name of the input element                                                                                                               | -       |
| style _optional_        | style                | style object for styling input container.                                                                                               | -       |
| label _optional_        | string               | label for the input element                                                                                                             | -       |
| value _optional_        | string               | value for the input element                                                                                                             | -       |
| defaultValue _optional_ | string               | default value for the input element                                                                                                     | -       |
| placeholder _optional_  | string               | placeholder value for the input element                                                                                                 | -       |
| type _optional_         | string               | input type of the input element [`'number'`,`'text'`,`'email'`,`'date'`]                                                                | text    |
| className _optional_    | string               | takes classnames for the input container as string.                                                                                     | -       |
| labelStyle _optional_   | style                | style object for styling input label container.                                                                                         | -       |
| loaderStyle _optional_  | style                | style object for styling loader in the input.                                                                                           | -       |
| color _optional_        | string               | color options `['success', 'error', 'default', 'warning', 'info','successFill', 'errorFill', 'defaultFill', 'warningFill', 'infoFill']` | default |
| onChange _optional_     | function             | function to handle any change event in input.                                                                                           | -       |
| right _optional_        | boolean              | dictates whether the search icon is to be placed right or left side of input                                                            | false   |
| leftStyle _optional_    | style                | style object for styling left adornment of the input.                                                                                   | -       |
| rightStyle _optional_   | style                | style object for styling right adornment of the input.                                                                                  | -       |
| inputCount _optional_   | boolean              | state of the input to show input count                                                                                                  | false   |
| clear _optional_        | function             | function to handle clearing input on click.                                                                                             | -       |
| loading _optional_      | boolean              | state of the input to show loader                                                                                                       | false   |
| disabled _optional_     | boolean              | renders state of the input disabled                                                                                                     | false   |
| borderless _optional_   | boolean              | renders the input container borderless                                                                                                  | false   |
| max _optional_          | `string` or `number` | state of the input to show maximum input count                                                                                          | -       |
| min _optional_          | `string` or `number` | state of the input to show minimum input count                                                                                          | -       |

---

## Implementation

```typescript
import { useRef, useState } from 'react';
import { InputField, SearchField, TextArea } from './components';

// import { AiFillDelete } from 'react-icons/ai';

const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const clearInputButton = () => {
    setInputValue('');
  };

  const clearTextButton = () => {
    setTextAreaValue('');
  };

  const clearSearchButton = () => {
    setSearchValue('');
  };

  return (
    <div>
      <div
        style={{
          margin: '5px 20px',
          padding: '5px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            height: '70vh',
            margin: 100,
          }}
        >
          <InputField
            style={{ width: '200px' }}
            label="Hello"
            name="hello"
            placeholder="say hello"
            onChange={(e: any) => setInputValue(e.target.value)}
            type="date"
            value={inputValue}
            ref={ref}
            min="7"
            max="10"
            color="infoFill"
            inputCount
            required
            // loading
            // disabled
            // borderless
            leftAdorn={'abc'}
            leftStyle={{ width: 40 }}
            // rightAdorn={'@gmail.com'}
            // rightStyle={{ color: 'red', width: '20px' }}
            // rightAdorn={<AiFillDelete />}
            clear={clearInputButton}
          />

          <TextArea
            name="textarea"
            placeholder="Ohh, gonna type an essay?"
            value={textAreaValue}
            onChange={(e: any) => setTextAreaValue(e.target.value)}
            minLength={20}
            maxLength={30}
            inputCount
            required
            // disabled
            // borderless
            clear={clearTextButton}
            loading
          />

          <SearchField
            type="text"
            name="search"
            placeholder="anything?"
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
            inputCount
            color="errorFill"
            // disabled
            // borderless
            // loading
            // right
            clear={clearSearchButton}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
```

![Inputs Collection](../../assets/images/input.png 'inputs Collection')

---
