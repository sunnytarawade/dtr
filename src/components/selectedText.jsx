import React, { Component } from 'react';
import DtrSettingsTable from './dtrSettingsTable';
import RenderDtrContent from './renderDtrContent';
import { v4 as uuid } from 'uuid';
import { findIndex, isEqual } from 'lodash';
import update from 'immutability-helper';
export class SelectedText extends Component {
    state = {
        dtrContent: [],
        // {
        //     type: 'dynamic',
        //     tag: {
        //         tagName: 'name',
        //         defaultValue: ' sdnksv ',
        //     },
        // },
        // taglist: [],
        content: 'I am static text',
        typeOfElement: 'text',
        shouldTextAreaBeVisible: false,
        isMouseInsideTextArea: false,
        shouldDtrPreviewBeVisibile: true,
        shouldDtrSettingsTableBeVisibile: false,
        // nondtrcontent: '',
    };

    setDtrContent = dtrContent => {
        this.setState({ dtrContent });
    };

    componentDidMount() {
        document.addEventListener('click', this.toggleTextAreaVisibility);
        document.addEventListener('doubleclick', this.toggleTextAreaVisibility);
        this.setState({
            idOfElement: this.props.textData.idOfElement,
            dtrContent: [
                {
                    idOfSubstring: uuid(),
                    tagNameOfSubstring: '',
                    defaultValueOfSubstring: 'Static String',
                    typeOfSubstring: 'static',
                },
                {
                    idOfSubstring: uuid(),
                    tagNameOfSubstring: 'someTag',
                    defaultValueOfSubstring: 'Dynamic String',
                    typeOfSubstring: 'dynamic',
                },
            ],
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevState.dtrContent, this.state.dtrContent)) {
            const indexOfElementToUpdate = findIndex(this.props.textNodesList, {
                idOfElement: this.state.idOfElement,
            });
            const newTextNodesList = update(this.props.textNodesList, {
                [indexOfElementToUpdate]: {
                    dtrContent: {
                        $set: this.state.dtrContent,
                    },
                },
            });
            console.log(newTextNodesList);
            this.props.updateTextNodesList(newTextNodesList);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.toggleTextAreaVisibility);
        document.removeEventListener(
            'doubleclick',
            this.toggleTextAreaVisibility
        );
    }

    toggleTextAreaVisibility = (source = 'DOCUMENT') => {
        if (source === 'TEXTAREA' || this.state.isMouseInsideTextArea) {
            this.setState({
                shouldTextAreaBeVisible: true,
            });
        } else {
            this.setState({
                shouldTextAreaBeVisible: false,
            });
        }
    };

    toggleDtrSettings = () => {
        this.setState({
            shouldDtrSettingsTableBeVisibile: !this.state
                .shouldDtrSettingsTableBeVisibile,
        });
    };

    toggleDtrPreview = () => {
        this.setState({
            shouldDtrPreviewBeVisibile: !this.state.shouldDtrPreviewBeVisibile,
        });
    };

    render() {
        return (
            <div
                style={{
                    margin: '40px auto 0 auto',
                    boxShadow: '2px 10px 8px grey',
                    background: '#eee',
                    width: '80%',
                }}
            >
                {this.state.shouldTextAreaBeVisible ? (
                    <textarea
                        style={{
                            display: 'block',
                            width: '80%',
                            margin: '10px auto',
                            textAlign: 'center',
                            fontSize: '18px',
                            padding: '5px',
                        }}
                        onSelect={this.handleSelect}
                        defaultValue={this.state.content}
                        onChange={e => {
                            this.setState({ content: e.target.value });
                        }}
                        onMouseEnter={() => {
                            this.setState({
                                isMouseInsideTextArea: true,
                            });
                        }}
                        onMouseLeave={() => {
                            this.setState({
                                isMouseInsideTextArea: false,
                            });
                        }}
                    ></textarea>
                ) : (
                    <div
                        style={{
                            display: 'block',
                            width: '80%',
                            margin: '10px auto',
                            textAlign: 'center',
                            fontSize: '18px',
                            padding: '5px',
                        }}
                        onDoubleClick={() => {
                            this.toggleTextAreaVisibility('TEXTAREA');
                        }}
                    >
                        <RenderDtrContent
                            shouldDtrPreviewBeVisibile={
                                this.state.shouldDtrPreviewBeVisibile
                            }
                            dtrContent={this.state.dtrContent}
                        />
                    </div>
                )}
                {this.state.shouldDtrSettingsTableBeVisibile ? (
                    <DtrSettingsTable
                        dtrContent={this.state.dtrContent}
                        setDtrContent={this.setDtrContent}
                    />
                ) : null}
                <button
                    style={{
                        background: '#ff9999',
                        margin: '3px 5px',
                    }}
                    onClick={() => {
                        this.props.handleDeleteNode(
                            this.props.textData.idOfElement
                        );
                    }}
                >
                    delete text node
                </button>
                <button
                    style={{
                        background: '#99ff99',
                        margin: '3px 5px',
                    }}
                    onClick={this.toggleDtrSettings}
                >
                    {this.state.shouldDtrSettingsTableBeVisibile
                        ? 'Hide DTR Settings'
                        : 'Show DTR Settings'}
                </button>
                <button
                    style={{
                        background: '#9999ff',
                        margin: '3px 5px',
                    }}
                    onClick={this.toggleDtrPreview}
                >
                    toggle dtr preview
                </button>
            </div>
        );
    }
}

export default SelectedText;
