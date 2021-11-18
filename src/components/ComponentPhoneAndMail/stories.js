import React from 'react';

const ComponentPhoneAndMail = () => (
    <div>
        <img src="/Screenshots/componetPhoneAndMail.png" alt=""/>
        <div>верстка 30 мин</div>
    </div>
)

export default {
    title: "ComponentPhoneAndMail",
    component: ComponentPhoneAndMail
}

const Template = (args) => <ComponentPhoneAndMail {...args} />;

export const Default = Template.bind({});
Default.args = {
};
