"use client"

import React, { useState } from 'react'
import ReactDataTable from '@/components/common/data-table';
import Button from '@/components/common/button';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Modal } from '@mantine/core';

export default function Table({ orders }) {

    const [active, setActive] = useState(null);

    const columns = [
        {
            name: 'Order ID',
            selector: row => row.id,
        },
        {
            name: 'Summary',
            selector: row => row.description,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Value',
            selector: row => row.value,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            button: true,
            cell: row => (
                <Button
                    icon={HiArrowUpRight}
                    onClick={() => setActive(row.id)}
                >View Order</Button>
            )
        }
    ];

  return (
    <div>
        <ReactDataTable columns={columns} data={orders} />
        <Modal 
            opened={active}
            onClose={() => setActive(null)} 
            size="xl" 
            title="View Order" 
            centered>
            {active && (
                <section>
                    <p>Extra order details ID: {active}</p>
                </section>
            )}
      </Modal>
    </div>
  )
}
