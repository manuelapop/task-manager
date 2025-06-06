import React from "react";
import { Button, TextField, View, Heading, Content, Flex, Text } from '@adobe/react-spectrum';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {  
      id
      title
      description
      status
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: Int!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function TaskManager() {
  const { data, refetch } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [updateStatus] = useMutation(UPDATE_TASK_STATUS);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleCreate = async () => {
    await createTask({ variables: { title, description }  });
    setTitle(''); setDescription('');
    refetch();
  };

  const toggleStatus = async (id, status) => {
    await updateStatus({ variables: { id, status } });
    refetch();
  };

  return (
    <View padding="size-200" maxWidth="size-8000" marginX="auto">
      <Heading level={1}>Task Manager</Heading>
      <Flex direction="row" gap="size-200" alignItems="end">
        <TextField label="Title" value={title} onChange={setTitle} width="size-2400"/>
        <TextField label="Description" value={description} onChange={setDescription} width="size-3600"/>
        <Button variant="cta" onPress={handleCreate}>Add Task</Button>
      </Flex>
      <Content>
        {data?.tasks?.map(task => (
          <View key={task.id} borderWidth="thin" borderColor="dark" padding="size-100" marginY="size-100">          
          <Flex direction="row" alignItems="center" justifyContent="space-between" maxWidth="size-8000">
            <Flex direction="row" gap="size-100" alignItems="center" flex="1">
              <Text UNSAFE_style={{ fontWeight: "bold", wordWrap: "break-word", overflowWrap: "break-word", maxWidth:"100px" }}>{task.title}</Text>
              <Text>-</Text>
              <Text UNSAFE_style={{ wordWrap: "break-word", overflowWrap: "break-word", maxWidth:"200px" }}>
                {task.description}
              </Text>
            </Flex>
            <Text>({task.status})</Text>
            <Button variant="primary" onPress={() => toggleStatus(task.id, task.status === 'Pending' ? 'Completed' : 'Pending')} marginStart="size-100">
              Toggle Status
             </Button>
          </Flex>
          </View>
        ))}
      </Content>
    </View>
  );
}