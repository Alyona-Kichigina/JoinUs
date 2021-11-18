import React from 'react';

const Input = () => (
    <div className="flex flex-row">
        <div>
            <h2>Текстовый инпут</h2>
            <img src="/Screenshots/input.png" alt=""/>
            <div>Оценка: 2 часа.</div>
        </div>
        <div>
            <h2>Инпут с выпадающим списком</h2>
            <img src="/Screenshots/input2.png" alt=""/>
            <div>Оценка: 4 часа.</div>
        </div>
    </div>
)

export default {
    title: "input",
    component: Input
}

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
};