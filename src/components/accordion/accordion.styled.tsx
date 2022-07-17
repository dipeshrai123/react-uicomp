import styled from 'styled-components';

const AccordionContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 40px 5px;
    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0 4px 36px rgba(0, 0, 0, 0.12);
    border: 1px solid #e1e1e1;
    flex: 1;
    // width: 600px;
`;

const AccordionContent = styled.div`
    // border-radius: 10px;
    padding: 0;
    width: 100%;
    overflow: hidden;
`;

const AccordionHeader = styled.div`
    display: flex;
    padding: 8px 14px;
    font-size: 16px;
    border-bottom: 1px solid #e1e1e1;
    cursor: pointer;
    position: relative;
`;

const AccordionIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    margin: 5px;
`;

const AccordionHeaderContent = styled.div`
    font-weight: bolder;
    padding: 5px 5px 3px 5px;
    font-smooth: 10em;
`;

const AccordionBody = styled.div`
    padding: 0px 20px;
    font-smooth: 10em;
    font-size: 14px;
    background-color: #f0f0f0;
    backdrop-filter: blur(5px);
    scroll-behaviour: smooth;
    overflow-y: scroll;
`;

const AccordionBodyContent = styled.div`
    padding: 8px;
`;
// const CollpaseHeader = styled.div``;

export {
    AccordionContainer,
    AccordionContent,
    AccordionHeader,
    AccordionBody,
    AccordionIcon,
    AccordionHeaderContent,
    AccordionBodyContent,
};
