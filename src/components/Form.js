import React from 'react';
import { Form, Input, Button} from 'antd';
import { connect } from 'react-redux';

import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType,articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }

        switch ( requestType ) {
            case 'post':
                return axios.post('https://coastalcoding.org/api/', {
                    title: title,
                    content: content
                }).then(res => console.log(res))
                .catch(error => console.error(error));
            case 'put':
                return axios.put(`https://coastalcoding.org/api/${articleID}/`, {
                    title: title,
                    content: content
                }).then(res => console.log(res))
                .catch(error => console.error(error));
        }
    }

    render() {
        return (
        <div>
            <Form onSubmit={(event) => this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.articleID
            )}>
            <FormItem label="Title">
                <Input name="title" placeholder="Put a title here" />
            </FormItem>
            <FormItem label="Content">
                <Input name="content" placeholder="Enter some content ..." />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
            </FormItem>
            </Form>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(CustomForm);