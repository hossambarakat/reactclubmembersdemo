import React from 'react';
import { Field } from 'redux-form'; 
import PropTypes from 'prop-types';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove() {
        this.props.fields.remove(this.props.index);
    }
    render() {
        const { member, index } = this.props;
        return (
            <div>
                <span className="uia-member-index">Member Name# {index+1} :</span>
                <Field 
                    name={`${member}.memberName`}
                    component="input"
                    type="text"
                    className="uia-member-name"
                />
                <button type="button" onClick={this.handleRemove} className="uia-remove-member">Remove</button>
            </div>
        );
    }
}

Member.propTypes = {
    // Redux Form 
    index: PropTypes.any,
    member: PropTypes.any,
    fields: PropTypes.any,
}

export default Member;