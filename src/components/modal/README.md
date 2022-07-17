# Modal

React UI component for Modal which provides easy use for creating extremely fluid animated modal.

---

## Props

The available `props`, you can work with:

| Props                          | Type      | Description                                                                                         | Default             |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------- | ------------------- |
| children                       | ReactNode | can contain any element which is placed inside modal component.                                     | -                   |
| active _optional_              | boolean   | determines whether the modal is visible or not.                                                     | false               |
| style _optional_               | style     | style object for styling modal card.                                                                | -                   |
| triggerElement _optional_      | ReactNode | any react element to trigger the modal                                                              | -                   |
| triggerToggle _optional_       | boolean   | should trigger opening and closing of modal on clicking `triggerElement`                            | false               |
| isAnimated _optional_          | boolean   | should animate or not while modal open or close.                                                    | false               |
| animationType _optional_       | string    | type of animation for modal `['bounce', 'ease', 'elastic', 'wooble']`                               | ease                |
| disableScroll _optional_       | boolean   | dictates the scrolling to be enabled or not when modal is visible                                   | false               |
| withPortal _optional_          | boolean   | determines the use of modal on portal                                                               | true                |
| onOutsideClick _optional_      | function  | function that is called to close the modal and also supports other custom actions                   | -                   |
| modalContainerStyle _optional_ | style     | style object for styling modal container (where overlay effect can be manipulated with background.) | -                   |
| containerStyle _optional_      | style     | style object for styling `triggerElement` container.                                                | -                   |
| size _optional_                | string    | varieties of sizes for modal `['full', 'xl', 'lg', 'md', 'sm', 'xs']`                               | md                  |
| width _optional_               | number    | determines width of the modal.                                                                      | dependent on `size` |
| height _optional_              | number    | determines height of the modal.                                                                     | auto                |
| overlay _optional_             | boolean   | depicts the visibility of overlay effect.                                                           | true                |
| overlayDark _optional_         | boolean   | trigges the dark mode overlay effect.                                                               | true                |
| overlayBlur _optional_         | number    | determines intensity of overlay of the modal.                                                       | 5                   |

---

## Components

### Modal

The wrapper component for whole modal.

-   Takes all the props mentioned above.

### ModalHeader

The child component for Modal Component which is the header of the modal.

-   Takes all the props mentioned below.

| Props                | Type      | Description                                                      | Default |
| -------------------- | --------- | ---------------------------------------------------------------- | ------- |
| children _optional_  | ReactNode | can contain any element which is placed inside header component. | -       |
| style _optional_     | style     | styling CSS properties for header component.                     | -       |
| className _optional_ | string    | CSS classnames for header component.                             | -       |
| closeIcon _optional_ | boolean   | can display or hide closeIcon to closeModal in header component. | true    |

### ModalBody

The child component for Modal Component that wraps the children for the modal.

-   Takes all the props mentioned below.

| Props                | Type      | Description                                                    | Default |
| -------------------- | --------- | -------------------------------------------------------------- | ------- |
| children _optional_  | ReactNode | can contain any element which is placed inside body component. | -       |
| style _optional_     | style     | styling CSS properties for body component.                     | -       |
| className _optional_ | string    | CSS classnames for body component.                             | -       |
| align _optional_     | string    | determines the alignment of contents in body component.        | left    |

### ModalFooter

The child component for ModalComponent that provides the wrapper for footer for buttons and more for modal.

-   Takes all the props mentioned above for `ModalBody`.

---

## Confirmation Modal

### ConfirmationModal

The wrapper component for whole modal that is specifically of confirmation type.

-   Provides the facility to automatically assign header and footer.
-   You can manually add all the components for modal i.e. `ModalHeader`, `ModalBody` and `ModalFooter`.

-   Takes all the props mentioned for `Modal` and additionally, takes two `buttonProps`, a `headerTitle` and `icon`, here, `icon` props can help to provide custom icon and enable or disable predefined icon for confirmation modal:

1. onOk: buttonProps
2. onCancel: buttonProps
3. headerTitle: string
4. icon: ReactNode | boolean

**Note:**
`buttonProps` is of type:

```typescript
{
    title?: string;
    style?: React.CSSProperties;
    color?: string;
    action?: (event: MouseEvent) => void;
    closeModalOnClick?: boolean;
}
```

---

## Implementation

### Modal With React Portal

**Note:**

-   `withPortal` props by default set to **true**, hence the Modal are rendered on `react-portal-wrapper` element, outside `root` element.

```jsx
import { FaCheck } from 'react-icons/fa';
import { Modal, ConfirmationModal, ModalHeader, ModalBody, ModalFooter, Button } from './components';

const App = () => {
    const handleOk = () => {
        console.log('Ok clicked');
    };

    return (
        <div>
            <Modal
                triggerElement={<button>Trigger</button>}
                triggerToggle
                size="xl"
                overlay={false}
                overlayBlur={3}
                overlayDark={false}
                // width={1000}
                // height={500}
            >
                <ModalHeader>Modal Header</ModalHeader>
                <ModalBody align="right">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus mauris est, consequat semper
                        nulla sapien donec accumsan. Quam in curabitur sed nunc lectus morbi ipsum id dui. Cursus
                        faucibus posuere nullam et turpis urna feugiat pretium. Placerat platea consectetur donec sed
                        quis a id quisque.
                    </div>
                    <br />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus mauris est, consequat semper
                        nulla sapien donec accumsan. Quam in curabitur sed nunc lectus morbi ipsum id dui. Cursus
                        faucibus posuere nullam et turpis urna feugiat pretium. Placerat platea consectetur donec sed
                        quis a id quisque.
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" title="Secondary" />
                    <Button color="primary" title="Primary" />
                </ModalFooter>
            </Modal>
            <ConfirmationModal
                // icon={<FaCheck />}
                headerTitle="headerTitle"
                triggerElement={<button>Confirm</button>}
                triggerToggle
                onOk={{
                    title: 'Submit',
                    action: handleOk,
                    // color: 'green',
                }}
                size="xl"
            >
                modalbody
                <div>This is div</div>
                <ModalBody>This is modal body</ModalBody>
                <ModalBody>This is modal body</ModalBody>
                <ModalBody>This is modal body</ModalBody>
            </ConfirmationModal>
        </div>
    );
};

export default App;
```

---

### Modal Demo

![Modal](../../assets/images/basic_modal.png 'Modal')

### Confirmation Modal Demo

![Confirm Type Modal](../../assets/images/confirmation_modal.png 'Confirm Type Modal')
