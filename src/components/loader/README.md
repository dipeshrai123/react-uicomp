# Loader

React UI component for Loader which has simple design and fluid background styling, that supports the loading state for the children component.

---

## Props

The available `props`, you can work with:

| Props                  | Type      | Description                                                                                                 | Default             |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ------------------- |
| children _optional_    | ReactNode | can contain any element which is placed inside loader component.                                            | -                   |
| variant _optional_     | string    | select any one of `three` or `four` variant that represents the number of dots used for loader.             | four                |
| loading _optional_     | boolean   | determines whether the loader is visible or not, (this works only if there are children component).         | false               |
| style _optional_       | style     | style object for styling loader container.                                                                  | -                   |
| color _optional_       | string    | color for overall loader.                                                                                   | `#808080`           |
| size _optional_        | number    | size for the loader container i.e. `width` in `px`, which also adjusts the size of dots for overall loader. | 20                  |
| type _optional_        | string    | the type of loader animation `rotate` or `flow`.                                                            | rotate              |
| description _optional_ | string    | description tip for the loader.                                                                             | -                   |
| background _optional_  | object    | the object that dictates the background when loading is true.                                               | `backgroundDefault` |

**Note:**
`background` is of type:

```typescript
{
    backgroundColor?: string;
    blur?: number;
    opacity?: number;
    shade?: number;
}
```

`backgroundDefault` has value:

```typescript
{
    blur: 0,
    backgroundColor: color,
    opacity: 0.9,
    shade: 1,
}
```

---

## Implementation

```jsx
import { Button, Loader } from './components';

const ChildComponent = () => {
    return (
        <>
            <div
                style={{
                    borderRadius: '8px',
                    // background: 'gray',
                }}
            >
                children
            </div>
            <div>another child</div>
            <div>another child</div>
            <div>another child</div>
            <div>another child</div>
            <div>another child</div>
        </>
    );
};

const App = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '10% auto',
                gap: '30px',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '30px',
                }}
            >
                <Button loading />
                <Loader variant="three" />
                <Loader variant="three" color="#ff0000" size={20} />
                <Loader variant="three" type="flow" color="#ff0000" size={20} />
                <Loader size={20} />
                <Loader size={20} type="flow" color="#ff0000" />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '30px',
                }}
            >
                <Button loading />
                <Loader variant="three" loading>
                    <ChildComponent />
                </Loader>
                <Loader variant="three" color="#0000ff" size={20} loading>
                    <ChildComponent />
                </Loader>
                <Loader
                    variant="three"
                    type="flow"
                    color="#ff0000"
                    size={20}
                    style={{
                        borderRadius: '8px',
                    }}
                    loading
                >
                    <ChildComponent />
                </Loader>
                <Loader
                    size={20}
                    loading
                    description="Loading..."
                    style={{
                        borderRadius: '8px',
                    }}
                >
                    <ChildComponent />
                </Loader>
                <Loader size={20} type="flow" color="#ff0000" loading>
                    <ChildComponent />
                </Loader>
            </div>
        </div>
    );
};

export default App;
```

---

### Loader Demo

![loader](../../assets/images/basic_loader.gif 'loader')
