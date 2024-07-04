import React from "react";
import FormLabel from "@mui/joy/FormLabel";
// import {TextField} from "@mui/joy";
import Box from "@mui/joy/Box";
import { FormControl, Input } from "@mui/joy";

export interface AmountInputProps {
    onChange: (el: unknown) => void;
    value: number;
    loading: boolean;
}

const AmountInput = ({ value, onChange, loading }: AmountInputProps) => (
    <Box sx={{ width: 320 }}>
        <FormLabel htmlFor="select-field-pet">From amount</FormLabel>
        {/* <TextField disabled={ loading } type={ 'number' } value={ value } onChange={ onChange } placeholder="Enter amount" /> */}
        <FormControl id="Id" required size="sm" color="primary">
            <FormLabel sx={{ color: 'white' }}>From amount</FormLabel>
                <Input
                placeholder="Enter amount"
                name="Name"
                type="tel"
                autoComplete="on"
                autoFocus
                fullWidth
                defaultValue="DefaultValue"
                variant="outlined"
                value={value}
                onChange={onChange}
                disabled={loading}
            />
    </FormControl>
    </Box>
);

export default AmountInput;
