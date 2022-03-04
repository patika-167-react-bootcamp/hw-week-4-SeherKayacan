import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import TodoAdd from "./TodoAdd";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5aWdpdCIsImlhdCI6MTY0NjM5OTU4NCwiZXhwIjoxNjQ2NDA2Nzg0fQ.Hw0uoH-otCXikNjfRZvxakMap-HhbcbLzE1iL1MCDB8";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const url = "http://localhost:80"

function TodoMain() {
  const [categories, setCategories] = useState([]);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getCategories();
    getTodos();
  }, []);

  const getCategories = () => {
    axios
      .get(`${url}/category`, config)
      .then((response) => setCategories(response.data));
  };

  const getTodos = () => {
    axios.get(`${url}/todo`, config).then((response) => {
      setTodos(response.data);
    });
  };

  async function getStatus(categoryId) {
    const response = await axios.get(
      `${url}/status?categoryId=${categoryId}`,
      config
    );
    return response.data;
  }

  const handleCategoryCreate = (data) => {
    const body = { title: data };
    axios
      .post(`${url}/category`, body, config)
      .then((response) => setCategories([...categories, response.data]));
  };

  const handleCategoryUpdate = (data) => {
    const body = { title: data.title };
    axios
      .put(`${url}/category/${data.id}`, body, config)
      .then((response) => {
        const newCategories = categories.slice();
        const categoryIndex = categories.findIndex(
          (category) => category.id === data.id
        );
        newCategories.splice(categoryIndex, 1, response.data);
        return setCategories(newCategories);
      });
  };

  const handleCategoryDelete = (categoryId) => {
    axios
      .delete(`${url}/category/${categoryId}`, config)
      .then(() => {
        const newCategories = categories.slice();
        const categoryIndex = categories.findIndex(
          (category) => category.id === categoryId
        );
        newCategories.splice(categoryIndex, 1);
        return setCategories(newCategories);
      });
  };

  async function handleStatusCreate(data) {
    const response = await axios.post(
      `${url}/status`,
      data,
      config
    );
    return response.data;
  }

  async function handleStatusUpdate(data) {
    const body = { title: data.title, categoryId: data.categoryId, color: data.color };
    const response = await axios.put(
      `${url}/status/${data.id}`,
      body,
      config
    );
    return response.data;
  }

  async function handleStatusDelete(statusId) {
    const response = await axios.delete(
      `${url}/status/${statusId}`,
      config
    );
    return response.data;
  }

  const handleTodoCreate = (data) => {
    axios
      .post(`${url}/todo`, data, config)
      .then((response) => setTodos([...todos, response.data]));
  };

  const handleTodoUpdate = (data) => {
    const body = {
      title: data.title,
      categoryId: data.categoryId,
      statusId: data.statusId,
    };
    axios
      .put(`${url}/todo/${data.id}`, body, config)
      .then(() => {
        getTodos();
      });
  };

  const handleTodoDelete = (todoId) => {
    axios.delete(`${url}/todo/${todoId}`, config).then(() => {
      const newTodos = todos.slice();
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    });
  };

  const handleFilter = (categoryId, statusId) => {
    if (statusId && categoryId) {
      const newTodos = todos.filter(
        (todo) =>
          todo.categoryId === Number(categoryId) &&
          todo.statusId === Number(statusId)
      );
      setFilteredTodos(newTodos);
    } else {
      const newTodos = todos.filter(
        (todo) => todo.categoryId === Number(categoryId)
      );
      setFilteredTodos(newTodos);
    }
  };

  const handleCleanFilter = () => {
    setFilteredTodos(todos);
  };

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <Box sx={{ width: 900 }}>
      <TodoFilter
        categories={categories}
        getStatus={getStatus}
        cleanFilter={handleCleanFilter}
        filter={handleFilter}
      />
      <TodoAdd
        categories={categories}
        getStatus={getStatus}
        handleAdd={handleTodoCreate}
      />
      <CategoryList
        categories={categories}
        getStatus={getStatus}
        addCategory={handleCategoryCreate}
        updateCategory={handleCategoryUpdate}
        deleteCategory={handleCategoryDelete}
        addStatus={handleStatusCreate}
        updateStatus={handleStatusUpdate}
        deleteStatus={handleStatusDelete}
      />
      <TodoList
        categories={categories}
        getStatus={getStatus}
        todos={filteredTodos}
        updateTodo={handleTodoUpdate}
        deleteTodo={handleTodoDelete}
      />
    </Box>
  );
}

export default TodoMain;
