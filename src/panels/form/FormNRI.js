import React, { useState } from 'react';
import { FormItem, Input, Button, Div, Radio } from '@vkontakte/vkui';
import InputMask from 'react-input-mask';

const FormNRI = ({ fetchedUser, onSubmit, onBack }) => {
    const initialLate = 'ON_TIME';
    const initialTime = '';
    const initialBring = '';
    const initialTake = '';
    const [form, setForm] = useState({
        late: initialLate,
        time: initialTime,
        bring: initialBring,
        take: initialTake
    });

    const isValidTime = (time) => /^~ к ([01]\d|2[0-3]):[0-5]\d$/.test(time);
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
            <FormItem top={<span>Когда тебя ждать?<span style={{ color: 'red' }}>*</span></span>}
                bottom="Если знаешь, когда придешь (хотя бы примерно), просим указать время - так ты поможешь нашим ведущим)">
                <Radio
                    name="late"
                    value="ON_TIME"
                    checked={form.late === 'ON_TIME'}
                    onChange={handleChange}
                >
                    К началу игротеки
                </Radio>
                <Radio
                    name="late"
                    value="LATE"
                    checked={form.late === 'LATE'}
                    onChange={handleChange}
                >
                    Могу опоздать
                </Radio>
                <Radio
                    name="late"
                    value="TIME"
                    checked={form.late === 'TIME'}
                    onChange={handleChange}
                >
                    Приду ко времени
                </Radio>
                {form.late === 'TIME' && (
                    <InputMask
                        mask="~ к 99:99"
                        value={form.time}
                        onChange={handleChange}
                    >
                        {(inputProps) => (
                            <Input
                                value={form.time}
                                name="time"
                                onChange={handleChange}
                                status={form.time && !isValidTime(form.time) ? 'error' : 'default'}
                            />
                        )}
                    </InputMask>
                )}
            </FormItem>
            <FormItem top={<span>Если хочешь принести что-нибудь на игротеку (будь то игры или печеньки), напиши сюда :3</span>}>
                <Input
                    type="text"
                    name="bring"
                    value={form.bring}
                    onChange={handleChange}
                />
            </FormItem>
            <FormItem top={<span>Пожелания по настолочкам</span>}>
                <Input
                    type="text"
                    name="take"
                    value={form.take}
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
                        type="submit"
                        disabled={!form.late||(form.late === "TIME" && !form.time)}
                    >
                        Далее</Button>
                </Div>
            </FormItem>
        </form>
    );
};

export default FormNRI;