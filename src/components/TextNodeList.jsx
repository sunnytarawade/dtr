import React, { Component } from 'react';
import TextNode from './selectedText';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
export class TextNodeList extends Component {
    state = {
        textNodesList: [],
    };

    updateTextNodesList = textNodesList => {
        this.setState({ textNodesList });
    };

    handleAddNewNode = e => {
        this.setState({
            textNodesList: [
                ...this.state.textNodesList,
                {
                    dtrContent: [
                        {
                            idOfSubstring: uuid(),
                            typeOfSubstring: 'static',
                            tagNameOfSubstring: '',
                            defaultValueOfSubstring: e.target.value,
                        },
                    ],
                    typeOfElement: 'text',
                    shouldDtrPreviewBeVisibile: true,
                    idOfElement: uuid(),
                },
            ],
        });
    };

    handleDeleteNode = idOfElement => {
        console.log(idOfElement);
        this.setState({
            textNodesList: this.state.textNodesList.filter(
                textData => textData.idOfElement !== idOfElement
            ),
        });
    };

    handlePostTextNodesList = async () => {
        const serverUrl = 'http://localhost:3001/';

        const res = await axios.post(serverUrl, {
            textNodesList: this.state.textNodesList,
        });

        // const res = await axios.post(serverUrl, {
        //     textNodesList: [
        //         {
        //             typeOfElement: 'text',
        //             shouldDtrPreviewBeVisibile: true,
        //             dtrContent: [
        //                 {
        //                     idOfSubstring: '34225',
        //                     tagNameOfSubstring: 'location',
        //                     defaultValueOfSubstring: 'Hi I am a static string',
        //                     typeOfSubstring: 'static',
        //                 },
        //                 {
        //                     idOfSubstring: '34sdsv',
        //                     tagNameOfSubstring: '',
        //                     defaultValueOfSubstring: 'Hi I am a dynamic string',
        //                     typeOfSubstring: 'dynamic',
        //                 },
        //             ],
        //         },
        //         {
        //             typeOfElement: 'text',
        //             shouldDtrPreviewBeVisibile: false,
        //             dtrContent: [
        //                 {
        //                     idOfSubstring: '34225',
        //                     tagNameOfSubstring: 'location',
        //                     defaultValueOfSubstring: 'Hi I am a static string',
        //                     typeOfSubstring: 'static',
        //                 },
        //                 {
        //                     idOfSubstring: '34sdsv',
        //                     tagNameOfSubstring: '',
        //                     defaultValueOfSubstring: 'Hi I am a dynamic string',
        //                     typeOfSubstring: 'dynamic',
        //                 },
        //             ],
        //         },
        //     ],
        // });

        const data = res.data;
        return data;
    };
    handleGetTextNodesList = async () => {};

    handleShowPreview = async () => {
        const data = await this.handlePostTextNodesList();
        console.log(data);
    };

    render() {
        return (
            <div>
                <button onClick={this.handleShowPreview}>Show Preview</button>
                <button
                    style={{
                        display: 'block',
                        margin: '20px auto',
                        clear: 'both',
                    }}
                    onClick={this.handleAddNewNode}
                >
                    add new text
                </button>

                {this.state.textNodesList.length > 0
                    ? this.state.textNodesList.map(textData => {
                          return (
                              <TextNode
                                  key={textData.idOfElement}
                                  textData={textData}
                                  {...this}
                                  {...this.state}
                              />
                          );
                      })
                    : 'No Text Nodes :('}
            </div>
        );
    }
}

export default TextNodeList;
