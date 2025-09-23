import React, { useState } from 'react';
import { FormItem, Input, Button, Div, Radio } from '@vkontakte/vkui';

const FormNotItmo = ({ fetchedUser, onSubmit, onBack }) => {
    const initialPhone = fetchedUser?.phone || '';
    const initialPassport = '';
    const initialPass = 'false';
    const initialType = 'ITMO_FAMILY';
    const initialPlace = 'LOMO';
    const [form, setForm] = useState({
        phone: initialPhone,
        passport: initialPassport,
        type: initialType,
        place: initialPlace,
        pass: initialPass
    });

    const isValidPhone = (phone) => /^\d{6}$/.test(phone);//TODO правильную регулярку
    const isValidPassport = (passport) => /^\d{6}$/.test(passport);//TODO правильную регулярку

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
            <FormItem top={<span>Укажи свой род деятельности <span style={{ color: 'red' }}>*</span></span>}>
                <Radio
                    name="type"
                    value="ITMO_FAMILY"
                    checked={form.type === 'ITMO_FAMILY'}
                    onChange={handleChange}
                >
                    Бывший студент ИТМО
                </Radio>
                <Radio
                    name="type"
                    value="SPB_STUDENT"
                    checked={form.type === 'SPB_STUDENT'}
                    onChange={handleChange}
                >
                    Студент другого вуза Санкт-Петербурга
                </Radio>
                <Radio
                    name="type"
                    value="SPB_PUPIL"
                    checked={form.type === 'SPB_PUPIL'}
                    onChange={handleChange}
                >
                    Ученик школы Санкт-Петербурга
                </Radio>
                <Radio
                    name="type"
                    value="OTHER"
                    checked={form.type === 'OTHER'}
                    onChange={handleChange}
                >
                    Другое
                </Radio>{/* TODO добавить поле с "а что другое" */}
            </FormItem>
            <FormItem top={<span>Укажи номер телефона, который будет у тебя с собой в день мероприятия<span style={{ color: 'red' }}>*</span></span>}>
                <Input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    status={form.phone && !isValidPhone(form.phone) ? 'error' : 'default'}
                />
            </FormItem>{/* TODO вводить номер телефона и он красиво вставляется в скобки и выставляется +7 */}
            <FormItem top={<span>Укажи серию и номер паспорта<span style={{ color: 'red' }}>*</span></span>} bottom="(да, нас требуют это указывать)">
                <Input
                    type="text"
                    name="passport"
                    value={form.passport}
                    onChange={handleChange}
                    placeholder="XXXX XXXXXX"
                    status={form.pass && !isValidPassport(form.passport) ? 'error' : 'default'}
                />
            </FormItem>{/* TODO вводить серию и номер паспорта и он красиво вставляется с пробелами */}
            <FormItem top={<span>В какой корпус требуется проход?<span style={{ color: 'red' }}>*</span></span>}
                bottom="Если нет уверенности в выборе, корпус можно посмотреть в анонсе мероприятия">
                <Radio
                    name="place"
                    value="LOMO"
                    checked={form.place === 'LOMO'}
                    onChange={handleChange}
                >
                    Ломоносова, 9 (Ломо, метро Достоевская)
                </Radio>
                <Radio
                    name="place"
                    value="GK"
                    checked={form.place === 'GK'}
                    onChange={handleChange}
                >
                    Кронверкский, 49 (Главный корпус/ГК, метро Горьковская)
                </Radio>
                <Radio
                    name="place"
                    value="GRIVA"
                    checked={form.place === 'GRIVA'}
                    onChange={handleChange}
                >
                    Гривцова пер., 14-16 (Грива, метро Садовая/Спасская/Сенная)
                </Radio>
                <Radio
                    name="place"
                    value="CHAI"
                    checked={form.place === 'CHAI'}
                    onChange={handleChange}
                >
                    Чайковского, 11/2 (Чайка, метро Чернышевская)
                </Radio>
                <Radio
                    name="place"
                    value="ONLINE"
                    checked={form.place === 'ONLINE'}
                    onChange={handleChange}
                >
                    Онлайн
                </Radio>
            </FormItem>
            <FormItem top={<span>Есть ли у тебя пропуск в ИТМО?<span style={{ color: 'red' }}>*</span></span>}>
                <Radio
                    name="pass"
                    value='true'
                    checked={form.pass === 'true'}
                    onChange={handleChange}
                >
                    Да
                </Radio>
                <Radio
                    name="pass"
                    value='false'
                    checked={form.pass === 'false'}
                    onChange={handleChange}
                >
                    Нет
                </Radio>
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
                        disabled={!isValidPhone(form.phone) || !isValidPassport(form.passport) || !form.type || !form.pass || !form.place}
                    >
                        Далее</Button>
                </Div>
            </FormItem>
        </form>
    );
};

export default FormNotItmo;