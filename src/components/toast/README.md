# Toast

React UI component that allows you to simply add toast (snack) for your notifications.

---

## Props

The available `props`, you can work with:

| Props                     | Type    | Description                                              | Default |
| ------------------------- | ------- | -------------------------------------------------------- | ------- |
| message _optional_        | string  | message you want to toast.                               | -       |
| type _optional_           | string  | type of toast `['success', 'info', 'warning', 'error']`. | -       |
| timeout _optional_        | number  | number of milliseconds for a notification to dismiss.    | 5000    |
| style _optional_          | style   | style object for styling notification card.              | -       |
| closeIcon _optional_      | boolean | dictates the visibility of close icon                    | true    |
| dismissOnClick _optional_ | boolean | closes the toast on mouse click                          | true    |
| dark _optional_           | boolean | enables dark mode                                        | false   |
| noHeader _optional_       | boolean | disables the header component visibility                 | false   |

---

## useToast()

React UI Toast Component provides `useToast()` hook to handle toast notification. `useToast()` hook returns object with following keys:

```typescript
const { handler, toast } = useToast();
```

| Props   | Type   | Description                                                                           |
| ------- | ------ | ------------------------------------------------------------------------------------- |
| handler | object | should be spread on the Toast Component, which handles all the children toasts        |
| toast   | object | invokes functions as `toast.success(), toast.info(), toast.warning(), toast.error()`. |

### toast

This object takes any specific funtion of the toast type suggested above, which accepts two arguments: `message` and `header`.
An object that invokes functions of respective type as:

```jsx
toast.success(message?: string, header?: string);

//can be invoked like this
toast.success();
// here the toast is generated with default header `Success!`

//also takes message of type string
toast.success('hey, success!');

//and additionally takes header of type string
toast.success('hey, success!', 'Success Custom Header');
```

---

## Implementation

```jsx
import React from 'react';
//need to import Toast component along with useToast hook and ToastContainer as wrapper
import { Toast, useToast, ToastContainer } from './components/toast';

export default function App() {
    //destructuring useToast hook
    const { handler, toast } = useToast();

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* invoking the required type of toast function*/}
                <button style={{ padding: '5px', margin: '5px' }} onClick={() => toast.success('hello')}>
                    Success
                </button>
                <button style={{ padding: '5px', margin: '5px' }} onClick={() => toast.error('oops')}>
                    Error
                </button>
                <button
                    style={{ padding: '5px', margin: '5px' }}
                    onClick={() =>
                        toast.warning(
                            `watchout serious warning very long message here... watchout serious warning very long message here... watchout serious warning very long message here... watchout serious warning very long message here... watchout serious warning very long message here...`
                        )
                    }
                >
                    Warning
                </button>
                <button
                    style={{ padding: '5px', margin: '5px' }}
                    onClick={() =>
                        toast.info(
                            'good toast this is some good toast hope this will change according to the height of the message on this container this is a bit congested'
                        )
                    }
                >
                    Info
                </button>
            </div>

            <ToastContainer>
                {/* passing props accordingly*/}
                <Toast {...handler} />
            </ToastContainer>
        </div>
    );
}
```

### Light Mode:

![Light Mode Toast](../../assets/images/light_toast.png 'Light Mode Toast')

### Dark Mode:

![Dark Mode Toast](../../assets/images/dark_toast.png 'Dark Mode Toast')
