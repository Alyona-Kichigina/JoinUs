import React from 'react';

const Pagination = () => (
    <div>
        <img src="/Screenshots/pagination.png" alt=""/>
        <div>3 часа</div>
    </div>
)

export default {
    title: "Pagination",
    component: Pagination
}

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
};
