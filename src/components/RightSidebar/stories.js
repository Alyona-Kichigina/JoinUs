import React from 'react';

const RightSidebar = () => (
    <div>
        <h2>Правый сайдбар</h2>
        <img src="/Screenshots/rightsidebar.png" alt=""/>
        <div>Оценка 3 ч.</div>
    </div>
)

export default {
    title: "RightSidebar",
    component: RightSidebar
}

const Template = (args) => <RightSidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
};