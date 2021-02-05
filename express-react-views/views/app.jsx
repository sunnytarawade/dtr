var React = require('react');

function GetDynamicString(props) {
    const { textNodeDtrObject, query } = props;
    const queryKeys = Object.keys(query);
    const { dtrContent } = textNodeDtrObject;
    return (
        <>
            {dtrContent.map(subStringObj => {
                if (subStringObj.typeOfSubstring === 'dynamic') {
                    const dynamicValue = queryKeys.includes(
                        subStringObj.tagNameOfSubstring
                    )
                        ? query[subStringObj.tagNameOfSubstring]
                        : subStringObj.defaultValueOfSubstring;
                    return (
                        <span style={{ background: 'yellow' }}>
                            {dynamicValue}
                        </span>
                    );
                } else {
                    return <span>{subStringObj.defaultValueOfSubstring}</span>;
                }
            })}
        </>
    );
}

// function GetDynamicElement(props) {

//     const { textNodeDtrObject, query } = props;
//     const queryKeys = Object.keys(query);
//     const { dtrContent } = textNodeDtrObject;

//     return <div></div>;

function HelloMessage(props) {
    const { query, textNodesList } = props;

    return (
        <>
            {textNodesList.map(textNodeDtrObject => {
                return (
                    <p style={{ padding: '10px', textAlign: 'center' }}>
                        <GetDynamicString
                            textNodeDtrObject={textNodeDtrObject}
                            query={query}
                        />
                        {/* <GetDynamicElement /> */}
                    </p>
                );
            })}
        </>
    );
}

module.exports = HelloMessage;
