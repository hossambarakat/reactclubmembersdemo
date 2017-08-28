import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Members from './members';

class Club extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h1>Club</h1>
                <div>
                    club name: 
                    <Field 
                        name="clubname"
                        component="input"
                        type="text"
                        className="uia-club-name"
                    />
                </div>
                    <FieldArray name="members" component={Members} className="uia-members" />
                <div>
                    <button type="submit" onClick={handleSubmit} className="uia-save-club">Save</button>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'clubmembers'
})(Club);