import React from 'react';

const Avatar = () => (
    <div>
        <img src="/Screenshots/avatar.png" alt=""/>
        <div>верстка 1.5 час</div>
    </div>
)

export default {
    title: "Avatar",
    component: Avatar
}

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
};
