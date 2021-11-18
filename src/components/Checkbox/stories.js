import React from 'react';

const Checkbox = () => (
    <div>
        <img src="/Screenshots/chekbox.png" alt=""/>
        <div>верстка 1,5 час</div>
    </div>
)

export default {
    title: "Checkbox",
    component: Checkbox
}

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
};
