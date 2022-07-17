# Select Component

React UI component for Modal which provides easy use for creating extremely fluid animated modal.

---

## Props

The available `props`, you can work with:

| Props                     | Type      | Description                                                                | Default |
| ------------------------- | --------- | -------------------------------------------------------------------------- | ------- |
| type _optional_           | string    | type of modal `['confirm', 'basic', 'info']`.                              | basic   |
| children                  | ReactNode | can contain any element which is placed inside modal component.            | -       |
| visible                   | boolean   | determines whether the modal is visible or not.                            | false   |
| onOutsideClick _optional_ | function  | function that is called when clicked outside of modal if passed.           | 5000    |
| style _optional_          | style     | style object for styling modal card.                                       | -       |
| isAnimated _optional_     | boolean   | should animate or not while modal open or close.                           | false   |
| animationType _optional_  | string    | type of animation for modal `['bounce', 'ease', 'elastic', 'wooble']`      | ease    |
| disableScroll _optional_  | boolean   | dictates the scrolling to be enabled or not when modal is visible          | false   |
| headerIcon _optional_     | ReactNode | contains Icon element which is placed inside modal component header.       | -       |
| header _optional_         | string    | content of the header                                                      | -       |
| closeIcon _optional_      | function  | function that is called to activate `closeIcon` and to close the modal     | -       |
| content _optional_        | string    | content of the body                                                        | -       |
| contentAlign _optional_   | string    | type of content alignment for modal `['right', 'left', 'center']`          | left    |
| footer _optional_         | string    | content of the footer                                                      | -       |
| footerIcon _optional_     | ReactNode | contains Icon element which is placed inside modal component footer.       | -       |
| button _optional_         | string    | pass a string to show that string in a button                              | -       |
| contentAlign _optional_   | string    | type of button alignment for modal `['right', 'left', 'center']`           | left    |
| onOk _optional_           | function  | function dependent on type `['confirm', 'info']` and to handle _OK_ button | -       |
| onCancel _optional_       | function  | function dependent on type `'confirm'` and to handle _Cancel_ button       | -       |

---

## Implementation

---

### `'basic'` type

The simple and customisable type option for the modal component.

```typescript
import React, { useState } from 'react';

import { Modal } from './components';

import { FcHeadset } from 'react-icons/fc';

const App = () => {
    // visible state is to be compulsarily initialised this way
    const [visible, setVisible] = useState(false);
    const [buttonValue, setButtonValue] = useState('UnClicked');

    return (
        <div>
            <button
                onClick={(e) => {
                    setVisible((prev) => !prev);
                }}
            >
                TOGGLE
            </button>
            <Modal
                visible={visible}
                headerIcon={<FcHeadset />}
                header="Modal Header"
                onOutsideClick={() => setVisible(false)}
                closeIcon={() => setVisible(false)}
                content="This is Modal Content!"
                contentAlign="right"
                footer="Footer Note"
                button={buttonValue}
                buttonAlign="left"
                buttonClick={() => setButtonValue('Clicked')}
                footerIcon={<FcHeadset />}
            >
                This is Content from Children Component!
            </Modal>
        </div>
    );
};

export default App;
```

![Basic Type Modal](../../assets/images/basic_modal.png 'Basic Type Modal')

---

### `'confirm'` type

The confirmation type of modal component which gives you two buttons _Ok_ and _Cancel_.

**Note:**

-   More props: `header, headerIcon, children, content, contentAlign, buttonAlign, footer, footerIcon` are still supported.

```typescript
import React, { useState } from 'react';

import { Modal } from './components';

const App = () => {
    const [visible, setVisible] = useState(false);

    const handleOk = () => {
        setVisible(false);
        console.log('Ok clicked');
    };

    const handleCancel = () => {
        setVisible(false);
        console.log('Cancel clicked');
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    setVisible((prev) => !prev);
                }}
            >
                TOGGLE
            </button>
            <Modal visible={visible} type="confirm" onOk={handleOk} onCancel={handleCancel} isAnimated={true}>
                This is Content from Children Component!
            </Modal>
        </div>
    );
};

export default App;
```

![Confirm Type Modal](../../assets/images/confirmation_modal.png 'Confirm Type Modal')

---

### `'info'` type

The information type of modal component which gives you only one button _Ok_.

**Note:**

-   More props: `header, headerIcon, children, content, contentAlign, buttonAlign, footer, footerIcon` are still supported.

```typescript
import React, { useState } from 'react';

import { Modal } from './components';

const App = () => {
    const [visible, setVisible] = useState(false);

    const handleOk = () => {
        setVisible(false);
        console.log('Ok clicked');
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    setVisible((prev) => !prev);
                }}
            >
                TOGGLE
            </button>
            <Modal visible={visible} type="info" onOk={handleOk} isAnimated={true} animationType="ease">
                This is Content from Children Component!
            </Modal>
        </div>
    );
};

export default App;
```

![Info Type Modal](../../assets/images/info_modal.png 'Info Type Modal')

---
