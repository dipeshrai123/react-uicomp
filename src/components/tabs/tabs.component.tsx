import {
  ReactChild,
  ReactFragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getListOfAttribute, getNewChild } from '../../utils';
import {
  TabBodyStyled,
  TabHeadersStyled,
  TabPaneStyled,
  TabsStyled,
} from './tabs.styled';
import { TabPanePropsType, TabPropsType } from './tabs.type';

const TabHeaders = ({ headers, setActiveTabHeader }: any) => {
  return (
    <TabHeadersStyled>
      {headers?.map(({ header, active, id }: any, i: number) => (
        <span key={i} onClick={() => !active && setActiveTabHeader(id)}>
          {header}
        </span>
      ))}
    </TabHeadersStyled>
  );
};

const TabBody = ({ childPane }: any) => {
  return <TabBodyStyled>{childPane}</TabBodyStyled>;
};

export const Tabs = ({
  children,
  trigger,
  activeId,
  onTabChange,
}: TabPropsType) => {
  const [headers, setHeaders] = useState<Array<object>>();

  // const [activeTabHeader, setActiveTabHeader] = useState<string>('');
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [childPane, setChildPane] = useState<ReactChild | ReactFragment>();

  const handleClick = useCallback(
    (headerId: string) => {
      const headerBuffer = headers?.map((obj: any) => {
        if (obj.id === headerId) {
          setActiveTabId(obj.id);
          return { ...obj, active: !obj.active };
        }
        return { ...obj, active: false };
      });

      setHeaders(headerBuffer);
    },
    [headers]
  );

  useEffect(() => {
    trigger?.((Id: string) => {
      handleClick(Id);
    });
  }, [handleClick, headers, trigger]);

  useEffect(() => {
    setChildPane(getNewChild(children, activeTabId));
  }, [activeTabId, children]);

  //defaultPane
  useEffect(() => {
    setHeaders(getListOfAttribute(children, 'title', activeId));
  }, [activeId, children]);

  useEffect(() => {
    headers?.map((obj: any) => {
      if (obj.active) {
        return setActiveTabId(obj.id);
      }
      return null;
    });
  }, [headers]);

  useEffect(() => {
    onTabChange?.({ activeTabId });
  }, [activeTabId, onTabChange]);

  return (
    <TabsStyled>
      <TabHeaders headers={headers} setActiveTabHeader={handleClick} />
      <TabBody childPane={childPane} />
    </TabsStyled>
  );
};

const Pane = ({ children }: TabPanePropsType) => {
  return <TabPaneStyled>{children}</TabPaneStyled>;
};

Tabs.Pane = Pane;

export const useTab = () => {
  let someFn: any;

  return {
    handler: {
      trigger: (fn: (id: string) => void) => (someFn = fn),
    },
    activateTab: (id: string) => someFn(id),
  };
};
