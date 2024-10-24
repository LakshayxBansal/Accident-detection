import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function UpdateContact() {
    // State for number input
    const [number, setNumber] = useState('');
    // State for selected value
    const [selectedValue, setSelectedValue] = useState('');
    // State for dialog open
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Handle number input change
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Number submitted:', number);
        console.log('Selected value:', selectedValue);
        setIsDialogOpen(false); // Close dialog after submission
    };

    // Handle select change
    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    // Check if both fields are filled
    const isFormValid = number && selectedValue;

    return (
        <div className='flex justify-center mt-5'>
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-4 items-center">
                <div>
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Countries</SelectLabel>
                                <SelectItem value="+91">India</SelectItem>
                                <SelectItem value="+92">Pakistan</SelectItem>
                                <SelectItem value="+1">USA</SelectItem>
                                <SelectItem value="+61">Australia</SelectItem>
                                <SelectItem value="+880">Bangladesh</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <input
                        type="number"
                        value={number}
                        placeholder='Enter a number'
                        onChange={handleNumberChange}
                        min="0"
                        step="1"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            type="button"
                            disabled={!isFormValid}
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Submit
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                            <AlertDialogDescription>
                                Please confirm that you want to submit the form with the entered details.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </div>
    );
}

export default UpdateContact;
