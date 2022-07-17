# Collapse

React UI component for displaying single or multiple `collapse-items`.

---

## Props

The available `props`, you can work with:

| Props            | Type             | Description                                                          | Default |
| ---------------- | ---------------- | -------------------------------------------------------------------- | ------- |
| children         | ReactNode        | can contain any element which is placed inside each component.       | -       |
| style _optional_ | style            | style object for styling collapse container.                         | -       |
| header           | string           | content of the header, **required for single collapse item**.        | -       |
| content          | ReactNode        | content of the collapse body, **required for single collapse item**. | -       |
| iconVisible      | boolean          | sets the visibility of icon along side header.                       | true    |
| multiple         | boolean          | enables the multiple collapse based on `collapseList`.               | false   |
| height           | number           | global height for each item in the list.                             | 200     |
| collapseList     | Array of Objects | array of list of items to be displayed on `collapse`.                | -       |

### collapseList

It is an array of objects, with keys: `header`, `content` and `itemHeight`.
Here, `itemHeight` is optional.

```typescript
const collapseList = [
  {
    header: 'String',
    itemHeight: 200,
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique
                beatae consequuntur.`,
  },
];
```

---

## Implementation

---

### `Single Collapse Item`

Single instance of a collapse item is created.

**Note:**

- Props: `header` and `content` are required.

```typescript
import { Collapse } from './components';

const App = () => {
  return (
    <div>
      <Collapse header="Single Collapse" content={12345} height={50} />
    </div>
  );
};

export default App;
```

![Single Collapse Item](../../assets/images/collapse.png 'Single Collpase Item')

---

### `Multiple Collapse Items`

Multiple instances based on `collapseList` is created.

**Note:**

- More props: `collapseList` and `multiple` are required.

```typescript
import { Collapse } from './components';
import { IoIosArrowForward } from 'react-icons/io';

const App = () => {
  const collapseList = [
    {
      header: 'String',
      itemHeight: 200,
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique`,
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
      <Collapse collapseList={collapseList} height={50} multiple />
    </div>
  );
};

export default App;
```

![Collapse without scroll](../../assets/images/accordion_noscroll.png 'Collapse without scroll')

---

**Note:**
-If the `itemHeight` or `height` is smaller than the actual content height, `scrolling` behaviour is supported.

![Collapse with scroll](../../assets/images/accordion_scroll.png 'Collapse with scroll')

---

import { Collapse, CollapseItem } from './components';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

const App = () => {
const [open, setOpen] = useState(true);
const collapseList = [
{
header: 'String',
// itemHeight: 50,
content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similiqueLorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius. Officia, a optio, similique`,
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

<div
style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '100px 200px',
            }} >
<div>
<Collapse trigger={open} collapseList={collapseList} multiple triggerToggle={false}>
<CollapseItem header="Nested Collapse Item 1">
<Collapse trigger={open} collapseList={collapseList} multiple>
<CollapseItem header="Nested Collapse Item 2">This is Custom Collapse</CollapseItem>
</Collapse>
</CollapseItem>
</Collapse>
</div>

            <div>
                <button onClick={() => setOpen((prev) => !prev)}>Trigger</button>
            </div>

            <div>
                <CollapseItem header="Nested Collapse Item 1">This is Custom Collapse</CollapseItem>
            </div>
        </div>
    );

};

export default App;
