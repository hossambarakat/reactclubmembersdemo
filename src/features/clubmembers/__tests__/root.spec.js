import React from 'react';
import { mount } from 'enzyme';
import Root from '../root';
import {createClubMembersStore} from '../store';
import showResults from '../showresults';

jest.mock('../showresults', () => {
    return jest.fn();
});

const clubMembersSelectors = {
    SubmitButton: '.uia-save-club',
    ClubNameTextField: '.uia-club-name',
    Members: {
        AddMemberButton: '.uia-add-member',
        MemberNameTextField: '.uia-member-name',
        RemoveMemberButton: '.uia-remove-member'
    }
}

const clubMembersPage = (wrapper) => {
    return {
        clickSubmit: () => wrapper.find(clubMembersSelectors.SubmitButton).simulate('click'),
        typeClubName: (value) => wrapper.find(clubMembersSelectors.ClubNameTextField).simulate('change', { target: { value } }),
        addMember: (name) => {
            wrapper.find(clubMembersSelectors.Members.AddMemberButton).simulate('click');
            wrapper.find(clubMembersSelectors.Members.MemberNameTextField).last().simulate('change', { target: { value: name }});
        },
        removeMember: (index) => {
            wrapper.find(clubMembersSelectors.Members.RemoveMemberButton).at(index).simulate('click');
        }
    }
}

class ClubBuilder {
    constructor(){
        this.clubname = "default name";
        this.members = [];
    }
    withName(name) {
        this.clubname = name;
        return this;
    }
    withMember(clubMemberBuilder){
        this.members.push(clubMemberBuilder.build());
        return this;
    }
    
    build() {
        let result = {
            clubname: this.clubname
        };
        if(this.members.length){
            result.members = this.members;
        }
        return result;
    }
}
class ClubMemberBuilder {
    constructor(){
        this.memberName = "default name";
    }
    withName(name) {
        this.memberName = name;
        return this;
    }
    build() {
        return {
            memberName: this.memberName
        }
    }
}

const mountComponent = () => {
    return mount(<Root store={createClubMembersStore()} />);
}
const expectShowResults = (value) => {
    expect(showResults.mock.calls[0][0]).toEqual(value);
}
describe('Root', () => {
    beforeEach(()=>{
        showResults.mockClear();
        
    });
    it('Should mount without explode', () => {
        const wrapper = mountComponent();

        expect(wrapper.length).toBe(1);
    })
    it('saving without members', () => {
        const wrapper = mountComponent();
        const page = clubMembersPage(wrapper);
        const club = new ClubBuilder().build();

        page.typeClubName(club.clubname);
        page.clickSubmit();

        expectShowResults(club);
    });
    it('Adding one club member', () => {
        const wrapper = mountComponent();
        const page = clubMembersPage(wrapper);
        
        const club = new ClubBuilder().withMember(new ClubMemberBuilder()).build();
        console.log(club);

        page.typeClubName(club.clubname);
        page.addMember(club.members[0].memberName);
        page.clickSubmit();

        expectShowResults(club);
    });

    it('Adding two club members', () => {
        const wrapper = mountComponent();

        const page = clubMembersPage(wrapper);

        page.typeClubName('math club 1');
        page.addMember("Hossam");
        page.addMember("Hazem");
        page.clickSubmit();
        
        expect(showResults).toHaveBeenCalledTimes(1);
        expectShowResults({"clubname": "math club 1", "members": [{"memberName": "Hossam"}, {"memberName": "Hazem"}]});
    });


    it('Removing club members', () => {
        const wrapper = mountComponent();
        
        const page = clubMembersPage(wrapper);

        page.typeClubName('math club 3');
        page.addMember("Hossam");
        page.addMember("Hazem");
        page.addMember("Adam");

        page.removeMember(1);
        page.clickSubmit();
        
        expect(showResults).toHaveBeenCalledTimes(1);
        expectShowResults({"clubname": "math club 3", "members": [{"memberName": "Hossam"}, {"memberName": "Adam"}]});
    });

});