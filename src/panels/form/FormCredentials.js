import React, { useState } from 'react';
import { FormItem, Input, Button, Radio } from '@vkontakte/vkui';

const FormCredentials = ({ fetchedUser, onSubmit }) => {
    const initialName = `${fetchedUser?.last_name || ''} ${fetchedUser?.first_name || ''}`.trim();
    const initialNickname = fetchedUser?.screen_name || '';
    const initialChoice = 'ITMO';
    const [form, setForm] = useState({
        fullName: initialName,
        nickname: initialNickname,
        choice: initialChoice,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormItem top={<span>Напиши свое ФИО (как в паспорте) <span style={{ color: 'red' }}>*</span></span>}>
                <Input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Введите ваше ФИО"
                />
            </FormItem>
            <FormItem top={<span>Контакты для связи на всякий случай <span style={{ color: 'red' }}>*</span></span>}>
                <Input
                    type="text"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="То, что идет после https://vk.com/"
                />
            </FormItem>
            <FormItem top={<span>Ты из ИТМО? <span style={{ color: 'red' }}>*</span></span>}>
                <Radio
                    name="choice"
                    value="ITMO"
                    checked={form.choice === 'ITMO'}
                    onChange={handleChange}
                >
                    Да
                </Radio>
                <Radio
                    name="choice"
                    value="NOT_ITMO"
                    checked={form.choice === 'NOT_ITMO'}
                    onChange={handleChange}
                >
                    Нет
                </Radio>
            </FormItem>
            <FormItem>
                <Button 
                    size="m" 
                    stretched 
                    type="submit"
                    disabled={!form.fullName || !form.nickname || !form.choice}
                >Далее</Button>
            </FormItem>
        </form>
    );
};

export default FormCredentials;