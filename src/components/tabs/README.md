# Tabs

Utility Component to convert given children `Pane` components into tabs.

---

## Props

The available `props`, you can work with:

| Props                  | Type                    | Description                                                  | Default |
| ---------------------- | ----------------------- | ------------------------------------------------------------ | ------- |
| children               | ReactNode               | Takes only `Pane` component as children.                     | -       |
| activeId _optional_    | string                  | Sets default `id` of tab pane to be active.                  | -       |
| onTabChange _optional_ | `({activeTabId})=>void` | Possesses current active tab `id` as its props or parameter. | -       |

---

## Components

1.  ### Tabs

    `Tabs` Component takes all the props from above and can take `Tabs.Pane` as its children.

2.  ### Tabs.Pane

    This component is used to provide the pane children component to be rendered for the `activeTabId`. This component takes following props:

    | Props    | Type      | Description                                                   | Default |
    | -------- | --------- | ------------------------------------------------------------- | ------- |
    | children | ReactNode | React Node which will be the menu item content.               | -       |
    | title    | ReactNode | content for distinct tab header item.                         | -       |
    | id       | string    | unique `id` attribute to distinguish each tabs and it's pane. | -       |

---

## Features

### `useTab` hook

-   You can easily activate a specific tab from any external component using `useTab` hook.
-   This provides you with an object consisting of a `handler` object and `activateTab` utility function.
-   `handler` object is to be spread upon `Tabs` component.
-   `activateTab` utility function takes `activeTabId` as argument to activate certain tab with the `id` to render its children in the pane.

## Implementation

```jsx
import { Tabs, useTab } from './components';

const App = () => {
    const { handler, activateTab } = useTab();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10% 0' }}>
                <Tabs
                    {...handler}
                    activeId="id5"
                    onTabChange={({ activeTabId }) => console.log('activeTabId: ', activeTabId)}
                >
                    <Tabs.Pane title="Tab 1" id="id1">
                        Pane 1
                    </Tabs.Pane>
                    <Tabs.Pane title={<button>Tab 2</button>} id="id2" defaultPane>
                        Pane 2
                    </Tabs.Pane>
                    <Tabs.Pane title="Tab 3" id="id3">
                        Pane 3
                    </Tabs.Pane>
                    <Tabs.Pane title="Tab 4" id="id4">
                        Pane 4
                    </Tabs.Pane>
                    <Tabs.Pane title="Tab 5" id="id5">
                        Pane 5
                    </Tabs.Pane>
                </Tabs>
            </div>
            <br />
            <br />
            <div>
                <button onClick={() => activateTab('id4')}>Activate Tab 4</button>
            </div>
        </>
    );
};

export default App;
```

---

### Tabs Demo

![Tabs Demo](../../assets/images/tabs.gif 'Tabs Demo')

---
