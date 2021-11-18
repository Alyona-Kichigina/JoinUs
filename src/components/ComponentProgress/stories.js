import React from 'react';

const ComponentProgress = () => (
    <div>
        <img src="/Screenshots/componentProgress.png" alt=""/>
        <div>3 час</div>
    </div>
)

export default {
    title: "ComponentProgress",
    component: ComponentProgress
}

const Template = (args) => <ComponentProgress{...args} />;

export const Default = Template.bind({});
Default.args = {
};
