import React from 'react';

const CardIconAndTitle = () => (
    <div>
        <img src="/Screenshots/cardIconAndTitle.png" alt=""/>
        <div>1 час</div>
    </div>
)

export default {
    title: "CardIconAndTitle",
    component: CardIconAndTitle
}

const Template = (args) => <CardIconAndTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
};
