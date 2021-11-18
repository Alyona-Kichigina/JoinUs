import React from 'react';

const Calendar = () => (
    <div>
        <img src="/Screenshots/calendar.png" alt=""/>
        <div>3-4 часа</div>
    </div>
)

export default {
    title: "Calendar",
    component: Calendar
}

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
};
