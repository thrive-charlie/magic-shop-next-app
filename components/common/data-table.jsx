"use client"

import React from 'react';
import DataTable from 'react-data-table-component';
import { IoChevronDown } from 'react-icons/io5';

export default function ReactDataTable(props) {
    return (
        <DataTable
            pagination
            sortIcon={<IoChevronDown />}
            dense
            {...props}
        />
    );
}
