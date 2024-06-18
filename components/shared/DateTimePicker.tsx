// DateTimePickerComponent.tsx

import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Mode = 'date' | 'time';

interface DateTimePickerComponentProps {
    onDateTimeSelected: (dateTimeString: string) => void;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({ onDateTimeSelected }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<Mode>('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        if (mode === 'time') {
            const dateTimeString = currentDate.toISOString();
            onDateTimeSelected(dateTimeString);
        }
    };

    const showMode = (currentMode: Mode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <Button onPress={showDatepicker} title="Select Date" />
            <Button onPress={showTimepicker} title="Select Time" />
            <Text>Selected Date: {date.toLocaleDateString()}</Text>
            <Text>Selected Time: {date.toLocaleTimeString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DateTimePickerComponent;
