import {Box, Button, FormControl, FormLabel, Input, TextField} from "@mui/joy";
import React, {useEffect, useState} from "react";
import useAsyncEffect from "use-async-effect";

declare global {
    //@ts-ignore
    interface Window { ethereum: any; }
}



interface LoginBlockProps {
    onLogin: (address: string | null) => void;
    address: string | null;
}

const LoginBlock = ({ onLogin, address }: LoginBlockProps) => {
    useAsyncEffect(async () => {
        if (!window?.ethereum) {
            alert('No metamask installed.');
        }
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            onLogin(accounts[0])
        } catch {}
    }, [])

    useEffect(() => {

        const handler = () => window.location.reload()

        window.ethereum.on('accountsChanged', handler)

        return () => window.ethereum.removeListener(handler)

    }, [])

    const login = async () => {
        if (!window?.ethereum) {
            alert('No metamask installed.');
        }
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            onLogin(accounts[0]);
        } catch {
            alert('Cant connect wallet.');
        }
    }


    return (
            <Box marginBottom={ '10px' } style={{ display: 'flex', gap: '20px' }}>
                { address ? <>
                    <Button disabled={ true } >Address</Button>
                    {/* <TextField fullWidth={ true } type={ 'text' } disabled={ true } value={ address } /> */}
                    <FormControl id="Id" required size="sm" color="primary">
                    <FormLabel sx={{ color: 'white' }}>Address</FormLabel>
                        <Input
                            placeholder="Placeholder"
                            name="Name"
                            type="text"
                            autoComplete="on"
                            autoFocus
                            error
                            fullWidth
                            defaultValue="DefaultValue"
                            variant="outlined"
                            value={address}
                            disabled={true}
                        />
          </FormControl>
                </>
                : <Button  onClick={ login } >Log in</Button>
                }
            </Box>
    )
}


export default LoginBlock;
