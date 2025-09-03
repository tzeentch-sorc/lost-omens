import React, { useState } from 'react';
import { FormItem, Input, Button, Div } from '@vkontakte/vkui';

const FormItmo = ({ fetchedUser, onSubmit, onBack }) => {
    const initialISU = '';
    const [form, setForm] = useState({
        isu: initialISU,
    });

    const isValidIsu = (isu) => /^\d{6}$/.test(isu);

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
            <FormItem top={<span>Укажи свой табельный номер ИСУ <span style={{ color: 'red' }}>*</span></span>}
                bottom="6 цифр">
                <Input
                    type="text"
                    name="isu"
                    value={form.isu}
                    onChange={handleChange}
                    placeholder="Введите ваш табельный номер"
                    status={form.isu && !isValidIsu(form.isu) ? 'error' : 'default'}
                />
            </FormItem>
            <FormItem>
                <Div style={{ display: 'flex', gap: 8 }}>
                    <Button
                        size="m"
                        stretched
                        type="button"
                        onClick={onBack}
                    >
                        Назад</Button>
                    <Button
                        size="m"
                        stretched
                        type="submit"
                        disabled={!isValidIsu(form.isu)}
                    >
                        Далее</Button>
                </Div>
            </FormItem>
        </form>
    );
};

export default FormItmo;