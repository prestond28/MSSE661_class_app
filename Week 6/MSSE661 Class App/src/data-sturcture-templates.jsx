import { Tag } from 'antd';
export const columns = [
  {
    title: 'Task',
    dataIndex: 'task_name',
    key: 'task_name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Created On',
    dataIndex: 'created_date',
    key: 'created_date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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