import { useEffect, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { addTask, deleteTask, getTasks, updateTask } from './tasks.service';
import { doLogout } from './auth';
import { columns, radioOptions, statusOptions } from './data-sturcture-templates';
import { Button, Flex, Input, Radio, Select, Space, Table } from 'antd';



function Home() {
  const navigate = useNavigate();

  //fetching data from MYSQL
  const [rawData, setRawData] = useState("");
  const fetchData = async () => {
    try {
      const res = await getTasks();
      setRawData(res);
    } catch (error) {
      console.error("Error retrieving raw data: ", error);
    }
  };
  useEffect (() => {
    fetchData();    
  }, []);
  console.log(rawData);

  //Setting up table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const start = () => {
    setLoadingDelete(true);
    const deleteSelectedTask = async (task_id) => {
      try {
        await deleteTask(task_id);
        fetchData();
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    };
    deleteSelectedTask(selectedRowKeys[0]);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingDelete(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // adding new tasks
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [newTaskNameInput, setNewTaskNameInput] = useState("");
  const [statusSelection, setStatusSelection] = useState("pending");
  const handleStatusChange = (value) => {
    console.log(`selected ${value}`);
    setStatusSelection(value);
  };
  const handleNewTaskNameInputChange = (e) => {
    setNewTaskNameInput(e.target.value);
    console.log(`New task input value: ${e.target.value}`);
  };
  const enterLoadingAddTask = async () => {
    setLoadingAdd(true);
    const newTask = {
      "task_name": newTaskNameInput,
      "status": statusSelection
    }
    try {
      await addTask(newTask);
      fetchData();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
    setTimeout(() => {
      setLoadingAdd(false);
    }, 1000);
  };

  //updating tasks
  const [radio, setRadio] = useState(1);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateTaskNameInput, setUpdateTaskNameInput] = useState("");
  const [taskIdSelection, setTaskIdSelection] = useState("");
  const availableTaskIds = rawData ? rawData.map(task => ({
    value: task.task_id,
    label: `${task.task_id} : ${task.task_name}`
  })) : null;
  const onRadioChange = (e) => {
    setRadio(e.target.value);
  };
  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };
  const handleTaskIdChange = (value) => {
    console.log(`selected task id ${value}`);
    setTaskIdSelection(value);
  };
  const handleUpdateTaskNameInputChange = (e) => {
    setUpdateTaskNameInput(e.target.value);
    console.log(`Updated task input value: ${e.target.value}`);
  };
  const enterLoadingUpdateTask = async () => {
    if (updateTaskNameInput !== "") {
      setLoadingUpdate(true);
      const updatedTask = {
        "task_name": updateTaskNameInput,
        "status": statusSelection,
      }
      try {
        await updateTask(taskIdSelection.toString(), updatedTask);
        fetchData();
      } catch (error) {
        console.error("Error updating task: ", error);
      }
      setTimeout(() => {
        setLoadingUpdate(false);
        setTaskIdSelection(null)
      }, 1000);
    } else {
      alert("Please provide an updated task name.")
    }
  };


  return (
    <>
      <div className="body">
        <header>
          <nav className="nav">
            <Link to="/about" className='navlink'>about</Link>
            { localStorage.length ? <Link onClick={(e) => doLogout(e, navigate)} className="navlink">logout</Link> :
            <Link to="/login" className='navlink'>login</Link> }
          </nav>
        </header>
        <div className="content">
          <div className='table'>
            { rawData.length ?
              <Flex gap="middle" vertical>
                <Flex align="center" gap="middle">
                  <Button type="primary" onClick={start} disabled={!hasSelected} loading={loadingDelete}>
                    Delete
                  </Button>
                  {hasSelected ? `Selected ${selectedRowKeys.length} tasks` : null}
                </Flex>
                <Table rowSelection={rowSelection} columns={columns} dataSource={rawData.map((data) => ({ ...data, key: data.task_id}))} />
              </Flex>
              : null
            }
          </div>
          <div>
            <Space wrap>
              <Radio.Group block
                onChange={onRadioChange}
                style={style}
                value={radio}
                options={radioOptions}
              />
              {radio === 1 ?
              <>
                <Input placeholder="New task name" onChange={handleNewTaskNameInputChange} />
                <Select
                  defaultValue="pending"
                  style={{
                    width: 120,
                  }}
                  onChange={handleStatusChange}
                  options={statusOptions}
                />
                <Button type="primary" loading={loadingAdd} onClick={enterLoadingAddTask}>Add task</Button>
              </>
              :
              <>
                <Select
                  placeholder="Task ID"
                  style={{
                    width: 120,
                  }}
                  onChange={handleTaskIdChange}
                  options={availableTaskIds}
                />
                <Input placeholder="Updated task name" onChange={handleUpdateTaskNameInputChange} />
                <Select
                  defaultValue="pending"
                  style={{
                    width: 120,
                  }}
                  onChange={handleStatusChange}
                  options={statusOptions}
                />
                <Button type="primary" loading={loadingUpdate} onClick={enterLoadingUpdateTask}>Update task</Button>
              </>
              }
              </Space>
          </div>
        </div>
        <div className="footer">
          <div className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></div>
        </div>
      </div>
    </>
  )
}

export default Home