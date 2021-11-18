import React from 'react';

const CardUser = () => (
    <div>
        <img src="/Screenshots/cardUser.png" alt=""/>
        <div>верстка 30 мин</div>
    </div>
)

export default {
    title: "CardUser",
    component: CardUser
}

const Template = (args) => <CardUser {...args} />;

export const Default = Template.bind({});
Default.args = {
};
