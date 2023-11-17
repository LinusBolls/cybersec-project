"use client";

import React from 'react';
import { useFormik } from 'formik';
import { Dialog, Button, Input } from '@material-tailwind/react';

export interface BoxEditingModal {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        title: string;
        description: string;
    };
    onSubmit: (values: any) => void;
}
const BoxEditingModal = ({ isOpen, onClose, initialData, onSubmit }: BoxEditingModal) => {

    return <Dialog
        size="sm"
        open={isOpen}
        handler={onClose}
    >moin meister</Dialog>
}

export default BoxEditingModal;
