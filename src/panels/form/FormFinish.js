import React, { useState } from 'react';
import { FormItem, Input, Button, Checkbox } from '@vkontakte/vkui';

const FormFinish = ({ fetchedUser, onSubmit }) => {
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
            <FormItem top={<span>Напиши свое ФИО (как в паспорте) <span style={{ color: 'red' }}>*</span></span>}>
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
                <Button 
                    size="m" 
                    stretched 
                    appearance='positive'
                    type="submit"
                    disabled={!form.agreement}
                >Отправить</Button>
            </FormItem>
        </form>
    );
};

export default FormFinish;