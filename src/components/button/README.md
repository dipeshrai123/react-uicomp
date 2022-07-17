# Button

React UI component for Button that provides simple yet elegant button of abundant varieties.

---

## Props

The available `props`, you can work with:

---

### Button Component

The simple and customisable option for the button.

| Props                  | Type      | Description                                                                                | Default                |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| title                  | string    | content of the button                                                                      | -                      |
| style _optional_       | style     | style object for styling button container.                                                 | -                      |
| children _optional_    | ReactNode | children component for button.                                                             | -                      |
| textStyle _optional_   | style     | style object for styling button text container.                                            | -                      |
| color _optional_       | string    | color options `['primary', 'secondary', 'success', 'error', 'default', 'warning', 'info']` | default                |
| variant _optional_     | string    | button variant options `['text', 'contained', 'outlined']`                                 | contained              |
| leftIcon _optional_    | ReactNode | contains Icon element which is placed left to button `title`.                              | -                      |
| rightIcon _optional_   | ReactNode | contains Icon element which is placed right to button `title`.                             | -                      |
| rippleColor _optional_ | string    | color to the ripple effect generated on click.                                             | based on `color` props |
| onClick _optional_     | function  | function to handle on click mouse event.                                                   | -                      |
| loading _optional_     | boolean   | state of the button to show loader                                                         | false                  |
| disabled _optional_    | boolean   | renders state of the button disabled                                                       | false                  |

---

### RippleButton Component

Buttom Component with Ripple Effect onClick.

-   Takes same props as Button Component but rippleColor works only in this component.

---

## Implementation

```jsx
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import { FcFullTrash } from 'react-icons/fc';
import { Button, RippleButton } from './components';

const App = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    // height: '600px',
                }}
            >
                <div>
                    <Button>default</Button>
                    <Button title="default" variant="contained" />
                    <Button title="default" variant="outlined" />
                    <Button
                        title="default"
                        variant="text"
                        leftIcon={<AiFillCodeSandboxCircle />}
                        rightIcon={<FcFullTrash />}
                    />
                </div>
                <div>
                    <RippleButton title="default" />
                    <RippleButton title="default" variant="contained" />
                    <RippleButton title="default" variant="outlined" />
                    <RippleButton title="default" variant="text" />
                </div>
                <div>
                    <Button title="primary" color="primary" />
                    <Button title="primary" color="primary" variant="contained" />
                    <Button title="primary" color="primary" variant="outlined" />
                    <Button title="primary" color="primary" variant="text" />
                </div>
                <div>
                    <RippleButton title="primary" color="primary" />
                    <RippleButton title="primary" color="primary" variant="contained" />
                    <RippleButton title="primary" color="primary" variant="outlined" />
                    <RippleButton title="primary" color="primary" variant="text" />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'space-between',
                    flexDirection: 'column',
                    // height: '600px',
                }}
            >
                <div>
                    <Button disabled loading title="default" />
                    <Button disabled loading title="default" variant="contained" />
                    <Button disabled loading title="default" variant="outlined" />
                    <Button disabled loading title="default" variant="text" />
                </div>
                <div>
                    <RippleButton loading title="default" />
                    <RippleButton loading title="default" variant="contained" />
                    <RippleButton loading title="default" variant="outlined" />
                    <RippleButton loading title="default" variant="text" />
                </div>
                <div>
                    <Button disabled loading title="primary" color="primary" />
                    <Button disabled loading title="primary" color="primary" variant="contained" />
                    <Button disabled loading title="primary" color="primary" variant="outlined" />
                    <Button disabled loading title="primary" color="primary" variant="text" />
                </div>
                <div>
                    <RippleButton loading title="primary" color="primary" />
                    <RippleButton loading title="primary" color="primary" variant="contained" />
                    <RippleButton loading title="primary" color="primary" variant="outlined" />
                    <RippleButton loading title="primary" color="primary" variant="text" />
                </div>
            </div>
        </div>
    );
};

export default App;
```

![Buttons Collection](../../assets/images/button_collection.gif 'Buttons Collection')

---
