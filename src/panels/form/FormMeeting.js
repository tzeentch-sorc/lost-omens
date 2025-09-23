import React, { useState } from 'react';
import { FormItem, Button, Select, LocaleProvider, Div, DateInput } from '@vkontakte/vkui';

const FormMeeting = ({ fetchedUser, onSubmit, onBack }) => {
    const initialMero = '';
    const initialDate = new Date();
    const [form, setForm] = useState({
        mero: initialMero,
        date: initialDate
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (value) => {
        setForm((prev) => ({
            ...prev,
            date: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormItem top={<span>Выбери желаемое направление или мероприятие<span style={{ color: 'red' }}>*</span></span>}>
                <Select
                    name="mero"
                    placeholder="Где нам ждать тебя, воин?"
                    onChange={handleChange}
                    options={[
                        {
                            value: 'IGROTEKA',
                            label: 'Игротека (вечер настольных игр)',
                        },
                        {
                            value: 'NRI',
                            label: 'Ролевые игры',
                        },
                        {
                            value: 'PAINT',
                            label: 'День покраса',
                        },
                        {
                            value: 'MAFIA',
                            label: 'Спортивная мафия',
                        },
                        {
                            value: 'KT',
                            label: 'Турнир по Killteam',
                        },
                        {
                            value: 'BT',
                            label: 'Battletech',
                        },
                        {
                            value: 'MTG',
                            label: 'Magic the Gathering',
                        },
                        {
                            value: 'OTHER',
                            label: 'Отдельное мероприятие',
                        },
                    ]}
                />
            </FormItem>
            <FormItem>
                <LocaleProvider value='ru-RU'>
                    <DateInput
                        name="date"
                        aria-label="Выбери дату мероприятия"
                        value={form.date}
                        onChange={handleDateChange}
                        enableTime={false}
                        disablePast={true}
                        disableFuture={false}
                        closeOnChange={true}
                        disablePickers={false}
                        showNeighboringMonth={true}
                        disableCalendar={false}
                        readOnly={false}
                    />
                </LocaleProvider>
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
                        disabled={!form.mero || !form.date}
                    >
                        Далее</Button>
                </Div>
            </FormItem>
        </form>
    );
};

export default FormMeeting;