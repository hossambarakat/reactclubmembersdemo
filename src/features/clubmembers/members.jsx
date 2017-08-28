import React from 'react';
import Member from './member';
import PropTypes from 'prop-types';

class Members extends React.Component {
    constructor(props){
        super(props);
        this.handleAddMember = this.handleAddMember.bind(this);
    }
    handleAddMember() {
        this.props.fields.push({});
    }
    render() {
        const { fields } = this.props;
        return (
            <div>
                <div>
                    <button type="button" onClick={this.handleAddMember} className="uia-add-member">Add Member</button>
                </div>
                <div>
                    {fields.map((member, index, fields) => (<Member key={index} member={member} index={index} fields={fields}/>))}
                </div>
            </div>
        );
    }
}

Members.propTypes = {
    fields: PropTypes.object,
}

export default Members;