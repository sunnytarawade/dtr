import { findIndex, get } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import { v4 as uuid } from 'uuid';
const DtrTableItem = ({
    dtrContent,
    currentDtrObject,
    setDtrContent,
    handleTextValueChange,
    updateSelectionStrings,
}) => {
    const {
        tagNameOfSubstring,
        defaultValueOfSubstring,
        idOfSubstring,
    } = currentDtrObject;
    return (
        <StyledDtrTableItem>
            <StyledInput
                placeholder="default value of substring"
                inputWidth="60%"
                defaultValue={defaultValueOfSubstring}
                // className={id}
                onChange={e => {
                    handleTextValueChange(
                        e,
                        idOfSubstring,
                        'defaultValueOfSubstring'
                    );
                }}
                onSelect={e => {
                    updateSelectionStrings(e, currentDtrObject);
                }}
            ></StyledInput>
            <StyledInput
                placeholder={`1. enter tagName here
                2. select text to make dynamic
                3. press Control`}
                inputWidth="40%"
                defaultValue={tagNameOfSubstring}
                onChange={e => {
                    handleTextValueChange(
                        e,
                        idOfSubstring,
                        'tagNameOfSubstring'
                    );
                }}
                // className={id}
            ></StyledInput>
            {/* style dropdown options */}
        </StyledDtrTableItem>
    );
};

export class DtrSettingsTable extends Component {
    state = {
        preSelectedSubstring: '',
        selectedSubstring: '',
        postSelectedSubstring: '',
        originalString: '',
        currentDtrObject: {},
        dtrTagsList: [],
    };

    componentDidMount() {
        document.addEventListener('keydown', keyEvent => {
            this.makeSelectedTextDynamic(keyEvent);
        });
    }

    makeSelectedTextDynamic = keyEvent => {
        const { key } = keyEvent;
        const { selectedSubstring, currentDtrObject } = this.state;

        if (key === 'Control' && selectedSubstring.length > 0) {
            const indexOfCurrentDtrObject = findIndex(this.props.dtrContent, {
                idOfSubstring: currentDtrObject.idOfSubstring,
            });

            const tagName = get(
                this.props,
                ['dtrContent', indexOfCurrentDtrObject, 'tagNameOfSubstring'],
                ''
            );

            if (!tagName)
                alert(
                    `tagName is empty... cant make dynamic text without tagName`
                );
            else {
                console.log('making selected text dyanmic');

                // if 2 adjacent dtrObjects in dtrContent have type static, we can give
                // user the option to merge these two objects into one

                this.modifyDtrContent(indexOfCurrentDtrObject, tagName);
            }
        }
    };

    modifyDtrContent = (indexOfCurrentDtrObject, tagName) => {
        const {
            preSelectedSubstring,
            selectedSubstring,
            postSelectedSubstring,
        } = this.state;

        let updatedWith;
        if (indexOfCurrentDtrObject !== -1) {
            if (
                preSelectedSubstring.length === 0 &&
                postSelectedSubstring.length === 0
            ) {
                updatedWith = {
                    $splice: [
                        [
                            indexOfCurrentDtrObject,
                            1,
                            {
                                typeOfSubstring: 'dynamic',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: tagName,
                                defaultValueOfSubstring: selectedSubstring,
                            },
                        ],
                    ],
                };
            } else if (
                preSelectedSubstring.length === 0 &&
                postSelectedSubstring.length !== 0
            ) {
                updatedWith = {
                    $splice: [
                        [
                            indexOfCurrentDtrObject,
                            1,
                            {
                                typeOfSubstring: 'dynamic',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: tagName,
                                defaultValueOfSubstring: selectedSubstring,
                            },
                            {
                                typeOfSubstring: 'static',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: '',
                                defaultValueOfSubstring: postSelectedSubstring,
                            },
                        ],
                    ],
                };
            } else if (
                postSelectedSubstring.length !== 0 &&
                postSelectedSubstring.length === 0
            ) {
                updatedWith = {
                    $splice: [
                        [
                            indexOfCurrentDtrObject,
                            1,
                            {
                                typeOfSubstring: 'static',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: '',
                                defaultValueOfSubstring: preSelectedSubstring,
                            },
                            {
                                typeOfSubstring: 'dynamic',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: tagName,
                                defaultValueOfSubstring: selectedSubstring,
                            },
                        ],
                    ],
                };
            } else {
                updatedWith = {
                    $splice: [
                        [
                            indexOfCurrentDtrObject,
                            1,
                            {
                                typeOfSubstring: 'static',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: '',
                                defaultValueOfSubstring: preSelectedSubstring,
                            },
                            {
                                typeOfSubstring: 'dynamic',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: tagName,
                                defaultValueOfSubstring: selectedSubstring,
                            },
                            {
                                typeOfSubstring: 'static',
                                idOfSubstring: uuid(),
                                tagNameOfSubstring: '',
                                defaultValueOfSubstring: postSelectedSubstring,
                            },
                        ],
                    ],
                };
            }

            const updatedDtrContent = update(
                this.props.dtrContent,
                updatedWith
            );

            // console.log(updatedDtrContent);
            this.props.setDtrContent(updatedDtrContent);
        }
    };

    updateSelectionStrings = (e, currentDtrObject) => {
        const {
            selectionStart: selectionStartIndex,
            selectionEnd: selectionEndIndex,
            value: originalString,
        } = e.target;
        const preSelectedSubstring = originalString.slice(
            0,
            selectionStartIndex
        );
        const selectedSubstring = originalString.slice(
            selectionStartIndex,
            selectionEndIndex
        );
        const postSelectedSubstring = originalString.slice(
            selectionEndIndex,
            originalString.length
        );
        this.setState({
            preSelectedSubstring,
            selectedSubstring,
            postSelectedSubstring,
            currentDtrObject,
        });
    };

    handleTextValueChange = (e, idOfSubstring, keyToChange) => {
        const { dtrContent } = this.props;
        const newTextValue = e.target.value;
        const indexOfRow = findIndex(dtrContent, { idOfSubstring });

        const updatedDtrContent = update(dtrContent, {
            [indexOfRow]: {
                [keyToChange]: {
                    $set: newTextValue,
                },
            },
        });

        this.props.setDtrContent(updatedDtrContent);
    };

    render() {
        return (
            <StyledDtrTableContainer>
                {this.props.dtrContent.map(obj => {
                    return (
                        <DtrTableItem
                            dtrContent={this.props.dtrContent}
                            setDtrContent={this.props.setDtrContent}
                            currentDtrObject={obj}
                            key={obj.idOfSubstring}
                            {...this}
                        />
                    );
                })}
            </StyledDtrTableContainer>
        );
    }
}

export default DtrSettingsTable;

const StyledDtrTableContainer = styled.div`
    width: 60%;
    margin: 10px auto;
    background: lightgrey;
`;

const StyledDtrTableItem = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 5px;
    border-bottom: 1px solid black;
`;

const StyledInput = styled.textarea`
    display: block;
    width: ${props => props.inputWidth};
    margin: 3px 10px;
`;
