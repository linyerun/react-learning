import { useActionData, useLoaderData, useNavigation, useSubmit } from "react-router";
import { Card, Form, Input, Button } from "antd";

export default function LoaderAction() {
  const data: { data: { name: string; age: number }; message: string } =
    useLoaderData();
  // action 的返回值只能从这个 hook 拿，submit() 本身返回的是 Promise<void>
  const actionData: { message: string } | undefined = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const pushData = async (values: { name: string; age: number }) => {
    await submit(values, {
      method: "post",
      encType: "application/json",
    });
  };
  return (
    <>
      <hr />
      <div>data: {JSON.stringify(data)}</div>
      <hr />
      <div>actionData: {JSON.stringify(actionData)}</div>
      <div>state: {navigation.state}</div>
      <hr />
      <Card>
        <Form
          onFinish={(values: { name: string; age: number }) => {
            pushData(values);
          }}
        >
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </Card>
    </>
  );
}
