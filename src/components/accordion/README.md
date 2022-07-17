# Accordion

React UI component for displaying `accordion-items`.
Here, only one item can be displayed at a time.

---

## Props

The available `props`, you can work with:

| Props                  | Type             | Description                                                    | Default |
| ---------------------- | ---------------- | -------------------------------------------------------------- | ------- |
| children               | ReactNode        | can contain any element which is placed inside each component. | -       |
| style _optional_       | style            | style object for styling collapse container.                   | -       |
| iconVisible _optional_ | boolean          | sets the visibility of icon along side header.                 | true    |
| height _optional_      | number           | global height for each item list.                              | 200     |
| accordionList          | Array of Objects | array of list of items to be displayed on `accordion`.         | -       |

### accordionList

It is an array of objects, with keys: `header`, `content`, `clicked` and `itemHeight`.
Here, `clicked` and `itemHeight` are optional.

However, you can set `clicked` to _true_ to display the item as default.

```typescript
const accordionList = [
    {
        header: 'String',
        itemHeight: 200,
        content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique
                beatae consequuntur.`,
        clicked: true,
    },
];
```

---

## Implementation

Multiple instances based on `accordionList` is created.

**Note:**

-   Prop: `accordionList` is required.

```typescript
import { Accordion } from './components';
import { IoIosArrowForward } from 'react-icons/io';

const App = () => {
    const accordionList = [
        {
            header: 'String',
            itemHeight: 200,
            content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique
                beatae consequuntur.`,
            clicked: true,
        },
        {
            header: 'Number',
            itemHeight: 100,
            content: 12345,
        },
        {
            itemHeight: 50,
            header: 'Icon',
            content: <IoIosArrowForward />,
        },
    ];
    return (
        <div>
            <Accordion accordionList={accordionList} height={500} />
        </div>
    );
};

export default App;
```

![Accordion](../../assets/images/accordion_noscroll.png 'Accordion')

---

**Note:**
-If the `itemHeight` or `height` is smaller than the actual content height, `scrolling` behaviour is supported.

![Accordion](../../assets/images/accordion_scroll.png 'Accordion')

---
