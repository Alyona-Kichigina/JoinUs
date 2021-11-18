import React from 'react';

const Navigation = () => (
    <div>
        <h2>Окно с навигацией</h2>
        <img src="/Screenshots/navigation.png" alt=""/>
        <div>Оценка: 5ч.</div>
    </div>
)

export default {
    title: "navigation",
    component: Navigation
}

const Template = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
};