import React from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "react-uicomp";

const DropdownPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 300 }}>
      <Dropdown
        animationType="elastic"
        placement="topleft"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        placement="topmiddle"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        placement="topright"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        placement="bottomleft"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        placement="bottommiddle"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        placement="bottomright"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownPage;
