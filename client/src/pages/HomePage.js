import React, { useState, useEffect } from "react";
import { Modal, Form, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import "../style/HomePage.css";

const { RangePicker } = DatePicker;
const HomePage = () => {
  const [showModal, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectdate] = useState([])
  const [type, setType] = useState("all")
  const [viewData, setViewData]= useState('table')
  const [editable, setEditable]=useState(null)
  const [form] = Form.useForm();

  //table data

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      render:(text, record)=>(
        <div>
          <EditOutlined onClick={()=>{
            setEditable(record)
            setShowModel(true)
          }}/>
          <DeleteOutlined className="mx-2" onClick={()=>{handleDelete(record)}}/>
        </div>
      )
    },
  ];

  // getall transections
  const getAllTransection = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.get('http://localhost:3001/api/v1/transactions/get-transactions', {
        params: { userid: user._id, frequency, selectedDate, type }
      });

      console.log('Received response:', res.data);
      setLoading(false);
      setAllTransection(res.data);
    } catch (error) {
      console.error(error);
      message.error("Fetch issue with transactions");
    }
  };
  useEffect(() => {
    getAllTransection();
  }, [frequency, selectedDate, type]);

  //delete handler
  const handleDelete=async(record)=>{
try {
  setLoading(true)
  await axios.post('http://localhost:3001/api/v1/transactions/delete-transaction', {  transacationID:record._id })
  setLoading(false)
  message.success("Transaction deleted")
} catch (error) {
  setLoading(false)
  console.log(error)
  message.error("unable to delete")
}
  }

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        await axios.post('http://localhost:3001/api/v1/transactions/edit-transaction', { payload:{
          ...values, userId:user._id
        },
        transacationID:editable._id
       })
      setLoading(false)
      message.success("Transaction Updated Successfully")

      }else{
        await axios.post('http://localhost:3001/api/v1/transactions/add-transaction', { ...values, userid: user._id })
      setLoading(false)
      message.success("Transaction Added Successfully")
      }
      setShowModel(false);
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error("Failed to add Transaction")
    }
  }
  return (
   
    <Layout>
    {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate}
            onChange={(values) =>
              setSelectdate(values)} />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">all</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            <Select.Option value="income">Income</Select.Option>

          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate}
            onChange={(values) =>
              setSelectdate(values)} />}
        </div>
        <div className="switch-icon">
          <UnorderedListOutlined className={`mx-2 ${viewData==='table' ? 'active-icon' :'inactive-icon'}`} 
          onClick={()=>setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData==='analytics' ? 'active-icon' :'inactive-icon'}`} 
          onClick={()=>setViewData('analytics')}/>
        </div>
        <div>

          <button className="btn btn-primary"
            onClick={() => setShowModel(true)}>Add new</button>
        </div>
      </div>
      <div className="content">
      {viewData==='table' ?
        <Table columns={columns} dataSource={allTransection} />
    :<Analytics allTransection={allTransection} />
      }
      </div>
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Trasaction'}
        open={showModal}
        onCancel={() => setShowModel(false)}
        footer={false}
      >
        <Form Layout="vertical" onFinish={handleSubmit}  initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>

          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;