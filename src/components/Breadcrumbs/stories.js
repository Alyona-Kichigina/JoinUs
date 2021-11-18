import React from 'react';

const Breadcrumbs = () => (
    <div>
        <img src="/Screenshots/breadcrumbs.png" alt=""/>
        <div>компонент и роутинг 4 часа</div>
    </div>
)

export default {
    title: "breadcrumbs",
    component: Breadcrumbs
}

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
};
