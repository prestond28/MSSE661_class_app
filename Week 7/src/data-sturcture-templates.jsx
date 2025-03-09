import { Tag } from 'antd';
export const columns = [
  {
    title: 'Task ID',
    dataIndex: 'task_id',
  },
  {
    title: 'Task',
    dataIndex: 'task_name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Created On',
    dataIndex: 'created_date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = 'green';
      if (status === 'pending') {
        color = 'gold';
      }

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
];

export const statusOptions = [
  {
    value: 'pending',
    label: 'pending',
  },
  {
    value: 'completed',
    label: 'completed',
  },
];

export const radioOptions = [
  {
    value: 1,
    label: 'Add a new task',
  },
  {
    value: 2,
    label: 'Update existing task',
  },
  ]