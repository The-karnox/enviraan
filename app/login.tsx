import React from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router'; 
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';

const Login = () => {
    const [email, setEmail] = React.useState(''); // State for email input
    const [password, setPassword] = React.useState(''); // State for password input
    const [showPassword, setShowPassword] = React.useState(false); // State for toggling password visibility

    return (
        <KeyboardAvoidingView
            style={styles.background}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient
                colors={['#ffffff', '#f1ffdc']}
                style={styles.background}
            >
                <Box style={styles.container}>
                    <Text size="4xl" bold={true} style={styles.title}>
                        Hey there 👋, welcome back
                    </Text>
                    <Text size="lg" style={styles.subtitle}>
                        Login with your existing account credentials and resume your journey with enviguide
                    </Text>

                    <VStack space="md" style={styles.form}>
                        {/* Email Input */}
                        <Box>
                            <Text size="sm" style={styles.label}>
                                Email
                            </Text>
                            <Input
                                placeholder="Enter your email address"
                                value={email} // Bind state to the input
                                onChangeText={setEmail} // Update state on text change
                                style={styles.input}
                            />
                        </Box>

                        {/* Password Input */}
                        <Box>
                            <Text size="sm" style={styles.label}>
                                Password
                            </Text>
                            <HStack style={styles.passwordContainer}>
                                <Input
                                    placeholder="Enter your password"
                                    secureTextEntry={!showPassword}
                                    value={password} // Bind state to the input
                                    onChangeText={setPassword} // Update state on text change
                                    style={styles.passwordInput}
                                    flex={1}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Icon
                                        as={showPassword ? EyeOffIcon : EyeIcon}
                                        size="md"
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </Box>
                    </VStack>

                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={() => router.push('./home')}>
                        <Text size="lg" style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <Text size="sm" style={styles.forgotPassword}>
                        Forgot Password
                    </Text>
                </Box>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        color: '#000',
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    label: {
        color: '#000',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    passwordInput: {
        flex: 1,
        borderWidth: 0, // Remove border from the input itself
        backgroundColor: 'transparent', // Match the container background
        paddingHorizontal: 0,
    },
    icon: {
        marginLeft: 10,
        color: '#a8b3c4',
    },
    loginButton: {
        backgroundColor: '#9dfc03',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#000',
        fontWeight: 'normal',
    },
    forgotPassword: {
        color: '#a8b3c4',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Login;
