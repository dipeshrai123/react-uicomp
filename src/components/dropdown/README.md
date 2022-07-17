# Dropdown

Utility Component to convert any component into dropdown component, which also facilitates with a dropdown menu.

---

## Props

The available `props`, you can work with:

| Props                     | Type                                                                                                  | Description                                                               | Default        |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------- |
| children                  | ReactNode                                                                                             | React Node which will be the dropdown content.                            | -              |
| trigger _optional_        | ({ active }) => ReactNode                                                                             | Function which should return the element which will trigger the dropdown. | -              |
| triggerToggle _optional_  | boolean                                                                                               | Should toggle the dropdown if we click trigger element.                   | true           |
| triggerElement _optional_ | ReactNode                                                                                             | should render the element which will trigger the dropdown.                | -              |
| active _optional_         | boolean                                                                                               | Sets default state of dropdown, either it is active or not by default.    | false          |
| style _optional_          | style                                                                                                 | style object for styling dropdown container.                              | -              |
| isAnimated _optional_     | boolean                                                                                               | trigger to dictate animation for dropdown.                                | true           |
| animationType _optional_  | `"fade"` or `"ease"` or `"elastic"`                                                                   | Type of animation for dropdown.                                           | elastic        |
| placement _optional_      | `"bottomleft"` or `"bottommiddle"` or `"bottomright"` or `"topleft"` or `"topmiddle"` or `"topright"` | style object for styling dropdown container.                              | `"bottomleft"` |
| outDismiss _optional_     | boolean                                                                                               | Should dismiss dropdown if we click outside dropdown.                     | true           |
| inDismiss _optional_      | boolean                                                                                               | Should dismiss dropdown if we click on any content inside dropdown.       | false          |

**NOTES:**

- `trigger` props is given priority over `triggerElement` props, and only one props is to be passed as an actual trigger element for the dropdown.

---

## Components

1.  ### Dropdown

    `Dropdown` Component takes all the props from above and can take any children and itself acts as an HOC to render the children as a dropdown.

2.  ### Menu

    This is a wrapper component that provides the container for the content for the dropdown menu. This component takes basic styling props like `style`, `className` and a `children` props.

3.  ### MenuItem

    This component is used to set up a menu item that is supposed to be rendered within the `Menu` wrapper component. This component takes following props:

    | Props                 | Type              | Description                                                           | Default   |
    | --------------------- | ----------------- | --------------------------------------------------------------------- | --------- |
    | children              | ReactNode         | React Node which will be the menu item content.                       | -         |
    | style _optional_      | style             | style object for styling menu item container.                         | -         |
    | className _optional_  | string            | class names for styling menu item container.                          | -         |
    | title _optional_      | ReactNode         | content for menu item.                                                | -         |
    | icon _optional_       | ReactNode         | icon node that prepends the content of menu item.                     | -         |
    | danger _optional_     | boolean or string | color for specific menu items to be highlighted                       | `#ff0000` |
    | onClick _optional_    | `()=>void`        | onClick function that handles onClick event in any specific menu item | -         |
    | hoverColor _optional_ | string            | color for hover effects on menuItem                                   | `#f1f1f1` |

4.  ### MenuBreak
    A horizontal break for the `Menu` component that acts as a break in between `MenuItem` components. This takes `style` and `className` as styling props.

---

## Implementation

```jsx
import { Dropdown } from './components';
import { MdContentPaste, MdDelete, MdFileCopy, MdInfo } from 'react-icons/md';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10% 0',
        flexDirection: 'column',
      }}
    >
      <Dropdown
        active={true}
        // isAnimated={false}
        // animationType="fade"
        trigger={({ active }) => (
          <button
            style={{
              cursor: 'pointer',
              border: '2px solid gray',
              borderRadius: 6,
              padding: '8px 16px',
              fontWeight: 700,
              backgroundColor: active ? 'gray' : 'white',
            }}
          >
            Dropdown Menu
          </button>
        )}
        // triggerElement={<button style={{ cursor: 'pointer' }}>Dropdown</button>}
        triggerToggle
      >
        <Dropdown.Menu>
          <Dropdown.Item
            title="menu item 1"
            icon={<MdInfo />}
            onClick={() => console.log('ehllo')}
          />
          <Dropdown.Item icon={<MdContentPaste />}>menu item 2</Dropdown.Item>
          <Dropdown.Item icon={<MdFileCopy />}>menu item 3</Dropdown.Item>
          <Dropdown.Break />
          <Dropdown.Item icon={<MdDelete />} danger>
            menu item 4
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div>something</div>
      <div>something</div>
      <div>something</div>
      <div>something</div>
      <div>something</div>

      <Dropdown
        // active={true}
        // isAnimated={false}
        trigger={({ active }) => (
          <button
            style={{
              cursor: 'pointer',
              border: '2px solid gray',
              borderRadius: 6,
              padding: '8px 16px',
              fontWeight: 700,
              backgroundColor: active ? 'gray' : 'white',
            }}
          >
            Dropdown
          </button>
        )}
        // triggerElement={<button style={{ cursor: 'pointer' }}>Dropdown</button>}
        triggerToggle
      >
        dropdown content over here
      </Dropdown>
    </div>
  );
};

export default App;
```

---

### Dropdown Demo

![Dropdown Demo](../../assets/images/dropdown.gif 'Dropdown Demo')

---
