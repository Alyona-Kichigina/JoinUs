import React from 'react';

const Button = () => (
    <div>
        <img src="/Screenshots/buttons.png" alt=""/>
        <div>верстка 1 час</div>
    </div>
)

export default {
    title: "Button",
    component: Button
}

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
};
