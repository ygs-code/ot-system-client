import { Button, Modal } from "antd";
import Form from "client/component/Form";
import React, { useRef, useState } from "react";

const App = (props) => {
  const {
    buttonText = "打开弹窗",
    title = "弹窗标题",
    onReady = () => {},
    fields = [],
    initialValues = {},
    onOk = () => {},
    onCancel = () => {}
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onValidaForm();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onCancel();
  };

  // 验证表单
  const onValidaForm = async () => {
    const { validateFields } = formRef.current;

    await validateFields()
      .then(async (values) => {
        await onOk(values);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        width={700}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div
          style={{
            marginLeft: "10px",
            marginTop: "20px"
          }}>
          <Form
            fields={fields}
            onReady={(form) => {
              formRef.current = form;
              onReady(form);
            }}
            initialValues={initialValues}></Form>
        </div>
      </Modal>
    </>
  );
};

export default App;
