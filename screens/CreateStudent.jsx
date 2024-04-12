import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { gql, useMutation } from '@apollo/client';

// Add CREATE_STUDENT Mutation here

const CreateStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Invoke Apollo's useMutation() Hook here

    async function handleSubmit(){
        try {
            await createStudent(
                {
                    variables: {
                        firstName,
                        lastName,
                    },
                }
            );

            setFirstName('');
            setLastName('');

        } catch (error) {
            console.error('Error creating student:', error);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Button title="Create Student" onPress={handleSubmit} />
        </View>
    );
};

export default CreateStudent;
