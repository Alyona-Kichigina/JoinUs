import React from 'react';

const Sidebar = () => (
    <div>
        <img src="/Screenshots/img.png" alt=""/>
        <div>Описание</div>
    </div>
)

export default {
    title: "sidebar",
    component: Sidebar
}

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
};