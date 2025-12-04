import React, { useState } from 'react';
import { FormItem, Input, Button, Checkbox, Div } from '@vkontakte/vkui';

const FormFinish = ({ fetchedUser, onSubmit, onBack }) => {
    const initialWishes = "";
    const initialAgreement = false;
    const [form, setForm] = useState({
        wishes: initialWishes,
        agreement: initialAgreement
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
            <FormItem top={<span>согласие на обработку персональных данных <span style={{ color: 'red' }}>*</span></span>}>
                <Checkbox
                    name="agreement"
                    description="Я даю согласие на обработку своих персональных данных в соответствии с ФЗ-152"
                    onChange={handleChange}
                />
            </FormItem>
            <FormItem top={<span>Пожелания / вопросы / дополнительная информация</span>}>
                <Input
                    type="text"
                    name="wishes"
                    value={form.wishes}
                    onChange={handleChange}
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
                        appearance='positive'
                        type="submit"
                        disabled={!form.agreement}
                    >Отправить</Button>
                </Div>

            </FormItem>
        </form>
    );
};

export default FormFinish;