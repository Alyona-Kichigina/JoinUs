import React from 'react';

const ComponentStatus = () => (
    <div>
        <img src="/Screenshots/componentStatus.png" alt=""/>
        <div>1 час</div>
    </div>
)

export default {
    title: "ComponentStatus",
    component: ComponentStatus
}

const Template = (args) => <ComponentStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
};
