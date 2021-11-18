import React from 'react';

const Blocks = () => (
    <div>
        <h2>Блоки</h2>
        <img src="/Screenshots/blocks.png" alt=""/>
        <div>Оценка: ориентировочно 8 ч.</div>
    </div>
)

export default {
    title: "blocks",
    component: Blocks
}

const Template = (args) => <Blocks {...args} />;

export const Default = Template.bind({});
Default.args = {
};