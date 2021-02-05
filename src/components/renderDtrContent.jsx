import React from 'react';
import styled from 'styled-components';
const renderDtrContent = props => {
    //render content in editor with dtr highlighting

    const { dtrContent, shouldDtrPreviewBeVisibile } = props;
    return (
        <div>
            {dtrContent.map(obj => {
                return (
                    <StyledSpan
                        shouldDtrPreviewBeVisibile={shouldDtrPreviewBeVisibile}
                        dtrContentType={obj.typeOfSubstring}
                    >
                        {obj.defaultValueOfSubstring}
                    </StyledSpan>
                );
            })}
        </div>
    );
};

export default renderDtrContent;

const StyledSpan = styled.span`
    background: ${props =>
        props.shouldDtrPreviewBeVisibile && props.dtrContentType !== 'static'
            ? 'yellow'
            : 'none'};
`;
